"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import StartTrial from "../components/StartTrial";

type Task = { done:boolean; text:string };

export default function Dashboard(){
  const [plan, setPlan] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const p = localStorage.getItem("m25:plan");
    if (p) setPlan(JSON.parse(p));
  },[]);
  useEffect(()=>{
    localStorage.setItem("m25:plan", JSON.stringify(plan));
  },[plan]);

  function toggle(i:number){ setPlan(prev=>{ const c=[...prev]; c[i]={...c[i],done:!c[i].done}; return c; }); }

  async function regenerate(){
    setLoading(true);
    try{
      const profile = JSON.parse(localStorage.getItem("m25:profile") || '{"answers":{}}').answers;
      const resumeText = localStorage.getItem("m25:resume") || "";
      const goals = localStorage.getItem("m25:goals") || "";
      const r = await fetch("/api/coach",{
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ mode:"plan", resumeText, goals, profile })
      });
      const data = await r.json();
      const tasks = (data?.plan || []).map((t:string)=>({done:false,text:t}));
      setPlan(tasks);
    }catch{}
    setLoading(false);
  }

  return (
    <main>
      <StartTrial />
      <h1 className="h2" style={{marginBottom:12}}>Your Weekly Plan</h1>
      <div className="card card-lg">
        {plan.length === 0 ? (
          <div className="subtle">No plan yet. <a className="btn btn-outline" href="/profile" style={{marginLeft:8}}>Create your profile</a></div>
        ) : (
          <ul style={{margin:"0 0 10px 16px", lineHeight:1.9}}>
            {plan.map((t,i)=>(
              <li key={i}>
                <label style={{display:"flex",gap:8,alignItems:"center",cursor:"pointer"}}>
                  <input type="checkbox" checked={t.done} onChange={()=>toggle(i)} />
                  <span style={{textDecoration: t.done ? "line-through":"none"}}>{t.text}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
        <div style={{display:"flex",gap:8,marginTop:10}}>
          <button className="btn btn-primary" onClick={regenerate} disabled={loading}>{loading?"Generating…":"Regenerate with Moe"}</button>
          <a className="btn btn-outline" href="/pro">Explore Pro Services</a>
        </div>
      </div>
    </main>
  );
}
