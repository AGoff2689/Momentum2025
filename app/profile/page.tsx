"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type QA = { [id: string]: string };

export default function ProfileAI(){
  const router = useRouter();
  const [resume, setResume] = useState("");
  const [goals, setGoals]   = useState("");
  const [chat, setChat]     = useState<{role:"assistant"|"user", text:string}[]>([]);
  const [answer, setAnswer] = useState("");
  const [state, setState]   = useState<QA>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingQ, setLoadingQ] = useState(false);
  const [ready, setReady] = useState(false); // true once resume+goals provided
  const [done, setDone] = useState(false);   // when AI stops asking questions

  useEffect(()=>{
    const savedResume = localStorage.getItem("m25:resume") || "";
    const savedGoals  = localStorage.getItem("m25:goals")  || "";
    const savedProf   = localStorage.getItem("m25:profile");
    if (savedProf) setState(JSON.parse(savedProf));
    setResume(savedResume); setGoals(savedGoals);
    setChat([{role:"assistant", text:"Upload or paste your resume text, describe your goals, then I’ll ask tailored questions."}]);
  }, []);
  useEffect(()=>{ localStorage.setItem("m25:resume", resume); }, [resume]);
  useEffect(()=>{ localStorage.setItem("m25:goals", goals); }, [goals]);
  useEffect(()=>{ localStorage.setItem("m25:profile", JSON.stringify(state)); }, [state]);
  useEffect(()=>{ if(ready) inputRef.current?.focus(); }, [ready, chat.length]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.currentTarget.files?.[0];
    if (!f) return;
    // MVP: parse .txt directly; for PDF/DOCX ask user to paste text (best accuracy)
    if (f.type === "text/plain") {
      const r = new FileReader();
      r.onload = () => setResume(String(r.result||""));
      r.readAsText(f);
      setChat(prev=>[...prev,{role:"assistant", text:`Loaded “${f.name}”.`}]);
    } else {
      setChat(prev=>[...prev,{role:"assistant", text:`For best results, paste your resume text (PDF/DOCX parsing will be added next).`}]);
    }
  }

  async function startQ(){
    if (!resume.trim() && !goals.trim()) {
      alert("Please paste resume text and/or describe your goals first.");
      return;
    }
    setReady(true);
    await askNext(); // kick off first question
  }

  async function askNext(){
    setLoadingQ(true);
    try{
      const r = await fetch("/api/coach", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ mode:"ask_next_question", resumeText: resume, goals, state: { asked:Object.keys(state), answers: state } })
      });
      const data = await r.json();
      if (data?.done || !data?.question) {
        setDone(true);
        setChat(prev=>[...prev,{role:"assistant", text:"Thanks — drafting your weekly plan now."}]);
        await generatePlan();
        return;
      }
      setChat(prev=>[...prev,{role:"assistant", text:data.question}]);
    }catch{
      setChat(prev=>[...prev,{role:"assistant", text:"(Connection issue — try again.)"}]);
    }
    setLoadingQ(false);
  }

  async function submitAnswer(){
    const v = answer.trim();
    if (!v) return;
    setChat(prev=>[...prev,{role:"user", text:v}]);
    // Store answer with a synthetic key (qN)
    const key = `q${Object.keys(state).length+1}`;
    setState(prev=>({ ...prev, [key]: v }));
    setAnswer("");
    await askNext();
  }

  async function generatePlan(){
    try{
      const r = await fetch("/api/coach", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ mode:"plan", resumeText: resume, goals, profile: state })
      });
      const data = await r.json();
      if (Array.isArray(data?.plan)) {
        localStorage.setItem("m25:plan", JSON.stringify(data.plan.map((t:string)=>({done:false,text:t}))));
      }
    }catch {}
    // move to dashboard
    setTimeout(()=> router.push("/dashboard"), 400);
  }

  return (
    <main className="container" style={{ maxWidth:900 }}>
      <h1 className="h2" style={{ marginBottom: 10 }}>Profile (AI)</h1>

      <section className="card card-lg" style={{marginBottom:12}}>
        {/* Resume + Goals */}
        {!ready && (
          <div style={{display:"grid", gap:12}}>
            <div>
              <label className="label">Paste Your Resume (best)</label>
              <textarea className="textarea" placeholder="Paste resume text here…" value={resume} onChange={e=>setResume(e.target.value)} />
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <label className="btn btn-outline">
                  Upload .txt
                  <input type="file" accept=".txt" onChange={onFile} style={{display:"none"}} />
                </label>
              </div>
            </div>
            <div>
              <label className="label">Describe Your Goals / Intentions</label>
              <textarea className="textarea" placeholder="e.g., Transition to PM in fintech within 3 months; focus on SQL/storytelling" value={goals} onChange={e=>setGoals(e.target.value)} />
            </div>
            <div>
              <button className="btn btn-primary" onClick={startQ}>Start AI Questions</button>
              <a className="btn btn-outline" href="/dashboard" style={{marginLeft:8}}>Skip to Dashboard</a>
            </div>
          </div>
        )}

        {/* Chat */}
        {ready && (
          <>
            <div style={{maxHeight:380,overflow:"auto",padding:4,marginBottom:10}}>
              {chat.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:8}}>
                  <div style={{
                    background:m.role==="user"?"#eff3f9":"#f6fbf9",
                    border:"1px solid #e6edf7", padding:"10px 12px", borderRadius:12, maxWidth:520
                  }}>{m.text}</div>
                </div>
              ))}
            </div>

            {!done && (
              <div style={{display:"flex",gap:8}}>
                <input ref={inputRef} className="input" placeholder="Type your answer…" value={answer}
                  onChange={e=>setAnswer(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter") submitAnswer(); }}/>
                <button className="btn btn-primary" onClick={submitAnswer} disabled={loadingQ}>Send</button>
              </div>
            )}

            {done && (
              <div style={{marginTop:10}}>
                <a className="btn btn-primary" href="/dashboard">View Plan</a>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
