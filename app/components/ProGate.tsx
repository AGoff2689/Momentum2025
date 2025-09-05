"use client";
import { useEffect, useState } from "react";
import { isPro, trialStatus } from "../lib/trial";
import { startCheckout } from "../lib/checkout";

export default function ProGate({
  children,
  previewOnBlock = true,
  title = "Pro feature",
}:{
  children: React.ReactNode;
  previewOnBlock?: boolean;
  title?: string;
}) {
  const [ready, setReady] = useState(false);
  const [pro, setPro] = useState(false);
  const [trial, setTrial] = useState<{active:boolean;remainingDays:number}>({active:false,remainingDays:0});

  useEffect(() => {
    setPro(isPro());
    setTrial(trialStatus());
    setReady(true);
  }, []);

  if (!ready) return null;
  const allowed = pro || trial.active;
  if (allowed) return <>{children}</>;

  if (!previewOnBlock) {
    return (
      <div className="card" style={{ padding: 16 }}>
        <strong>{title}</strong>
        <p className="subtle" style={{marginTop:6}}>Trial ended. Upgrade to regain access.</p>
        <button className="btn btn-primary" onClick={()=>startCheckout(3)}>Upgrade</button>
      </div>
    );
  }

  return (
    <div style={{ position:"relative" }}>
      <div style={{ opacity:.45, filter:"grayscale(0.15)", pointerEvents:"none" }}>
        {children}
      </div>
      <div style={{
        position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
        background:"linear-gradient(180deg, rgba(10,14,30,.35), rgba(10,14,30,.55))",
        borderRadius:16, border:"1px dashed #2a3560"
      }}>
        <div className="card" style={{ padding:"14px 16px", textAlign:"center", maxWidth:360 }}>
          <strong style={{display:"block", marginBottom:6}}>Locked — {title}</strong>
          <div className="subtle" style={{marginBottom:10}}>Your 3-day trial ended. Upgrade to unlock Pro.</div>
          <div style={{display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap"}}>
            <button className="btn btn-primary" onClick={()=>startCheckout(3)}>Upgrade</button>
            <a className="btn btn-outline" href="/profile">Update profile</a>
          </div>
        </div>
      </div>
    </div>
  );
}
