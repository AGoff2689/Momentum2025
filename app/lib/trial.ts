export function startTrialIfNeeded(days = 3) {
  if (typeof window === "undefined") return;
  const k = "m25:trialEndsAt";
  if (!localStorage.getItem(k)) {
    const ends = Date.now() + days*24*60*60*1000;
    localStorage.setItem(k, String(ends));
  }
}
export function getTrialEndsAt(): number|null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem("m25:trialEndsAt");
  return v ? Number(v) : null;
}
