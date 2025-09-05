// app/lib/trial.ts
const KEY_START = "m25:trialStart";   // ISO string
const KEY_PRO   = "m25:pro";          // "true" if purchased
const TRIAL_DAYS = 3;

export function isPro(): boolean {
  try { return localStorage.getItem(KEY_PRO) === "true"; } catch { return false; }
}
export function startTrialIfNeeded(): void {
  try {
    if (localStorage.getItem(KEY_START)) return;
    localStorage.setItem(KEY_START, new Date().toISOString());
  } catch {}
}
export function trialStatus(): { active: boolean; remainingDays: number } {
  try {
    if (isPro()) return { active: true, remainingDays: TRIAL_DAYS };
    const iso = localStorage.getItem(KEY_START);
    if (!iso) return { active: false, remainingDays: 0 };
    const start = new Date(iso).getTime();
    const now = Date.now();
    const days = (now - start) / (1000 * 60 * 60 * 24);
    const remaining = Math.ceil(TRIAL_DAYS - days);
    return { active: days < TRIAL_DAYS, remainingDays: Math.max(0, remaining) };
  } catch {
    return { active: false, remainingDays: 0 };
  }
}
