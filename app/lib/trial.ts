const KEY_START = "m25:trial:start";
const KEY_DISABLED = "m25:trial:disabled";
export type TrialStatus = { state:"pro"; daysLeft:number } | { state:"free" };

export function startTrialIfNeeded(days=3){
  if (typeof window==="undefined") return;
  if (localStorage.getItem(KEY_DISABLED)) return;
  if (!localStorage.getItem(KEY_START)) localStorage.setItem(KEY_START, Date.now().toString());
}
export function disableTrial(){ if (typeof window!=="undefined") localStorage.setItem(KEY_DISABLED,"1"); }
export function trialStatus(days=3): TrialStatus {
  if (typeof window==="undefined") return { state:"free" };
  if (localStorage.getItem(KEY_DISABLED)) return { state:"free" };
  const start = parseInt(localStorage.getItem(KEY_START) || "0", 10);
  if (!start) return { state:"free" };
  const daysUsed = Math.floor((Date.now()-start)/(24*60*60*1000));
  const left = Math.max(0, days - daysUsed);
  return left>0 ? { state:"pro", daysLeft:left } : { state:"free" };
}
export const isProUnlocked = (days=3) => trialStatus(days).state==="pro";
