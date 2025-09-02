"use client";

export default function BuyButton() {
  const stripeLink =
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
    "https://buy.stripe.com/cNi00k4Bd05sgmY22Uf7i02";

  return (
    <a href={stripeLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
      Buy Momentum2025
    </a>
  );
}

