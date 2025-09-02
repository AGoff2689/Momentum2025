import BuyButton from "./BuyButton";

export default function Pricing() {
  return (
    <section
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "2rem",
        border: "1px solid #eee",
        borderRadius: 12,
        textAlign: "center"
      }}
    >
      <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
        Get Momentum2025
      </h2>
      <p style={{ color: "#555", marginBottom: "1.25rem" }}>
        One-click checkout with Stripe. Secure and fast.
      </p>
      <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
        $49.99 + tax
      </div>
      <BuyButton />
    </section>
  );
}
