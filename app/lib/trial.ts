const KEY_START = "m25:trialStart";
const KEY_PRO   = "m25:pro";
const TRIAL_DAYS = 3;

export function isPro(): boolean {
  try { return localStorage.getItem(KEY_PRO) === "true"; } catch { return false; }
}
export function startTrialIfNeeded(): void {
  try { if (!localStorage.getItem(KEY_START)) localStorage.setItem(KEY_START, new Date().toISOString()); } catch {}
}
export function trialStatus(): { active: boolean; remainingDays: number } {
  try {
    if (isPro()) return { active: true, remainingDays: TRIAL_DAYS };
    const iso = localStorage.getItem(KEY_START); if (!iso) return { active: false, remainingDays: 0 };
    const days = (Date.now() - new Date(iso).getTime()) / 86400000;
    const remaining = Math.ceil(TRIAL_DAYS - days);
    return { active: days < TRIAL_DAYS, remainingDays: Math.max(0, remaining) };
  } catch { return { active: false, remainingDays: 0 }; }
}
