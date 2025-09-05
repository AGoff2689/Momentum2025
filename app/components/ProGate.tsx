"use client";
import { useEffect, useState } from "react";
import { isPro, startTrialIfNeeded, trialStatus } from "../lib/trial";

export default function ProGate({ children }:{ children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [pro, setPro] = useState(false);
  const [trial, setTrial] = useState<{active:boolean;remainingDays:number}>({active:false,remainingDays:0});

  useEffect(() => {
    startTrialIfNeeded();
    setPro(isPro());
    setTrial(trialStatus());
    setReady(true);
  }, []);

  if (!ready) return null;
  if (pro || trial.active) {
    return (
      <div style={{ position:"relative" }}>
        {!pro && trial.active && (
          <div className="subtle" style={{position:"absolute",top:-28,right:0,fontSize:12}}>
            Trial: {trial.remainingDays} day{trial.remainingDays===1?"":"s"} left
          </div>
        )}
        {children}
      </div>
    );
  }
  return (
    <div className="card" style={{ padding: 16 }}>
      <strong>Pro feature</strong>
      <p className="subtle" style={{marginTop:6}}>Your 3-day trial ended. Upgrade to keep full access.</p>
      <a className="btn btn-primary" href="/pricing">Upgrade</a>
      <a className="btn btn-outline" style={{marginLeft:8}} href="/free">Use Free tools</a>
    </div>
  );
}
