"use client";
import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    try { localStorage.setItem("m25:pro","true"); } catch {}
  }, []);
  return (
    <main className="container" style={{ paddingTop: 24 }}>
      <div className="card card-lg" style={{ textAlign:"center" }}>
        <h1 className="h2">You're all set 🎉</h1>
        <p className="subtle">Your Pro access is active. You can manage billing from Stripe’s receipt email.</p>
        <div style={{ marginTop: 16 }}>
          <a className="btn btn-primary" href="/dashboard">Go to Dashboard</a>
        </div>
      </div>
    </main>
  );
}
