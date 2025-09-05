"use client";
import { useEffect, useState } from "react";
import { trialStatus, isPro } from "../lib/trial";

export default function Header(){
  const [label,setLabel]=useState<string>("");
  useEffect(()=>{
    const t = trialStatus();
    if(isPro()) setLabel("Pro");
    else if(t.active) setLabel(`Trial: ${t.remainingDays} day${t.remainingDays===1?"":"s"} left`);
    else setLabel("Free");
  },[]);
  const active = (href:string)=> typeof window!=="undefined" && window.location.pathname===href ? "nav-item active" : "nav-item";
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:26,height:26,borderRadius:8,background:"var(--primary)"}}/>
          <strong>Momentum2025</strong>
        </a>
        <nav style={{display:"flex",gap:8,alignItems:"center"}}>
          <a className={active("/")} href="/">Introduction</a>
          <a className={active("/profile")} href="/profile">Profile</a>
          <a className={active("/pro")} href="/pro">Pro Services</a>
          <span className="badge">{label}</span>
        </nav>
      </div>
    </header>
  );
}
