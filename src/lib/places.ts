export interface NearbyPlace {
  name: string;
  rating: number;
  userRatingsTotal: number;
  vicinity: string;
  lat: number;
  lng: number;
  placeId: string;
}

const industryToPlaceType: Record<string, string[]> = {
  cafe_restaurant: ["cafe", "restaurant"],
  online_shop: ["store"],
  it_service: ["electronics_store"],
  trading: ["store"],
  freelancer: ["store"],
  education: ["school"],
  real_estate: ["real_estate_agency"],
  undecided: ["store"],
};

export function searchNearby(
  map: google.maps.Map,
  lat: number,
  lng: number,
  radius: number,
  industryId: string
): Promise<NearbyPlace[]> {
  const service = new google.maps.places.PlacesService(map);
  const types = industryToPlaceType[industryId] ?? ["store"];

  const doSearch = (type: string): Promise<NearbyPlace[]> =>
    new Promise((resolve) => {
      service.nearbySearch(
        {
          location: { lat, lng },
          radius,
          type,
        },
        (results, status) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !results
          ) {
            resolve([]);
            return;
          }
          resolve(
            results
              .filter((r) => r.geometry?.location)
              .map((r) => ({
                name: r.name ?? "",
                rating: r.rating ?? 0,
                userRatingsTotal: r.user_ratings_total ?? 0,
                vicinity: r.vicinity ?? "",
                lat: r.geometry!.location!.lat(),
                lng: r.geometry!.location!.lng(),
                placeId: r.place_id ?? "",
              }))
          );
        }
      );
    });

  return Promise.all(types.map((t) => doSearch(t))).then((arrays) => {
    const merged = arrays.flat();
    const seen = new Set<string>();
    return merged.filter((p) => {
      if (seen.has(p.placeId)) return false;
      seen.add(p.placeId);
      return true;
    });
  });
}

export function calculateEstimatedRevenue(
  reviewCount: number,
  industryId: string
): number {
  const unitPrice: Record<string, number> = {
    cafe_restaurant: 8000,
    online_shop: 20000,
    it_service: 30000,
    trading: 25000,
    freelancer: 20000,
    education: 15000,
    real_estate: 50000,
    undecided: 20000,
  };
  const visitors = reviewCount * 10;
  const price = unitPrice[industryId] ?? 20000;
  return visitors * price;
}

export function getCompetitionLevel(count: number): "low" | "medium" | "high" {
  if (count <= 5) return "low";
  if (count <= 15) return "medium";
  return "high";
}
