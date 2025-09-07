"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role:"user"|"assistant", text:string };
type Task = { done:boolean, text:string };

export default function Assistant(){
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState<Msg[]>([]);
  const [plan, setPlan] = useState<Task[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    try{
      const c = localStorage.getItem("m25:chat"); if(c) setChat(JSON.parse(c));
      const p = localStorage.getItem("m25:plan"); if(p) setPlan(JSON.parse(p));
    }catch{}
  }, []);
  useEffect(()=>{ try{ localStorage.setItem("m25:chat", JSON.stringify(chat)); }catch{} }, [chat]);
  useEffect(()=>{ try{ localStorage.setItem("m25:plan", JSON.stringify(plan)); }catch{} }, [plan]);
  useEffect(()=>{ scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }); }, [chat, open]);

  const disabled = useMemo(()=> text.trim().length===0, [text]);

  async function send(prompt?: string){
    const message = (prompt ?? text).trim();
    if(!message) return;
    setText("");
    setChat(prev=>[...prev, {role:"user", text:message}, {role:"assistant", text:"…"}]);

    let profile: any = null;
    try{
      const p = localStorage.getItem("m25:profile");
      if (p) profile = JSON.parse(p);
    }catch{}

    try{
      const r = await fetch("/api/coach", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ prompt: message, profile })
      });
      const data = await r.json();
      setChat(prev=>{
        const copy = [...prev];
        const idx = copy.findIndex(m=>m.role==="assistant" && m.text==="…");
        if(idx>=0) copy[idx] = { role:"assistant", text:data?.reply || "I created a plan for you." };
        return copy;
      });
      if (Array.isArray(data?.plan) && data.plan.length) {
        setPlan(data.plan.map((t:string)=>({done:false,text:t})));
      }
    }catch{
      setChat(prev=>{
        const copy = [...prev];
        const idx = copy.findIndex(m=>m.role==="assistant" && m.text==="…");
        if(idx>=0) copy[idx] = { role:"assistant", text:"(Connection issue — try again.)" };
        return copy;
      });
    }
  }

  function toggleTask(i:number){
    setPlan(prev=>{
      const copy = [...prev]; copy[i] = {...copy[i], done: !copy[i].done}; return copy;
    });
  }

  return (
    <>
      <button className="assist-fab" aria-label="Open assistant" onClick={()=>setOpen(s=>!s)}>AI</button>
      {open && (
        <div className="assist-sheet" role="dialog" aria-label="AI Assistant">
          <div className="assist-head">
            <div className="assist-dot" /><strong>Momentum Assistant</strong>
            <span style={{marginLeft:"auto"}} className="badge">Career Coach</span>
          </div>

          <div ref={scroller} className="assist-body">
            {plan.length>0 && (
              <div className="plan-card">
                <strong>Weekly Plan</strong>
                <ul style={{margin:"8px 0 0 16px",lineHeight:1.8}}>
                  {plan.map((t,i)=>(
                    <li key={i}>
                      <label style={{display:"flex",gap:8,alignItems:"center",cursor:"pointer"}}>
                        <input type="checkbox" checked={t.done} onChange={()=>toggleTask(i)} />
                        <span style={{textDecoration: t.done ? "line-through":"none"}}>{t.text}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {chat.map((m, i)=>(
              <div key={i} className="assist-row" style={{justifyContent: m.role==="user"?"flex-end":"flex-start"}}>
                <div className={`assist-bubble ${m.role==="user"?"assist-user":"assist-bot"}`}>{m.text}</div>
              </div>
            ))}

            {chat.length===0 && (
              <div className="assist-row">
                <div className="assist-bubble assist-bot">
                  Hi! Tell me your <b>target role</b> and <b>timeframe</b> — I’ll draft a weekly plan you can follow.
                </div>
              </div>
            )}
          </div>

          <div className="assist-input">
            <input
              value={text}
              onChange={e=>setText(e.target.value)}
              placeholder="Ask (e.g., 'Prep me for a PM interview in 3 weeks')"
              onKeyDown={e=>{ if(e.key==="Enter" && !disabled) send(); }}
            />
            <button className="btn btn-primary" disabled={disabled} onClick={()=>send()}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
