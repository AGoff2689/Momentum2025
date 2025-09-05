const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const PRICE_ID = "price_XXXXXXXXXXXX"; // <-- replace with your real price id

const ok = (b, c = 200) => ({
  statusCode: c,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
  body: typeof b === "string" ? b : JSON.stringify(b),
});

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return ok("", 204);
  if (event.httpMethod !== "POST") return ok({ error: "Method not allowed" }, 405);
  try {
    const payload = JSON.parse(event.body || "{}");
    const trialDays = Number.isFinite(payload.trialDays) ? payload.trialDays : 3;
    const base = process.env.PUBLIC_BASE_URL || "https://momentum2025.netlify.app";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      subscription_data: trialDays ? { trial_period_days: trialDays } : undefined,
      success_url: `${base}/success`,
      cancel_url: `${base}/pro`,
      allow_promotion_codes: true,
    });
    return ok({ url: session.url });
  } catch (e) {
    console.error(e);
    return ok({ error: "checkout_failed" }, 500);
  }
};
