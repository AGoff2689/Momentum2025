"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Msg = { id: string; from: "user" | "bot"; text: string };
const KEY = "m25:coachHistory";

export default function Coach() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { const saved = localStorage.getItem(KEY); if (saved) setMsgs(JSON.parse(saved)); } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(msgs)); } catch {} }, [msgs]);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }); }, [msgs, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const u: Msg = { id: crypto.randomUUID(), from: "user", text };
    setMsgs(m => [...m, u]);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/.netlify/functions/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text })
      });
      const data = await r.json();
      const b: Msg = { id: crypto.randomUUID(), from: "bot", text: data.reply || "…" };
      setMsgs(m => [...m, b]);
    } catch {
      setMsgs(m => [...m, { id: crypto.randomUUID(), from:"bot", text:"Sorry, I couldn’t reach the coach service." }]);
    } finally { setBusy(false); }
  };

  const quick = (q: string) => () => setInput(q);

  return (
    <main className="container" style={{ paddingTop: 12, height:"calc(100dvh - 80px)", display:"grid", gridTemplateRows:"auto 1fr auto", gap:12 }}>
      <div className="card" style={{padding:12}}>
        <strong>AI Career Coach</strong>
        <div className="subtle">Ask for a plan, resume bullets, interview prep, networking messages, and job search strategy.</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8, marginTop:8}}>
          <button className="btn btn-outline">7-day Plan</button>
          <button className="btn btn-outline">Resume Bullet</button>
          <button className="btn btn-outline">Interview</button>
          <button className="btn btn-outline">Networking DM</button>
        </div>
      </div>

      <div ref={scroller} className="card" style={{ padding:12, overflowY:"auto" }}>
        {msgs.map(m => (
          <motion.div key={m.id}
            initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
            style={{
              maxWidth:"80%", margin:"8px 0", padding:"10px 14px", borderRadius:16,
              alignSelf: m.from === "user" ? "flex-end" : "flex-start",
              background: m.from === "user" ? "var(--color-primary)" : "#f3f4f6",
              color: m.from === "user" ? "#fff" : "#111827",
              borderBottomRightRadius: m.from === "user" ? 4 : 16,
              borderBottomLeftRadius:  m.from === "user" ? 16 : 4,
            }}>
            {m.text}
          </motion.div>
        ))}
        {busy && <div className="subtle">…</div>}
      </div>

      <div style={{ display:"flex", gap:8 }}>
        <input className="input" style={{ flex:1 }} placeholder="Ask the coach anything…" value={input}
          onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter") send(); }} />
        <button className="btn btn-primary" disabled={busy}>Send</button>
      </div>
    </main>
  );
}
