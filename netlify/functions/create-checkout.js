const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return ok("", 204);
  if (event.httpMethod !== "POST")   return err("Method not allowed", 405);

  try {
    const { mode = "subscription", trialDays = 3 } = JSON.parse(event.body || "{}");
    const PRICE_ID = process.env.STRIPE_PRICE_ID; // e.g. price_123

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      subscription_data: trialDays ? { trial_period_days: trialDays } : undefined,
      success_url: `${process.env.PUBLIC_BASE_URL || "https://momentum2025.netlify.app"}/success`,
      cancel_url: `${process.env.PUBLIC_BASE_URL || "https://momentum2025.netlify.app"}/pricing`,
      allow_promotion_codes: true
    });

    return ok(JSON.stringify({ url: session.url }), 200);
  } catch (e) {
    console.error(e);
    return err("Checkout creation failed", 500);
  }
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
const ok  = (b, c=200) => ({ statusCode: c, headers: cors, body: b });
const err = (m, c=400) => ok(JSON.stringify({ error: m }), c);
