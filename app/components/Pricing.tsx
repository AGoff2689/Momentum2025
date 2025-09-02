import BuyButton from "./BuyButton";

export default function Pricing() {
  return (
    <section className="card card-lg" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
      <div className="kicker">Pro Plan</div>
      <h2 className="h2" style={{ margin: ".35rem 0 .75rem" }}>Get Momentum2025</h2>
      <p className="subtle" style={{ marginBottom: "1.25rem" }}>
        AI-powered tools to grow your career.
      </p>
      <div className="price" style={{ marginBottom: "1rem" }}>$49.99 <span className="subtle" style={{ fontWeight: 600 }}>+ tax</span></div>
      <BuyButton />
    </section>
  );
}

