"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type QAState = { answers: Record<string,string> };
type ChatMsg = { role: "assistant" | "user"; text: string };

export default function ProfileAI(){
  const router = useRouter();
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [goals, setGoals] = useState("");
  const [state, setState] = useState<QAState>({ answers:{} });
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<null | "pending" | "ok" | "err">(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const r = localStorage.getItem("m25:resume") || "";
    const g = localStorage.getItem("m25:goals") || "";
    const s = localStorage.getItem("m25:profile");
    if (s) setState(JSON.parse(s));
    setResumeText(r); setGoals(g);
    setChat([{role:"assistant", text:"Hi, I’m Moe. Upload your resume (PDF/DOCX/TXT) and/or type your goals. I’ll ask tailored questions here to build your plan."}]);
  },[]);
  useEffect(()=>{ localStorage.setItem("m25:profile", JSON.stringify(state)); },[state]);

  function appendAssistant(text: string){ setChat(p=>[...p, {role:"assistant", text}]); }
  function appendUser(text: string){ setChat(p=>[...p, {role:"user", text}]); }

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.currentTarget.files?.[0]; if (!f) return;
    const body = new FormData(); body.set("file", f);
    setUploading("pending");
    try{
      const r = await fetch("/api/parse-resume", { method:"POST", body });
      const data = await r.json();
      if (data?.text) {
        setResumeText(data.text);
        localStorage.setItem("m25:resume", data.text);
        appendAssistant(`Parsed “${f.name}” (${data.kind?.toUpperCase() || "file"}) ✓`);
        setUploading("ok");
      } else {
        appendAssistant(data?.message || "Couldn’t read that file. Try PDF/DOCX/TXT or paste your text.");
        setUploading("err");
      }
    }catch{
      appendAssistant("Upload failed — please try again.");
      setUploading("err");
    }
    e.currentTarget.value = "";
  }

  async function start(){
    if (input.trim()) {
      appendUser(input.trim());
      const newGoals = (goals ? goals+"\n" : "") + input.trim();
      setGoals(newGoals); localStorage.setItem("m25:goals", newGoals);
      setInput("");
    }
    if (!resumeText.trim() && !goals.trim()) {
      appendAssistant("Please upload a resume or type a short goal so I can start.");
      return;
    }
    setReady(true);
    await askNext();
  }

  async function askNext(){
    setLoading(true);
    try{
      const r = await fetch("/api/coach", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ mode:"ask_next_question", resumeText, goals, state })
      });
      const data = await r.json();
      if (data?.done || !data?.question) {
        setDone(true);
        appendAssistant("Thanks — drafting your weekly plan…");
        await makePlan();
        return;
      }
      appendAssistant(data.question);
    }catch{
      appendAssistant("(Connection issue — try again.)");
    }
    setLoading(false); inputRef.current?.focus();
  }

  async function submit(){
    const v = input.trim(); if (!v) return;
    if (!ready){
      appendUser(v);
      const newGoals = (goals ? goals+"\n" : "") + v;
      setGoals(newGoals); localStorage.setItem("m25:goals", newGoals);
      setInput(""); return;
    }
    appendUser(v);
    const key = `q${Object.keys(state.answers).length+1}`;
    setState(prev=>({ answers:{ ...prev.answers, [key]: v }}));
    setInput(""); await askNext();
  }

  async function makePlan(){
    try{
      const r = await fetch("/api/coach",{
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ mode:"plan", resumeText, goals, profile: state.answers })
      });
      const data = await r.json();
      if (Array.isArray(data?.plan)) {
        localStorage.setItem("m25:plan", JSON.stringify(data.plan.map((t:string)=>({done:false,text:t}))));
      }
    }catch{}
    setTimeout(()=>router.push("/dashboard"), 500);
  }

  return (
    <main className="container" style={{ maxWidth: 920 }}>
      <h1 className="h2" style={{ marginBottom: 10 }}>Profile</h1>
      <section className="card card-lg" style={{ marginBottom: 12 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:10, flexWrap:"wrap" }}>
          <input
            ref={inputRef}
            className="input"
            placeholder={ready ? "Type your answer for Moe…" : "Type your goals/intentions…"}
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter") submit(); }}
            style={{ flex:1, minWidth:260 }}
          />
          <label className="btn btn-outline">
            {uploading==="pending" ? "Uploading…" : uploading==="ok" ? "Parsed ✓" : uploading==="err" ? "Try Again" : "Upload Resume"}
            <input type="file" accept=".pdf,.docx,.txt" onChange={uploadFile} style={{ display:"none" }} />
          </label>
          {!ready
            ? <button className="btn btn-primary" onClick={start}>Start</button>
            : <button className="btn btn-primary" onClick={submit} disabled={loading}>Send</button>}
        </div>

        <div style={{ maxHeight: 420, overflow: "auto", padding: 4 }}>
          {chat.map((m,i)=>(
            <div key={i} style={{ display:"flex", justifyContent: m.role==="user" ? "flex-end":"flex-start", marginBottom:8 }}>
              <div style={{
                background: m.role==="user" ? "#eff3f9" : "#f6fbf9",
                border:"1px solid #e6edf7", padding:"10px 12px", borderRadius:12, maxWidth:600
              }}>{m.text}</div>
            </div>
          ))}
          {done && <div className="subtle" style={{ marginTop:8 }}>Plan created — redirecting to your dashboard…</div>}
        </div>
      </section>
    </main>
  );
}
