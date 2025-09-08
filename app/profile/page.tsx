"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type QA = { id: string; label: string; placeholder?: string };
const QS: QA[] = [
  { id:"name", label:"What is your full name?" },
  { id:"role", label:"What role are you targeting?", placeholder:"e.g., Product Manager" },
  { id:"industry", label:"Which industries interest you?", placeholder:"e.g., Fintech, SaaS" },
  { id:"timeframe", label:"Your target timeframe?", placeholder:"e.g., 8 weeks" },
  { id:"experience", label:"Years of experience?", placeholder:"e.g., 5" },
  { id:"skills", label:"Key skills (comma-separated)?", placeholder:"SQL, Python, stakeholder mgmt" },
  { id:"location", label:"Preferred location or remote?", placeholder:"NYC, Remote" },
];

export default function ProfilePage(){
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [step, setStep] = useState(0);
  const [val, setVal] = useState("");
  const [chat, setChat] = useState<{role:"assistant"|"user", text:string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("m25:profile");
    if (saved) setAnswers(JSON.parse(saved));
    setChat([{role:"assistant", text:"Welcome! I’ll ask a few quick questions to tailor your plan."}]);
  }, []);

  useEffect(()=>{ inputRef.current?.focus(); }, [step]);
  useEffect(()=>{ localStorage.setItem("m25:profile", JSON.stringify(answers)); }, [answers]);

  const q = QS[step];

  async function next(){
    const v = val.trim();
    if (!q || !v) return;
    setChat(prev=>[...prev, {role:"user", text:v}]);
    setAnswers(prev=>({ ...prev, [q.id]: v }));
    setVal("");

    if (step < QS.length - 1) {
      setStep(step+1);
      setChat(prev=>[...prev, {role:"assistant", text: QS[step+1].label }]);
      return;
    }

    // Finished: generate plan then route
    setChat(prev=>[...prev, {role:"assistant", text:"Great — generating your weekly plan…"}]);

    try{
      const r = await fetch("/api/coach", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ prompt: "Create a weekly plan tailored to the above profile.", profile: { ...answers, [q.id]: v } })
      });
      const data = await r.json();
      const plan = Array.isArray(data?.plan) ? data.plan : [];
      localStorage.setItem("m25:plan", JSON.stringify(plan.map((t:string)=>({done:false,text:t}))));
      router.push("/dashboard");
    }catch{
      router.push("/dashboard");
    }
  }

  function upload(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.currentTarget.files?.[0];
    if (!f) return;
    setChat(prev=>[...prev, {role:"assistant", text:`Uploaded “${f.name}”. I’ll learn from it next.`}]);
  }

  return (
    <main className="container" style={{ maxWidth:900 }}>
      <h1 className="h2" style={{ marginBottom: 10 }}>Profile</h1>
      <section className="card card-lg" style={{marginBottom:12}}>
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

        {q && (
          <div style={{display:"grid",gap:8}}>
            <label className="label">{q.label}</label>
            <input
              ref={inputRef}
              className="input"
              placeholder={q.placeholder || ""}
              value={val}
              onChange={e=>setVal(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter") next(); }}
            />
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="btn btn-primary" onClick={next}>Next</button>
              <label className="btn btn-outline">
                Upload Resume
                <input type="file" accept=".pdf,.doc,.docx" onChange={upload} style={{display:"none"}} />
              </label>
              <a className="btn btn-outline" href="/dashboard">Skip to Dashboard</a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
