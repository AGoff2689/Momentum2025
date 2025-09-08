"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type QAState = { answers: Record<string,string> };

export default function ProfileAI(){
  const router = useRouter();
  const [chat, setChat] = useState<{role:"assistant"|"user", text:string}[]>([]);
  const [input, setInput] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [goals, setGoals] = useState("");
  const [state, setState] = useState<QAState>({ answers: {} });
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const r = localStorage.getItem("m25:resume") || "";
    const g = localStorage.getItem("m25:goals") || "";
    const s = localStorage.getItem("m25:profile");
    if (s) setState(JSON.parse(s));
    setResumeText(r); setGoals(g);
    setChat([{role:"assistant", text:"Welcome! Upload your resume (PDF/DOCX/TXT) and/or type your goals here. Then I’ll ask tailored questions in this chat."}]);
  }, []);
  useEffect(()=>{ localStorage.setItem("m25:profile", JSON.stringify(state)); }, [state]);

  function saveGoalsIfPresent() {
    if (input.trim().length) {
      setGoals(prev=> (prev ? `${prev}\n${input.trim()}` : input.trim()));
      localStorage.setItem("m25:goals", (goals ? `${goals}\n${input.trim()}` : input.trim()));
      setChat(prev=>[...prev, {role:"user", text: input.trim()}]);
      setInput("");
    }
  }

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.currentTarget.files?.[0];
    if (!f) return;
    const body = new FormData();
    body.set("file", f);
    setLoading(true);
    try{
      const r = await fetch("/api/parse-resume", { method:"POST", body });
      const data = await r.json();
      if (data?.text) {
        setResumeText(data.text);
        localStorage.setItem("m25:resume", data.text);
        setChat(prev=>[...prev, {role:"assistant", text:`Loaded “${f.name}”. I’ll use it to tailor questions.`}]);
      } else {
        setChat(prev=>[...prev, {role:"assistant", text:"Couldn’t read that file type. Please try a PDF, DOCX, or TXT."}]);
      }
    }catch{
      setChat(prev=>[...prev, {role:"assistant", text:"Upload failed — try again."}]);
    }
    setLoading(false);
    // reset input to allow same file again if needed
    e.currentTarget.value = "";
  }

  async function start(){
    saveGoalsIfPresent();
    if (!resumeText.trim() && !goals.trim()) {
      setChat(prev=>[...prev, {role:"assistant", text:"Please upload a resume or type a short goal so I can start."}]);
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
        setChat(prev=>[...prev, {role:"assistant", text:"Thanks — drafting your weekly plan…"}]);
        await makePlan();
        return;
      }
      setChat(prev=>[...prev, {role:"assistant", text:data.question}]);
    }catch{
      setChat(prev=>[...prev, {role:"assistant", text:"(Connection issue — try again.)"}]);
    }
    setLoading(false);
    inputRef.current?.focus();
  }

  async function submit(){
    const v = input.trim();
    if (!ready) {
      // treat as goal text before starting
      if (!v) return;
      setChat(prev=>[...prev, {role:"user", text:v}]);
      setGoals(prev=> (prev ? `${prev}\n${v}` : v));
      localStorage.setItem("m25:goals", (goals ? `${goals}\n${v}` : v));
      setInput("");
      return;
    }
    if (!v) return;
    setChat(prev=>[...prev, {role:"user", text:v}]);
    const key = `q${Object.keys(state.answers).length+1}`;
    setState(prev=>({ answers: { ...prev.answers, [key]: v } }));
    setInput("");
    await askNext();
  }

  async function makePlan(){
    try{
      const r = await fetch("/api/coach", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ mode:"plan", resumeText, goals, profile: state.answers })
      });
      const data = await r.json();
      if (Array.isArray(data?.plan)) {
        localStorage.setItem("m25:plan", JSON.stringify(data.plan.map((t:string)=>({done:false,text:t}))));
      }
    }catch{}
    setTimeout(()=> router.push("/dashboard"), 400);
  }

  return (
    <main className="container" style={{ maxWidth: 920 }}>
      <h1 className="h2" style={{ marginBottom: 10 }}>Profile</h1>

      <section className="card card-lg" style={{ marginBottom: 12 }}>
        {/* Top row: one chat input + actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap:"wrap" }}>
          <input
            ref={inputRef}
            className="input"
            placeholder={ready ? "Type your answer…" : "Type your goals/intentions…"}
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter") submit(); }}
            style={{ flex: 1, minWidth: 260 }}
          />
          <label className="btn btn-outline">
            {loading ? "Uploading…" : "Upload Resume"}
            <input type="file" accept=".pdf,.docx,.txt" onChange={uploadFile} style={{ display: "none" }} />
          </label>
          {!ready ? (
            <button className="btn btn-primary" onClick={start}>Start</button>
          ) : (
            <button className="btn btn-primary" onClick={submit} disabled={loading}>Send</button>
          )}
        </div>

        {/* Chat transcript */}
        <div style={{ maxHeight: 420, overflow: "auto", padding: 4 }}>
          {chat.map((m, i)=>(
            <div key={i} style={{ display: "flex", justifyContent: m.role==="user" ? "flex-end":"flex-start", marginBottom: 8 }}>
              <div style={{
                background: m.role==="user" ? "#eff3f9" : "#f6fbf9",
                border: "1px solid #e6edf7",
                padding: "10px 12px",
                borderRadius: 12,
                maxWidth: 600
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {done && (
            <div style={{ marginTop: 8 }} className="subtle">
              Plan created — redirecting to your dashboard…
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
