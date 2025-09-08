"use client";
import { useState } from "react";

const FEATURES = [
  { label: "AI Career Coach (chat)", free: true, pro: true },
  { label: "Weekly plan generator", free: true, pro: true },
  { label: "Resume bullet helper", free: true, pro: true },
  { label: "Interview prep (mock Qs)", free: true, pro: true },
  { label: "Job tracker", free: true, pro: true },
  { label: "ATS resume scan & score", free: false, pro: true },
  { label: "Skills gap & role targeting", free: false, pro: true },
  { label: "Personalized outreach scripts", free: false, pro: true },
  { label: "Portfolio & case prompts", free: false, pro: true },
  { label: "Priority updates & new tools", free: false, pro: true },
];

function Row({ label, free, pro }:{ label:string; free:boolean; pro:boolean }){
  const yes="✓", no="—";
  return (<>
    <div>{label}</div>
    <div style={{textAlign:"center"}}>{free?yes:no}</div>
    <div style={{textAlign:"center"}}>{pro?yes:no}</div>
  </>);
}

export default function PricingPage() {
  const [busy, setBusy] = useState(false);
  const startTrial = async () => {
    try {
      setBusy(true);
      const r = await fetch("/.netlify/functions/create-checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trialDays: 3 }),
      });
      const data = await r.json();
      if (data?.url) window.location.href = data.url;
      else alert("Unable to start checkout. Please try again.");
    } finally { setBusy(false); }
  };

  return (
    <main className="container" style={{ paddingTop: 16, maxWidth: 1100 }}>
      <section className="card card-lg" style={{ marginBottom: 16, textAlign: "center" }}>
        <h1 className="h1">Choose your plan</h1>
        <p className="subtle" style={{ maxWidth: 760, margin: "0 auto 12px" }}>
          Start with a <strong>3-day free trial</strong> of Pro. Cancel anytime during the trial to avoid charges.
          After 3 days, continue at <strong>$49.99/month + tax</strong> or automatically downgrade to Free.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn btn-outline" href="/free">Keep Free</a>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? "Starting…" : "Start 3-day Pro Trial"}
          </button>
        </div>
      </section>

      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(2,minmax(0,1fr))", marginBottom: 16 }}>
        <div className="card card-lg">
          <h2 className="h2">Free</h2>
          <ul><li>AI Coach (limited)</li><li>Resume bullets</li><li>Weekly plan (basic)</li><li>Interview prep (starter)</li><li>Jobs tracker</li></ul>
          <a className="btn btn-outline" href="/profile" style={{ marginTop: 12 }}>Get Free</a>
        </div>
        <div className="card card-lg" style={{ borderColor:"var(--primary)" }}>
          <h2 className="h2">Pro — $49.99/mo</h2>
          <ul>
            <li>Everything in Free</li>
            <li>ATS resume scan & score</li>
            <li>Skills gap analysis & targeting</li>
            <li>Personalized outreach scripts</li>
            <li>Portfolio/case prompts</li>
            <li>Priority updates</li>
          </ul>
          <button className="btn btn-primary" disabled={busy} style={{ marginTop: 12 }}>
            {busy ? "Starting…" : "Start 3-day trial"}
          </button>
          <div className="subtle" style={{ marginTop: 8 }}>No charge if you cancel during the trial. Taxes at checkout.</div>
        </div>
      </section>

      <section className="card card-lg" style={{ marginBottom: 16 }}>
        <h3 className="h2" style={{ marginBottom: 10 }}>Compare features</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 8, alignItems: "center" }}>
          <div className="subtle"></div>
          <div className="subtle" style={{ textAlign: "center" }}>Free</div>
          <div className="subtle" style={{ textAlign: "center" }}>Pro</div>
          {FEATURES.map(f => <Row key={f.label} label={f.label} free={f.free} pro={f.pro} />)}
        </div>
      </section>

      <section className="card card-lg">
        <h3 className="h2" style={{ marginBottom: 10 }}>FAQs & Trust</h3>
        <ul style={{lineHeight:1.6}}>
          <li><strong>Trial:</strong> 3 days free, cancel anytime.</li>
          <li><strong>Downgrade:</strong> Auto to Free if not upgraded.</li>
          <li><strong>Cancel:</strong> Stripe portal link in your receipt.</li>
          <li><strong>Payments:</strong> Secured by Stripe; we don’t store card data.</li>
          <li><strong>Data:</strong> Profile answers stored locally unless you choose to share more.</li>
          <li><strong>Support:</strong> support@momentum2025.net</li>
        </ul>
      </section>
    </main>
  );
}
