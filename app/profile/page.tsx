"use client";
import { useEffect, useRef, useState } from "react";

type Q = { id:string, label:string, placeholder?:string };
const QUESTIONS: Q[] = [
  { id:"name", label:"What is your full name?" },
  { id:"role", label:"What role are you targeting?" , placeholder:"e.g., Product Manager" },
  { id:"industry", label:"Which industries interest you most?" , placeholder:"e.g., Fintech, SaaS" },
  { id:"timeframe", label:"What is your target timeframe?" , placeholder:"e.g., 8 weeks" },
  { id:"experience", label:"Years of experience?" , placeholder:"e.g., 5" },
  { id:"skills", label:"Key skills (comma-separated)?" , placeholder:"SQL, Python, stakeholder mgmt" },
  { id:"location", label:"Preferred location or remote?" , placeholder:"NYC, Remote" },
];

export default function ProfilePage(){
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [i, setI] = useState(0);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role:"user"|"assistant", text:string }[]>([]);
  const [resumeName, setResumeName] = useState<string>("");
  const box = useRef<HTMLInputElement>(null);

  // Load any existing profile
  useEffect(()=>{
    try{
      const saved = localStorage.getItem("m25:profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
      }
    }catch{}
  }, []);

  // Initialize chat
  useEffect(()=>{
    if (chat.length===0) {
      setChat([{ role:"assistant", text:"Welcome! I’ll ask a few quick questions to tailor your plan." }]);
    }
  }, [chat.length]);

  // Focus input
  useEffect(()=>{ box.current?.focus(); }, [i]);

  // Persist on change
  useEffect(()=>{ try{ localStorage.setItem("m25:profile", JSON.stringify(answers)); }catch{} }, [answers]);

  const q = QUESTIONS[i];

  function next(){
    const val = input.trim();
    if (!q || !val) return;
    setChat(prev=>[...prev, {role:"user", text: val }]);
    setAnswers(prev=>({ ...prev, [q.id]: val }));
    setInput("");
    if (i < QUESTIONS.length - 1) {
      const nextQ = QUESTIONS[i+1];
      setChat(prev=>[...prev, {role:"assistant", text: nextQ.label }]);
      setI(i+1);
    } else {
      setChat(prev=>[...prev, {role:"assistant", text:"Thanks! I’ll use this to draft a weekly plan. You can refine it with the AI any time."}]);
    }
  }

  async function generatePlan(){
    const prompt =
      `Create a weekly plan for a ${answers.role || "professional"} in ${answers.industry || "their industry"} targeting ${answers.timeframe || "4-8 weeks"}.`;
    try{
      const r = await fetch("/api/coach", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ prompt, profile: answers }) });
      const data = await r.json();
      setChat(prev=>[...prev, {role:"assistant", text: data?.reply || "Plan ready." }]);
      // store plan for dashboard/assistant
      if (Array.isArray(data?.plan)) {
        localStorage.setItem("m25:plan", JSON.stringify(data.plan.map((t:string)=>({done:false,text:t}))));
      }
      alert("Plan created! Check the AI bubble or Dashboard.");
    }catch{
      alert("Could not generate plan — try again.");
    }
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.currentTarget.files?.[0];
    if (!f) return;
    setResumeName(f.name);
    // Parsing is a stub here; a real parser can be added later.
    setChat(prev=>[...prev, {role:"assistant", text:`Uploaded “${f.name}”. I’ll scan it and incorporate skills and experience.`}]);
  }

  return (
    <main className="container" style={{ maxWidth:900 }}>
      <h1 className="h2" style={{ marginBottom: 10 }}>Profile</h1>

      <section className="card card-lg" style={{marginBottom:12}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
          <div className="badge">Personalized Onboarding</div>
          {resumeName && <div className="badge">Resume: {resumeName}</div>}
        </div>

        {/* Chat bubbles */}
        <div style={{maxHeight:380,overflow:"auto",padding:4,marginBottom:10}}>
          {chat.map((m,idx)=>(
            <div key={idx} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:8}}>
              <div style={{
                background:m.role==="user"?"#eff3f9":"#f6fbf9",
                border:"1px solid #e6edf7",
                padding:"10px 12px",borderRadius:12,maxWidth:520
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Current question */}
        {q && (
          <div style={{display:"grid",gap:8}}>
            <label className="label">{q.label}</label>
            <input
              ref={box}
              className="input"
              placeholder={q.placeholder || ""}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter") next(); }}
            />
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="btn btn-primary" onClick={next}>Next</button>
              <label className="btn btn-outline">
                Upload Resume
                <input type="file" accept=".pdf,.doc,.docx" onChange={onUpload} style={{display:"none"}} />
              </label>
              <a className="btn btn-outline" href="/dashboard">Skip to Dashboard</a>
            </div>
          </div>
        )}

        {/* If done, offer plan generation */}
        {!q && (
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <button className="btn btn-primary" onClick={generatePlan}>Generate Plan</button>
            <a className="btn btn-outline" href="/dashboard">Go to Dashboard</a>
          </div>
        )}
      </section>
    </main>
  );
}
