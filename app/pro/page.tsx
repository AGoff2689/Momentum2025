"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { isProUnlocked, trialStatus } from "../lib/trial";
import StartTrial from "../components/StartTrial";

export default function ProServices(){
  const [pro, setPro] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  useEffect(()=>{
    const st = trialStatus(3);
    setPro(st.state==="pro"); setDaysLeft(st.state==="pro" ? st.daysLeft : null);
  },[]);
  async function upgrade(){
    try{
      const r = await fetch("/api/checkout", { method:"POST" });
      const data = await r.json();
      if (data?.url) window.location.href = data.url; else alert("Unable to start checkout.");
    }catch{ alert("Unable to start checkout."); }
  }
  const locked = !isProUnlocked(3);

  const Card = ({ title, desc }:{title:string;desc:string}) => (
    <div className="card card-lg" style={{ position:"relative", opacity: locked ? .65 : 1 }}>
      <strong>{title}</strong>
      {daysLeft !== null && <span className="badge" style={{marginLeft:8}}>Trial: {daysLeft} day{daysLeft===1?"":"s"} left</span>}
      <div className="subtle" style={{marginTop:6}}>{desc}</div>
      <div style={{ marginTop: 10 }}>
        <button className="btn btn-outline" onClick={()=>alert(`${title} (coming soon)`)} disabled={locked}>Open</button>
      </div>
      {locked && (
        <div style={{
          position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
          background:"rgba(255,255,255,.6)", borderRadius:14
        }}>
          <button className="btn btn-primary" onClick={upgrade}>Upgrade to Pro</button>
        </div>
      )}
    </div>
  );

  return (
    <main>
      <StartTrial />
      <h1 className="h2" style={{marginBottom:12}}>Pro Services</h1>
      <div className="grid-2">
        <Card title="ATS Resume Scan" desc="Upload resume, get ATS score & fixes." />
        <Card title="Skills Gap Analysis" desc="Compare your skills to target roles." />
        <Card title="Outreach Scripts" desc="Personalized networking & recruiter scripts." />
        <Card title="Reminders & Calendar" desc="Sync plan to calendar & nudges." />
      </div>
    </main>
  );
}
