import BuyButton from "../components/../components/BuyButton";

export default function PricingPage() {
  return (
    <main className="container" style={{ paddingTop:"1rem" }}>
      <h1 className="h2" style={{ marginBottom:"1rem" }}>Pricing</h1>
      <div className="grid-2">
        <section className="card card-lg" style={{ textAlign:"center" }}>
          <div className="kicker">Free</div>
          <h2 className="h2" style={{ margin:".35rem 0 .75rem" }}>Starter</h2>
          <p className="subtle">Weekly plan, resume helper, basic tracker.</p>
          <div className="price" style={{ margin:"1rem 0" }}>$0</div>
          <a className="btn btn-outline" href="/free">Start Free</a>
        </section>

        <section className="card card-lg" style={{ textAlign:"center" }}>
          <div className="kicker">Pro</div>
          <h2 className="h2" style={{ margin:".35rem 0 .75rem" }}>Momentum2025</h2>
          <p className="subtle">Full dashboard, advanced tools, AI coach.</p>
          <div className="price" style={{ margin:"1rem 0" }}>$49.99 <span className="subtle">+ tax</span></div>
          <BuyButton />
        </section>
      </div>
    </main>
  );
}
