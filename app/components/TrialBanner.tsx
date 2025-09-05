"use client";
import { useEffect, useState } from "react";
import { trialStatus, isPro } from "../lib/trial";
export default function TrialBanner(){
  const [msg,setMsg]=useState<string>("");
  useEffect(()=>{
    const t = trialStatus();
    if (isPro()) setMsg("Pro active");
    else if (t.active) setMsg(`Free Trial: ${t.remainingDays} day${t.remainingDays===1?"":"s"} left`);
    else setMsg("You’re on the Free plan. Upgrade anytime.");
  },[]);
  if (!msg) return null;
  return (
    <div className="container" style={{paddingTop:8}}>
      <div className="card" style={{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span className="subtle">{msg}</span>
        <div style={{display:"flex",gap:8}}>
          <a className="btn btn-outline" href="/free">Free tools</a>
          <a className="btn btn-primary" href="/pricing">Upgrade</a>
        </div>
      </div>
    </div>
  );
}
