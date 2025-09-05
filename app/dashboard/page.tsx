"use client";
import { useEffect, useState } from "react";
import ProGate from "../components/ProGate";

type Prefs = { order: string[]; hidden: string[] };
const KEY = "m25:dashPrefs";
const DEFAULT_ORDER = ["week","goals","proInsights","coachQuick","jobs"];

function usePrefs(){
  const [prefs,setPrefs]=useState<Prefs>({order:DEFAULT_ORDER, hidden:[]});
  useEffect(()=>{ try{ const p=localStorage.getItem(KEY); if(p) setPrefs(JSON.parse(p)); }catch{} },[]);
  useEffect(()=>{ try{ localStorage.setItem(KEY, JSON.stringify(prefs)); }catch{} },[prefs]);
  const toggleHide = (id:string)=> setPrefs(p=>({
    ...p, hidden: p.hidden.includes(id) ? p.hidden.filter(x=>x!==id) : [...p.hidden,id]
  }));
  const move = (id:string, dir:-1|1)=> setPrefs(p=>{
    const arr=[...p.order]; const i=arr.indexOf(id); if(i===-1) return p;
    const j=i+dir; if(j<0||j>=arr.length) return p;
    const tmp=arr[i]; arr[i]=arr[j]; arr[j]=tmp; return {...p, order:arr};
  });
  return { prefs, toggleHide, move };
}

export default function Dashboard(){
  const { prefs, toggleHide, move } = usePrefs();

  const cards: Record<string, JSX.Element> = {
    week: (
      <div className="card card-lg"><h2 className="h2">Your week</h2><p className="subtle">Weekly plan preview.</p></div>
    ),
    goals: (
      <div className="card card-lg"><h2 className="h2">Goals</h2><p className="subtle">Target roles, companies, daily quotas.</p></div>
    ),
    proInsights: (
      <ProGate>
        <div className="card card-lg"><h2 className="h2">Pro Insights</h2><p className="subtle">ATS scan, skills gap, targets.</p></div>
      </ProGate>
    ),
    coachQuick: (
      <div className="card card-lg">
        <h2 className="h2">Coach shortcuts</h2>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <a className="btn btn-outline" href="/coach">7-day plan</a>
          <a className="btn btn-outline" href="/coach">Resume bullet</a>
          <a className="btn btn-outline" href="/coach">Interview Qs</a>
        </div>
      </div>
    ),
    jobs: (
      <div className="card card-lg"><h2 className="h2">Jobs tracker</h2><p className="subtle">Saved roles and follow-ups.</p></div>
    ),
  };

  return (
    <main className="container" style={{paddingTop:12}}>
      <div className="card card-lg" style={{marginBottom:12}}>
        <strong>Customize dashboard</strong>
        <div className="subtle" style={{marginTop:6}}>Show/hide and reorder sections. Saved automatically.</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:10}}>
          {DEFAULT_ORDER.map(id=>(
            <div key={id} className="badge" style={{display:"flex",alignItems:"center",gap:8}}>
              <span>{id}</span>
              <button className="btn btn-outline" onClick={()=>move(id,-1)}>↑</button>
              <button className="btn btn-outline" onClick={()=>move(id, 1)}>↓</button>
              <button className="btn btn-outline" onClick={()=>toggleHide(id)}>
                {prefs.hidden.includes(id)?"Show":"Hide"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="grid-2">
        {prefs.order.filter(id=>!prefs.hidden.includes(id)).map(id => <div key={id}>{cards[id]}</div>)}
      </div>
    </main>
  );
}
