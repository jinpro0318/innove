"use client";

import { useState, useRef, useCallback, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, RotateCcw } from "lucide-react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { useLocale } from "@/hooks/useLocale";
import { industries } from "@/data/industries";
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

const SEOUL_CENTER = { lat: 37.5665, lng: 126.978 };

const QUICK_LOCATIONS = [
  { id: "gangnam", lat: 37.4979, lng: 127.0276 },
  { id: "hongdae", lat: 37.5563, lng: 126.9236 },
  { id: "pangyo", lat: 37.3947, lng: 127.1112 },
] as const;

function LocationContent() {
  const { locale, t } = useLocale();
  const isEn = locale === "en";
  const searchParams = useSearchParams();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [selectedIndustry, setSelectedIndustry] = useState("");

  useEffect(() => {
    const industryParam = searchParams.get("industry");
    if (industryParam && industries.some((i) => i.id === industryParam)) {
      setSelectedIndustry(industryParam);
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

  const handleQuickLocation = useCallback(
    (loc: (typeof QUICK_LOCATIONS)[number]) => {
      const nameKey = `location.quick_${loc.id}` as const;
      setSearchLocation({
        lat: loc.lat,
        lng: loc.lng,
        name: t(nameKey),
      });
      setSearchError("");
    },
    [t]
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
        setSearchError(t("location.error_no_results"));
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
      setSearchError(t("location.error_api"));
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndustry, searchLocation, radius, t]);

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

      const prompt = `사용자가 ${searchLocation.name}에서 ${industryName}을 창업하려고 합니다.
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
    [selectedIndustry, searchLocation, radius, isEn]
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
    mapRef.current?.panTo(SEOUL_CENTER);
    mapRef.current?.setZoom(11);
  }, []);

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

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  const canAnalyze = selectedIndustry && searchLocation && !isLoading;

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-20">
      {/* Sticky search bar */}
      <div className="sticky top-16 z-30 border-b border-zinc-800/50 bg-[#0A0A0F]/95 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center">
          {/* Industry select */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 outline-none focus:border-violet-500 sm:w-48"
          >
            <option value="">{t("location.select_industry")}</option>
            {industries
              .filter((ind) => ind.id !== "undecided")
              .map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.icon} {isEn ? ind.label_en : ind.label_ko}
                </option>
              ))}
          </select>

          {/* Autocomplete location input */}
          <div className="flex-1">
            <Autocomplete
              onLoad={onAutocompleteLoad}
              onPlaceChanged={onPlaceChanged}
              options={{ componentRestrictions: { country: "kr" } }}
            >
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="text"
                  placeholder={t("location.search_location")}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-2.5 pl-9 pr-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-violet-500"
                />
              </div>
            </Autocomplete>
          </div>

          {/* Radius */}
          <div className="flex items-center gap-2 sm:w-48">
            <span className="text-xs text-zinc-400 shrink-0">
              {t("location.radius")}
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
              {radius}
              {t("location.radius_unit")}
            </span>
          </div>

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:from-violet-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed sm:w-auto"
          >
            {isLoading ? t("location.analyzing") : t("location.analyze")}
          </button>
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
            <div className="overflow-hidden rounded-2xl border border-zinc-800">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "calc(100vh - 240px)", minHeight: "400px" }}
                center={
                  searchLocation
                    ? { lat: searchLocation.lat, lng: searchLocation.lng }
                    : SEOUL_CENTER
                }
                zoom={searchLocation ? 15 : 11}
                onLoad={onMapLoad}
                options={{
                  styles: DARK_MAP_STYLE,
                  disableDefaultUI: true,
                  zoomControl: true,
                }}
              >
                {/* Radius circle */}
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

                {/* Center marker */}
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

                {/* Competitor markers */}
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

                {/* InfoWindow */}
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
                        {t("location.top5_reviews")}
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
                t={t}
                onQuickLocation={handleQuickLocation}
              />
            ) : (
              <AnalysisPanel
                t={t}
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Initial State ── */
function InitialState({
  t,
  onQuickLocation,
}: {
  t: (key: string) => string;
  onQuickLocation: (loc: (typeof QUICK_LOCATIONS)[number]) => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
      <MapPin size={48} className="text-violet-400 mb-4" />
      <h3 className="text-lg font-bold text-zinc-100">
        {t("location.initial_title")}
      </h3>
      <p className="mt-2 text-sm text-zinc-400 whitespace-pre-line">
        {t("location.initial_desc")}
      </p>
      <div className="mt-6 w-full">
        <p className="text-xs text-zinc-500 mb-3">
          {t("location.quick_location")}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onQuickLocation(loc)}
              className="rounded-full border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-xs text-zinc-300 transition-all hover:border-violet-500/50 hover:text-violet-300"
            >
              📍 {t(`location.quick_${loc.id}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Analysis Panel ── */
function AnalysisPanel({
  t,
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
}: {
  t: (key: string) => string;
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

  const formatKRW = (n: number) => {
    if (n >= 100000000)
      return `₩${(n / 100000000).toFixed(1)}${isEn ? "B" : "억"}`;
    if (n >= 10000)
      return `₩${(n / 10000).toFixed(0)}${isEn ? "M" : "만"}`;
    return `₩${n.toLocaleString()}`;
  };

  return (
    <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
      {/* Card 1: Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          📊 {t("location.summary_title")}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-violet-400">
              {places.length}
            </p>
            <p className="text-[11px] text-zinc-500">
              {t("location.summary_competitors")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {avgRating.toFixed(1)}
            </p>
            <p className="text-[11px] text-zinc-500">
              {t("location.summary_avg_rating")}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-lg font-bold ${comp.color}`}>
              {comp.badge} {t(`location.competition_${competitionLevel}`)}
            </p>
            <p className="text-[11px] text-zinc-500">
              {t("location.summary_competition")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Top 5 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          🏪 {t("location.top5_title")}
        </h3>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {top5.map((place, i) => (
            <button
              key={place.placeId}
              onClick={() => onPlaceClick(place)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-zinc-800/50"
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
                  ⭐ {place.rating > 0 ? place.rating : t("location.top5_no_rating")}
                </p>
                <p className="text-[11px] text-zinc-500">
                  {place.userRatingsTotal} {t("location.top5_reviews")}
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
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          💡 {t("location.ai_title")}
        </h3>
        {aiLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-4 rounded bg-zinc-800 animate-pulse"
                style={{ width: `${85 - n * 10}%` }}
              />
            ))}
            <p className="text-xs text-zinc-500 mt-2">
              {t("location.ai_loading")}
            </p>
          </div>
        ) : aiError ? (
          <p className="text-sm text-red-400">{t("location.ai_error")}</p>
        ) : aiInsight ? (
          <>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {aiInsight}
            </p>
            <p className="mt-2 text-[11px] text-zinc-600">
              {t("location.ai_disclaimer")}
            </p>
          </>
        ) : null}
      </motion.div>

      {/* Card 4: Revenue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          💰 {t("location.revenue_title")}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-zinc-800/50 p-3 text-center">
            <p className="text-xs text-zinc-500">
              {t("location.revenue_avg")}
            </p>
            <p className="mt-1 text-lg font-bold text-emerald-400">
              {formatKRW(avgRevenue)}
            </p>
          </div>
          <div className="rounded-xl bg-zinc-800/50 p-3 text-center">
            <p className="text-xs text-zinc-500">
              {t("location.revenue_max")}
            </p>
            <p className="mt-1 text-lg font-bold text-blue-400">
              {formatKRW(maxRevenue)}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-zinc-600">
          {t("location.revenue_disclaimer")}
        </p>
      </motion.div>

      {/* Card 5: Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">
          🔗 {t("location.next_title")}
        </h3>
        <div className="space-y-2">
          <Link
            href="/register-guide"
            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:from-violet-500 hover:to-blue-500"
          >
            {t("location.next_register")}
          </Link>
          <button
            onClick={onReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            <RotateCcw size={14} />
            {t("location.next_reset")}
          </button>
          <Link
            href="/diagnose"
            className="flex items-center justify-center rounded-xl border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            {t("location.next_diagnose")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function LocationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#0A0A0F]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>}>
      <LocationContent />
    </Suspense>
  );
}
