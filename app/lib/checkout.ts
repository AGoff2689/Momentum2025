export async function startCheckout(trialDays = 3) {
  const r = await fetch("/.netlify/functions/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trialDays }),
  });
  const data = await r.json();
  if (data?.url) window.location.href = data.url;
  else throw new Error("checkout_failed");
}
