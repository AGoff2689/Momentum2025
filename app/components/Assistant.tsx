"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role:"user"|"assistant", text:string };
type Task = { done:boolean, text:string };

function seedPlan(prompt:string): Task[] {
  // Simple starter plan; replace with real LLM plan later.
  return [
    { done:false, text:"Refine resume bullets with metrics" },
    { done:false, text:"Apply to 5 roles this week" },
    { done:false, text:"30 minutes/day interview practice" },
    { done:false, text:"Reach out to 3 contacts on LinkedIn" },
  ];
}

export default function Assistant(){
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState<Msg[]>([]);
  const [plan, setPlan] = useState<Task[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  // Load persisted state
  useEffect(()=>{
    try{
      const c = localStorage.getItem("m25:chat"); if(c) setChat(JSON.parse(c));
      const p = localStorage.getItem("m25:plan"); if(p) setPlan(JSON.parse(p));
    }catch{}
  }, []);

  // Persist on change
  useEffect(()=>{
    try{ localStorage.setItem("m25:chat", JSON.stringify(chat)); }catch{}
  }, [chat]);
  useEffect(()=>{
    try{ localStorage.setItem("m25:plan", JSON.stringify(plan)); }catch{}
  }, [plan]);

  useEffect(()=>{
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [chat, open]);

  const disabled = useMemo(()=> text.trim().length===0, [text]);

  async function send(){
    const prompt = text.trim();
    if(!prompt) return;
    setText("");
    setChat(prev=>[...prev, {role:"user", text:prompt}]);
    // optimistic typing indicator
    setChat(prev=>[...prev, {role:"assistant", text:"…"}]);

    try{
      const r = await fetch("/.netlify/functions/coach", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await r.json();
      const reply = data?.reply || "I created a quick starter plan for you.";
      // replace typing indicator
      setChat(prev=>{
        const copy = [...prev];
        const idx = copy.findIndex(m=>m.role==="assistant" && m.text==="…");
        if(idx>=0) copy[idx] = { role:"assistant", text:reply };
        return copy;
      });
      // if no plan yet, seed one based on prompt; else leave as-is
      setPlan(p=> p.length ? p : seedPlan(prompt));
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
      {/* Floating button */}
      <button className="assist-fab" aria-label="Open assistant" onClick={()=>setOpen(s=>!s)}>
        AI
      </button>

      {/* Sheet */}
      {open && (
        <div className="assist-sheet" role="dialog" aria-label="AI Assistant">
          <div className="assist-head">
            <div className="assist-dot" />
            <strong>Momentum Assistant</strong>
            <span style={{marginLeft:"auto"}} className="badge">Career Coach</span>
          </div>

          <div ref={scroller} className="assist-body">
            {/* Plan card shows at top for quick wins */}
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

            {/* Chat */}
            {chat.map((m, i)=>(
              <div key={i} className="assist-row" style={{justifyContent: m.role==="user"?"flex-end":"flex-start"}}>
                <div className={`assist-bubble ${m.role==="user"?"assist-user":"assist-bot"}`}>
                  {m.text}
                </div>
              </div>
            ))}

            {chat.length===0 && (
              <div className="assist-row">
                <div className="assist-bubble assist-bot">
                  Hi! Tell me your target role and timeframe — I’ll draft a weekly plan you can follow.
                </div>
              </div>
            )}
          </div>

          <div className="assist-input">
            <input
              value={text}
              onChange={e=>setText(e.target.value)}
              placeholder="Ask for help (e.g., 'Prep me for a PM interview')"
              onKeyDown={e=>{ if(e.key==="Enter" && !disabled) send(); }}
            />
            <button className="btn btn-primary" disabled={disabled} onClick={send}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
