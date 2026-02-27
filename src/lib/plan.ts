const PLAN_KEY = "user_plan";
const DIAG_COUNT_KEY = "diagnosis_count";

export type UserPlan = "free" | "pro";

export function getUserPlan(): UserPlan {
  if (typeof window === "undefined") return "free";
  return (localStorage.getItem(PLAN_KEY) as UserPlan) || "free";
}

export function setUserPlan(plan: UserPlan): void {
  localStorage.setItem(PLAN_KEY, plan);
}

export function isPro(): boolean {
  return getUserPlan() === "pro";
}

export function getDiagnosisCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(DIAG_COUNT_KEY) || "0", 10);
}

export function incrementDiagnosisCount(): number {
  const count = getDiagnosisCount() + 1;
  localStorage.setItem(DIAG_COUNT_KEY, count.toString());
  return count;
}

export type PremiumFeature = "location" | "government_support";

export function canAccessFeature(feature: PremiumFeature): boolean {
  return true;
}
