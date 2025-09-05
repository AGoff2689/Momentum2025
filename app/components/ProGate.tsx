"use client";
import { useEffect, useState } from "react";
import { isPro, trialStatus } from "../lib/trial";

export default function ProGate({
  children,
  previewOnBlock = true,
  title = "Pro feature",
  ctaHref = "/pricing"
}:{
  children: React.ReactNode;
  previewOnBlock?: boolean;
  title?: string;
  ctaHref?: string;
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
        <a className="btn btn-primary" href={ctaHref}>Upgrade</a>
      </div>
    );
  }

  // Preview mode: show content dimmed & locked
  return (
    <div style={{ position:"relative" }}>
      <div style={{ opacity:.45, filter:"grayscale(0.15)", pointerEvents:"none" }}>
        {children}
      </div>
      <div style="
        position:absolute; inset:0; display:flex; align-items:center; justify-content:center; 
        background:linear-gradient(180deg, rgba(10,14,30,.35), rgba(10,14,30,.55));
        border-radius:16px; border:1px dashed #2a3560;">
        <div className="card" style="padding:14px 16px; text-align:center; max-width:360px;">
          <strong style="display:block; margin-bottom:6px;">Locked — {title}</strong>
          <div className="subtle" style="margin-bottom:10px;">Your 3-day trial ended. Upgrade to unlock Pro.</div>
          <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
            <a className="btn btn-primary" href="/pricing">Upgrade</a>
            <a className="btn btn-outline" href="/profile">Update profile</a>
          </div>
        </div>
      </div>
    </div>
  );
}
