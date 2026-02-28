"use client";

import { useState, useRef, useCallback, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, RotateCcw, Globe } from "lucide-react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { useLocale } from "@/hooks/useLocale";
import { canAccessFeature } from "@/lib/plan";
import { industries } from "@/data/industries";
import { countries } from "@/data/countries";
import {
  searchNearby,
  calculateEstimatedRevenue,
  getCompetitionLevel,
  type NearbyPlace,
} from "@/lib/places";

const GOOGLE_MAPS_LIBRARIES: ("places")[] = ["places"];

const DARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1d1d1d" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1d1d1d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
];

interface CountryMapConfig {
  lat: number;
  lng: number;
  zoom: number;
  countryCode: string;
  quickLocations: { id: string; name_ko: string; name_en: string; lat: number; lng: number }[];
  currency: string;
  currencySymbol: string;
  unitPriceMultiplier: number; // relative to KRW base
}

const COUNTRY_CONFIGS: Record<string, CountryMapConfig> = {
  KR: {
    lat: 37.5665, lng: 126.9780, zoom: 11, countryCode: "kr",
    currency: "KRW", currencySymbol: "₩", unitPriceMultiplier: 1,
    quickLocations: [
      { id: "gangnam", name_ko: "강남역", name_en: "Gangnam Station", lat: 37.4979, lng: 127.0276 },
      { id: "hongdae", name_ko: "홍대입구", name_en: "Hongdae", lat: 37.5563, lng: 126.9236 },
      { id: "pangyo", name_ko: "판교역", name_en: "Pangyo Station", lat: 37.3947, lng: 127.1112 },
    ],
  },
  US: {
    lat: 40.7128, lng: -74.0060, zoom: 11, countryCode: "us",
    currency: "USD", currencySymbol: "$", unitPriceMultiplier: 0.00077,
    quickLocations: [
      { id: "manhattan", name_ko: "Manhattan, NY", name_en: "Manhattan, NY", lat: 40.7580, lng: -73.9855 },
      { id: "sf", name_ko: "San Francisco, CA", name_en: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
      { id: "austin", name_ko: "Austin, TX", name_en: "Austin, TX", lat: 30.2672, lng: -97.7431 },
    ],
  },
  JP: {
    lat: 35.6762, lng: 139.6503, zoom: 11, countryCode: "jp",
    currency: "JPY", currencySymbol: "¥", unitPriceMultiplier: 0.115,
    quickLocations: [
      { id: "shinjuku", name_ko: "新宿, 東京", name_en: "Shinjuku, Tokyo", lat: 35.6938, lng: 139.7034 },
      { id: "umeda", name_ko: "梅田, 大阪", name_en: "Umeda, Osaka", lat: 34.7024, lng: 135.4959 },
      { id: "nagoya", name_ko: "名古屋駅", name_en: "Nagoya Station", lat: 35.1709, lng: 136.8815 },
    ],
  },
  CN: {
    lat: 31.2304, lng: 121.4737, zoom: 11, countryCode: "cn",
    currency: "CNY", currencySymbol: "¥", unitPriceMultiplier: 0.0055,
    quickLocations: [
      { id: "nanjingrd", name_ko: "南京东路, 上海", name_en: "Nanjing Road, Shanghai", lat: 31.2382, lng: 121.4760 },
      { id: "guomao", name_ko: "国贸, 北京", name_en: "Guomao, Beijing", lat: 39.9089, lng: 116.4572 },
      { id: "futian", name_ko: "福田, 深圳", name_en: "Futian, Shenzhen", lat: 22.5431, lng: 114.0579 },
    ],
  },
  VN: {
    lat: 21.0285, lng: 105.8542, zoom: 12, countryCode: "vn",
    currency: "VND", currencySymbol: "₫", unitPriceMultiplier: 19.5,
    quickLocations: [
      { id: "district1", name_ko: "Quận 1, HCMC", name_en: "District 1, HCMC", lat: 10.7769, lng: 106.7009 },
      { id: "hoankiem", name_ko: "Hoàn Kiếm, Hà Nội", name_en: "Hoan Kiem, Hanoi", lat: 21.0285, lng: 105.8542 },
      { id: "danang", name_ko: "Đà Nẵng", name_en: "Da Nang", lat: 16.0544, lng: 108.2022 },
    ],
  },
  TH: {
    lat: 13.7563, lng: 100.5018, zoom: 11, countryCode: "th",
    currency: "THB", currencySymbol: "฿", unitPriceMultiplier: 0.027,
    quickLocations: [
      { id: "sukhumvit", name_ko: "Sukhumvit, Bangkok", name_en: "Sukhumvit, Bangkok", lat: 13.7319, lng: 100.5677 },
      { id: "chiangmai", name_ko: "Chiang Mai", name_en: "Chiang Mai", lat: 18.7883, lng: 98.9853 },
      { id: "phuket", name_ko: "Phuket", name_en: "Phuket", lat: 7.8804, lng: 98.3923 },
    ],
  },
  ID: {
    lat: -6.2088, lng: 106.8456, zoom: 11, countryCode: "id",
    currency: "IDR", currencySymbol: "Rp", unitPriceMultiplier: 12.3,
    quickLocations: [
      { id: "scbd", name_ko: "SCBD, Jakarta", name_en: "SCBD, Jakarta", lat: -6.2250, lng: 106.8083 },
      { id: "bali", name_ko: "Seminyak, Bali", name_en: "Seminyak, Bali", lat: -8.6914, lng: 115.1683 },
      { id: "bandung", name_ko: "Bandung", name_en: "Bandung", lat: -6.9175, lng: 107.6191 },
    ],
  },
  SG: {
    lat: 1.3521, lng: 103.8198, zoom: 12, countryCode: "sg",
    currency: "SGD", currencySymbol: "S$", unitPriceMultiplier: 0.00103,
    quickLocations: [
      { id: "cbd", name_ko: "CBD, Singapore", name_en: "CBD, Singapore", lat: 1.2834, lng: 103.8507 },
      { id: "orchard", name_ko: "Orchard Road", name_en: "Orchard Road", lat: 1.3048, lng: 103.8318 },
      { id: "oneno", name_ko: "One-North", name_en: "One-North", lat: 1.2996, lng: 103.7870 },
    ],
  },
  GB: {
    lat: 51.5074, lng: -0.1278, zoom: 11, countryCode: "gb",
    currency: "GBP", currencySymbol: "£", unitPriceMultiplier: 0.00061,
    quickLocations: [
      { id: "shoreditch", name_ko: "Shoreditch, London", name_en: "Shoreditch, London", lat: 51.5264, lng: -0.0799 },
      { id: "manchester", name_ko: "Manchester", name_en: "Manchester", lat: 53.4808, lng: -2.2426 },
      { id: "edinburgh", name_ko: "Edinburgh", name_en: "Edinburgh", lat: 55.9533, lng: -3.1883 },
    ],
  },
  DE: {
    lat: 52.5200, lng: 13.4050, zoom: 11, countryCode: "de",
    currency: "EUR", currencySymbol: "€", unitPriceMultiplier: 0.00069,
    quickLocations: [
      { id: "mitte", name_ko: "Mitte, Berlin", name_en: "Mitte, Berlin", lat: 52.5200, lng: 13.4050 },
      { id: "munich", name_ko: "München", name_en: "Munich", lat: 48.1351, lng: 11.5820 },
      { id: "hamburg", name_ko: "Hamburg", name_en: "Hamburg", lat: 53.5511, lng: 9.9937 },
    ],
  },
  AU: {
    lat: -33.8688, lng: 151.2093, zoom: 11, countryCode: "au",
    currency: "AUD", currencySymbol: "A$", unitPriceMultiplier: 0.0012,
    quickLocations: [
      { id: "sydney_cbd", name_ko: "Sydney CBD", name_en: "Sydney CBD", lat: -33.8688, lng: 151.2093 },
      { id: "melbourne", name_ko: "Melbourne CBD", name_en: "Melbourne CBD", lat: -37.8136, lng: 144.9631 },
      { id: "brisbane", name_ko: "Brisbane", name_en: "Brisbane", lat: -27.4705, lng: 153.0260 },
    ],
  },
  CA: {
    lat: 43.6532, lng: -79.3832, zoom: 11, countryCode: "ca",
    currency: "CAD", currencySymbol: "C$", unitPriceMultiplier: 0.00105,
    quickLocations: [
      { id: "toronto_dt", name_ko: "Downtown Toronto", name_en: "Downtown Toronto", lat: 43.6532, lng: -79.3832 },
      { id: "vancouver", name_ko: "Vancouver", name_en: "Vancouver", lat: 49.2827, lng: -123.1207 },
      { id: "montreal", name_ko: "Montréal", name_en: "Montreal", lat: 45.5017, lng: -73.5673 },
    ],
  },
};

function LocationContent() {
  const { locale, t } = useLocale();
  const isEn = locale === "en";
  const searchParams = useSearchParams();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    setHasAccess(canAccessFeature("location"));
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  // Country selection
  const [selectedCountry, setSelectedCountry] = useState("KR");
  const countryConfig = COUNTRY_CONFIGS[selectedCountry];

  const [selectedIndustry, setSelectedIndustry] = useState("");

  useEffect(() => {
    const industryParam = searchParams.get("industry");
    if (industryParam && industries.some((i) => i.id === industryParam)) {
      setSelectedIndustry(industryParam);
    }
    const countryParam = searchParams.get("country");
    if (countryParam && COUNTRY_CONFIGS[countryParam]) {
      setSelectedCountry(countryParam);
    }
  }, [searchParams]);

  const [searchLocation, setSearchLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);
  const [radius, setRadius] = useState(500);
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null);
  const [aiInsight, setAiInsight] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [searchError, setSearchError] = useState("");

  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onAutocompleteLoad = useCallback(
    (ac: google.maps.places.Autocomplete) => {
      autocompleteRef.current = ac;
    },
    []
  );

  const onPlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    if (place.geometry?.location) {
      setSearchLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name ?? place.formatted_address ?? "",
      });
      setSearchError("");
    }
  }, []);

  // When country changes, pan map and reset
  const handleCountryChange = useCallback(
    (code: string) => {
      setSelectedCountry(code);
      const config = COUNTRY_CONFIGS[code];
      if (config && mapRef.current) {
        mapRef.current.panTo({ lat: config.lat, lng: config.lng });
        mapRef.current.setZoom(config.zoom);
      }
      setSearchLocation(null);
      setIsAnalyzed(false);
      setPlaces([]);
      setSelectedPlace(null);
      setAiInsight("");
      setSearchError("");
    },
    []
  );

  const handleQuickLocation = useCallback(
    (loc: { name_ko: string; name_en: string; lat: number; lng: number }) => {
      setSearchLocation({
        lat: loc.lat,
        lng: loc.lng,
        name: isEn ? loc.name_en : loc.name_ko,
      });
      setSearchError("");
      if (mapRef.current) {
        mapRef.current.panTo({ lat: loc.lat, lng: loc.lng });
        mapRef.current.setZoom(14);
      }
    },
    [isEn]
  );

  const handleAnalyze = useCallback(async () => {
    if (!selectedIndustry || !searchLocation || !mapRef.current) return;
    setIsLoading(true);
    setSearchError("");
    setIsAnalyzed(false);
    setPlaces([]);
    setAiInsight("");
    setAiError(false);
    setSelectedPlace(null);

    try {
      const results = await searchNearby(
        mapRef.current,
        searchLocation.lat,
        searchLocation.lng,
        radius,
        selectedIndustry
      );

      if (results.length === 0) {
        setSearchError(
          isEn
            ? "No businesses found in this area. Try expanding the radius or searching a different location."
            : "이 지역에서 해당 업종을 찾지 못했습니다. 반경을 넓히거나 다른 지역을 검색해보세요."
        );
        setIsLoading(false);
        return;
      }

      setPlaces(results);
      setIsAnalyzed(true);
      mapRef.current.panTo({
        lat: searchLocation.lat,
        lng: searchLocation.lng,
      });
      mapRef.current.setZoom(15);

      fetchAIInsight(results);
    } catch {
      setSearchError(
        isEn
          ? "Failed to load data. Please check your internet connection."
          : "데이터를 불러올 수 없습니다. 인터넷 연결을 확인해주세요."
      );
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndustry, searchLocation, radius, isEn]);

  const fetchAIInsight = useCallback(
    async (placeList: NearbyPlace[]) => {
      if (!searchLocation) return;
      setAiLoading(true);
      setAiError(false);

      const industry = industries.find((i) => i.id === selectedIndustry);
      const industryName = isEn
        ? industry?.label_en
        : industry?.label_ko ?? selectedIndustry;
      const avgRating =
        placeList.length > 0
          ? (
              placeList.reduce((s, p) => s + p.rating, 0) / placeList.length
            ).toFixed(1)
          : "0";
      const top3 = [...placeList]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
        .map((p) => `${p.name}(${p.rating})`)
        .join(", ");

      const countryName = countries.find((c) => c.code === selectedCountry);
      const countryLabel = isEn ? countryName?.name_en : countryName?.name_ko;

      const prompt = `사용자가 ${countryLabel} ${searchLocation.name}에서 ${industryName}을 창업하려고 합니다.
반경 ${radius}m 내에 같은 업종이 ${placeList.length}개 있고, 평균 평점은 ${avgRating}점입니다.
상위 업체: ${top3}.

이 데이터를 바탕으로:
1. 이 지역의 경쟁 상황 (1줄)
2. 창업 시 기회 요인 (1줄)
3. 주의할 점 (1줄)
4. 추천 전략 (1줄)

4줄로 간결하게 답변해줘. JSON이 아닌 일반 텍스트로.${isEn ? " Respond in English." : ""}`;

      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(
          process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
        );
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash-lite",
        });
        const result = await model.generateContent(prompt);
        setAiInsight(result.response.text());
      } catch {
        setAiError(true);
      } finally {
        setAiLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedIndustry, searchLocation, radius, isEn, selectedCountry]
  );

  const handlePlaceClick = useCallback(
    (place: NearbyPlace) => {
      setSelectedPlace(place);
      mapRef.current?.panTo({ lat: place.lat, lng: place.lng });
    },
    []
  );

  const handleReset = useCallback(() => {
    setIsAnalyzed(false);
    setPlaces([]);
    setSelectedPlace(null);
    setAiInsight("");
    setAiError(false);
    setSearchError("");
    setSearchLocation(null);
    const config = COUNTRY_CONFIGS[selectedCountry];
    mapRef.current?.panTo({ lat: config.lat, lng: config.lng });
    mapRef.current?.setZoom(config.zoom);
  }, [selectedCountry]);

  const avgRating = useMemo(() => {
    if (places.length === 0) return 0;
    return places.reduce((s, p) => s + p.rating, 0) / places.length;
  }, [places]);

  const competitionLevel = useMemo(
    () => getCompetitionLevel(places.length),
    [places]
  );

  const top5 = useMemo(
    () => [...places].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [places]
  );

  // Currency formatting
  const formatCurrency = useCallback((krwAmount: number) => {
    const config = COUNTRY_CONFIGS[selectedCountry];
    const converted = krwAmount * config.unitPriceMultiplier;
    const sym = config.currencySymbol;

    if (config.currency === "KRW") {
      if (converted >= 100000000) return `${sym}${(converted / 100000000).toFixed(1)}${isEn ? "B" : "억"}`;
      if (converted >= 10000) return `${sym}${(converted / 10000).toFixed(0)}${isEn ? "M" : "만"}`;
      return `${sym}${converted.toLocaleString()}`;
    }
    if (config.currency === "JPY" || config.currency === "VND" || config.currency === "IDR") {
      return `${sym}${Math.round(converted).toLocaleString()}`;
    }
    return `${sym}${converted.toFixed(converted < 100 ? 2 : 0)}`;
  }, [selectedCountry, isEn]);

  if (!hasAccess) {
    return <PremiumGate t={t} />;
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090B]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  const canAnalyze = selectedIndustry && searchLocation && !isLoading;

  return (
    <div className="min-h-screen bg-[#09090B] pt-20">
      {/* Sticky search bar */}
      <div className="sticky top-16 z-30 border-b border-zinc-700/50 bg-[#09090B]/95 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-3">
          {/* Row 1: Country selection */}
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-zinc-400 shrink-0" />
            <select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="rounded-lg border border-zinc-700 bg-zinc-800/60 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 sm:w-56"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code} className="bg-zinc-900">
                  {c.flag} {isEn ? c.name_en : c.name_ko}
                </option>
              ))}
            </select>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              {isEn ? "Select a country to search" : "검색할 나라를 선택하세요"}
            </span>
          </div>

          {/* Row 2: Industry + Location search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="rounded-lg border border-zinc-700 bg-zinc-800/60 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 sm:w-48"
            >
              <option value="" className="bg-zinc-900">{t("location.select_industry")}</option>
              {industries
                .filter((ind) => ind.id !== "undecided")
                .map((ind) => (
                  <option key={ind.id} value={ind.id} className="bg-zinc-900">
                    {ind.icon} {isEn ? ind.label_en : ind.label_ko}
                  </option>
                ))}
            </select>

            <div className="flex-1">
              <Autocomplete
                key={selectedCountry}
                onLoad={onAutocompleteLoad}
                onPlaceChanged={onPlaceChanged}
                options={{ componentRestrictions: { country: countryConfig.countryCode } }}
              >
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="text"
                    placeholder={isEn ? "Search location..." : "지역을 검색하세요..."}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20"
                  />
                </div>
              </Autocomplete>
            </div>
          </div>

          {/* Row 3: Radius + Analyze button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 sm:flex-none sm:w-64">
              <span className="text-xs text-zinc-400 shrink-0">
                {isEn ? "Radius" : "반경"}
              </span>
              <input
                type="range"
                min={300}
                max={2000}
                step={100}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="flex-1 accent-violet-500"
              />
              <span className="text-xs text-zinc-300 w-14 text-right shrink-0">
                {radius}m
              </span>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:from-violet-400 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading
                ? (isEn ? "Analyzing..." : "분석 중...")
                : (isEn ? "Analyze" : "분석하기")}
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {searchError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto max-w-7xl px-4 sm:px-6 pt-3"
          >
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {searchError}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content: map + panel */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Map — 60% */}
          <div className="lg:w-[60%]">
            <div className="overflow-hidden rounded-2xl border border-zinc-700/50">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "calc(100vh - 300px)", minHeight: "400px" }}
                center={
                  searchLocation
                    ? { lat: searchLocation.lat, lng: searchLocation.lng }
                    : { lat: countryConfig.lat, lng: countryConfig.lng }
                }
                zoom={searchLocation ? 15 : countryConfig.zoom}
                onLoad={onMapLoad}
                options={{
                  styles: DARK_MAP_STYLE,
                  disableDefaultUI: true,
                  zoomControl: true,
                }}
              >
                {searchLocation && isAnalyzed && (
                  <Circle
                    center={{
                      lat: searchLocation.lat,
                      lng: searchLocation.lng,
                    }}
                    radius={radius}
                    options={{
                      strokeColor: "#8B5CF6",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#8B5CF6",
                      fillOpacity: 0.1,
                    }}
                  />
                )}

                {searchLocation && isAnalyzed && (
                  <Marker
                    position={{
                      lat: searchLocation.lat,
                      lng: searchLocation.lng,
                    }}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                  />
                )}

                {isAnalyzed &&
                  places.map((place) => (
                    <Marker
                      key={place.placeId}
                      position={{ lat: place.lat, lng: place.lng }}
                      icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                      }}
                      onClick={() => setSelectedPlace(place)}
                    />
                  ))}

                {selectedPlace && (
                  <InfoWindow
                    position={{
                      lat: selectedPlace.lat,
                      lng: selectedPlace.lng,
                    }}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <div className="text-black p-1">
                      <p className="font-semibold text-sm">
                        {selectedPlace.name}
                      </p>
                      <p className="text-xs mt-1">
                        ⭐ {selectedPlace.rating} ·{" "}
                        {selectedPlace.userRatingsTotal}{" "}
                        {isEn ? "reviews" : "리뷰"}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {selectedPlace.vicinity}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </div>

          {/* Panel — 40% */}
          <div className="lg:w-[40%]">
            {!isAnalyzed ? (
              <InitialState
                isEn={isEn}
                quickLocations={countryConfig.quickLocations}
                onQuickLocation={handleQuickLocation}
                countryFlag={countries.find((c) => c.code === selectedCountry)?.flag ?? ""}
              />
            ) : (
              <AnalysisPanel
                isEn={isEn}
                places={places}
                avgRating={avgRating}
                competitionLevel={competitionLevel}
                top5={top5}
                selectedIndustry={selectedIndustry}
                aiInsight={aiInsight}
                aiLoading={aiLoading}
                aiError={aiError}
                onPlaceClick={handlePlaceClick}
                onReset={handleReset}
                formatCurrency={formatCurrency}
                t={t}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Initial State */
function InitialState({
  isEn,
  quickLocations,
  onQuickLocation,
  countryFlag,
}: {
  isEn: boolean;
  quickLocations: CountryMapConfig["quickLocations"];
  onQuickLocation: (loc: CountryMapConfig["quickLocations"][number]) => void;
  countryFlag: string;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-8 text-center">
      <MapPin size={48} className="text-violet-400 mb-4" />
      <h3 className="text-lg font-bold text-zinc-100">
        {isEn ? "Start Market Analysis" : "상권 분석 시작하기"}
      </h3>
      <p className="mt-2 text-sm text-zinc-400">
        {isEn
          ? "Select an industry and location to analyze competitors"
          : "업종과 지역을 선택하고 경쟁 업체를 분석하세요"}
      </p>
      <div className="mt-6 w-full">
        <p className="text-xs text-zinc-500 mb-3">
          {countryFlag} {isEn ? "Popular locations" : "인기 지역"}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {quickLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onQuickLocation(loc)}
              className="rounded-full border border-zinc-700/50 bg-zinc-800/60 px-4 py-2 text-xs text-zinc-300 transition-all hover:border-violet-500/50 hover:text-violet-300"
            >
              📍 {isEn ? loc.name_en : loc.name_ko}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Analysis Panel */
function AnalysisPanel({
  isEn,
  places,
  avgRating,
  competitionLevel,
  top5,
  selectedIndustry,
  aiInsight,
  aiLoading,
  aiError,
  onPlaceClick,
  onReset,
  formatCurrency,
  t,
}: {
  isEn: boolean;
  places: NearbyPlace[];
  avgRating: number;
  competitionLevel: "low" | "medium" | "high";
  top5: NearbyPlace[];
  selectedIndustry: string;
  aiInsight: string;
  aiLoading: boolean;
  aiError: boolean;
  onPlaceClick: (p: NearbyPlace) => void;
  onReset: () => void;
  formatCurrency: (krw: number) => string;
  t: (key: string) => string;
}) {
  const competitionConfig = {
    low: { badge: "🟢", color: "text-emerald-400" },
    medium: { badge: "🟡", color: "text-yellow-400" },
    high: { badge: "🔴", color: "text-red-400" },
  };
  const comp = competitionConfig[competitionLevel];

  const avgReviews =
    places.length > 0
      ? Math.round(
          places.reduce((s, p) => s + p.userRatingsTotal, 0) / places.length
        )
      : 0;
  const maxReviews = Math.max(...places.map((p) => p.userRatingsTotal), 0);

  const avgRevenue = calculateEstimatedRevenue(avgReviews, selectedIndustry);
  const maxRevenue = calculateEstimatedRevenue(maxReviews, selectedIndustry);

  return (
    <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
      {/* Card 1: Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          📊 {isEn ? "Analysis Summary" : "분석 요약"}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-violet-400">
              {places.length}
            </p>
            <p className="text-[11px] text-zinc-400">
              {isEn ? "Competitors" : "경쟁업체"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {avgRating.toFixed(1)}
            </p>
            <p className="text-[11px] text-zinc-400">
              {isEn ? "Avg Rating" : "평균 평점"}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-lg font-bold ${comp.color}`}>
              {comp.badge} {t(`location.competition_${competitionLevel}`)}
            </p>
            <p className="text-[11px] text-zinc-400">
              {isEn ? "Competition" : "경쟁도"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Top 5 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          🏪 {isEn ? "Top 5 Competitors" : "상위 5개 업체"}
        </h3>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {top5.map((place, i) => (
            <button
              key={place.placeId}
              onClick={() => onPlaceClick(place)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-zinc-700/30"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-400">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-200 truncate">{place.name}</p>
                <p className="text-[11px] text-zinc-500 truncate">
                  {place.vicinity}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm text-yellow-400">
                  ⭐ {place.rating > 0 ? place.rating : (isEn ? "N/A" : "없음")}
                </p>
                <p className="text-[11px] text-zinc-500">
                  {place.userRatingsTotal} {isEn ? "reviews" : "리뷰"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Card 3: AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          💡 {isEn ? "AI Insight" : "AI 인사이트"}
        </h3>
        {aiLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-4 rounded bg-zinc-700 animate-pulse"
                style={{ width: `${85 - n * 10}%` }}
              />
            ))}
            <p className="text-xs text-zinc-500 mt-2">
              {isEn ? "AI is analyzing..." : "AI가 분석 중..."}
            </p>
          </div>
        ) : aiError ? (
          <p className="text-sm text-red-400">{isEn ? "Analysis failed. Please try again." : "분석에 실패했습니다. 다시 시도해주세요."}</p>
        ) : aiInsight ? (
          <>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {aiInsight}
            </p>
            <p className="mt-2 text-[11px] text-zinc-600">
              {isEn ? "AI-generated reference only" : "AI 생성 참고 자료입니다"}
            </p>
          </>
        ) : null}
      </motion.div>

      {/* Card 4: Revenue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          💰 {isEn ? "Estimated Revenue" : "추정 매출"}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-zinc-700/30 p-3 text-center">
            <p className="text-xs text-zinc-400">
              {isEn ? "Average" : "평균"}
            </p>
            <p className="mt-1 text-lg font-bold text-emerald-400">
              {formatCurrency(avgRevenue)}
            </p>
          </div>
          <div className="rounded-xl bg-zinc-700/30 p-3 text-center">
            <p className="text-xs text-zinc-400">
              {isEn ? "Top" : "최고"}
            </p>
            <p className="mt-1 text-lg font-bold text-blue-400">
              {formatCurrency(maxRevenue)}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-zinc-600">
          {isEn ? "Estimates based on review count. Actual results may vary." : "리뷰 수 기반 추정치입니다. 실제 결과와 다를 수 있습니다."}
        </p>
      </motion.div>

      {/* Card 5: Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          🔗 {isEn ? "Next Steps" : "다음 단계"}
        </h3>
        <div className="space-y-2">
          <Link
            href="/register-guide"
            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:from-violet-400 hover:to-blue-400"
          >
            {isEn ? "Start Business Registration →" : "사업자등록 시작하기 →"}
          </Link>
          <button
            onClick={onReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-600 px-4 py-3 text-sm text-zinc-200 transition-colors hover:bg-zinc-700/30"
          >
            <RotateCcw size={14} />
            {isEn ? "New Analysis" : "새로 분석하기"}
          </button>
          <Link
            href="/diagnose"
            className="flex items-center justify-center rounded-xl border border-zinc-600 px-4 py-3 text-sm text-zinc-200 transition-colors hover:bg-zinc-700/30"
          >
            {isEn ? "AI Diagnosis" : "AI 창업 진단"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* Premium Gate */
function PremiumGate({ t }: { t: (key: string) => string }) {
  return (
    <div className="min-h-screen bg-[#09090B] pt-20">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <span className="text-6xl mb-6 block">🔒</span>
          <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
            {t("location.premium_title")}
          </h2>
          <p className="mt-4 text-zinc-400 whitespace-pre-line leading-relaxed">
            {t("location.premium_desc")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🏪", titleKey: "location.premium_card1_title", descKey: "location.premium_card1_desc" },
              { icon: "💰", titleKey: "location.premium_card2_title", descKey: "location.premium_card2_desc" },
              { icon: "🤖", titleKey: "location.premium_card3_title", descKey: "location.premium_card3_desc" },
            ].map((card) => (
              <div
                key={card.titleKey}
                className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-5 text-center"
              >
                <span className="text-2xl">{card.icon}</span>
                <h3 className="mt-2 text-sm font-bold text-zinc-100">
                  {t(card.titleKey)}
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  {t(card.descKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-10 overflow-hidden rounded-2xl border border-zinc-700/50">
            <div className="h-64 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <MapPin size={48} className="text-violet-400/50" />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:from-violet-400 hover:to-blue-400"
            >
              {t("location.premium_cta")}
            </Link>
            <Link
              href="/diagnose"
              className="text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-300"
            >
              {t("location.premium_free_alt")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LocationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#09090B]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>}>
      <LocationContent />
    </Suspense>
  );
}
