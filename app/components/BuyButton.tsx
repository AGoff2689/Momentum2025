"use client";

export default function BuyButton() {
  const stripeLink =
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
    "https://buy.stripe.com/cNi00k4Bd05sgmY22Uf7i02"; // fallback if env not set

  return (
    <a
      href={stripeLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        padding: "12px 20px",
        background: "#111",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: 600
      }}
    >
      Buy Momentum2025
    </a>
  );
}
