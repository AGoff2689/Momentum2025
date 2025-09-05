"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { extractFromText } from "../lib/extract";

type Q = {
  id: string;
  label: string;
  type: "text"|"select"|"multiselect"|"number";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  storageKey: string;
};

const KEY_PREFIX = "m25:";
const QUESTIONS: Q[] = [
  { id:"name", label:"Your name", type:"text", placeholder:"Jane Doe", required:true, storageKey:`${KEY_PREFIX}name` },
  { id:"timezone", label:"Time zone", type:"select", options:["ET","CT","MT","PT","GMT","CET","IST","AEST"], storageKey:`${KEY_PREFIX}tz` },
  { id:"availability", label:"Weekly availability (hrs)", type:"number", placeholder:"8", storageKey:`${KEY_PREFIX}avail` },
  { id:"workAuth", label:"Work authorization", type:"select", options:["US Citizen/PR","Visa (H1B/Other)","Not applicable"], storageKey:`${KEY_PREFIX}workAuth` },
  { id:"constraints", label:"Constraints", type:"multiselect", options:["Caregiving","School","Commute","Health","Multiple jobs","None"], storageKey:`${KEY_PREFIX}constraints` },
  { id:"learning", label:"Learning style", type:"select", options:["Hands-on projects","Reading/docs","Video courses","Pairing/mentorship"], storageKey:`${KEY_PREFIX}learning` },
  { id:"targetRole", label:"Target role", type:"text", placeholder:"Product Manager", required:true, storageKey:`${KEY_PREFIX}role` },
  { id:"industry", label:"Industry focus", type:"text", placeholder:"Fintech, healthcare, etc.", storageKey:`${KEY_PREFIX}industry` },
  { id:"location", label:"Preferred location", type:"text", placeholder:"NYC, Remote", storageKey:`${KEY_PREFIX}location` },
  { id:"yearsExp", label:"Years of experience", type:"number", placeholder:"5", storageKey:`${KEY_PREFIX}yearsExp` },
  { id:"topSkills", label:"Your top 5 skills", type:"text", placeholder:"SQL, stakeholder mgmt, A/B testing...", storageKey:`${KEY_PREFIX}skills` },
];

/** Debounced localStorage hook */
function useDebouncedLocal<T>(key: string, initial: T, delay = 250){
  const [state, setState] = useState<T>(initial);
  const timer = useRef<number | null>(null);
  useEffect(() => { try{ const raw=localStorage.getItem(key); if(raw!=null) setState(JSON.parse(raw)); }catch{} }, [key]);
  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { try{ localStorage.setItem(key, JSON.stringify(state)); }catch{} }, delay);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [state, key, delay]);
  return [state, setState] as const;
}

export default function ProfilePage(){
  const [step, setStep] = useDebouncedLocal<number>(`${KEY_PREFIX}profileStep`, 0);
  const [answers, setAnswers] = useDebouncedLocal<Record<string, any>>(`${KEY_PREFIX}profile`, {});
  const [rawNumbers, setRawNumbers] = useDebouncedLocal<Record<string, string>>(`${KEY_PREFIX}profileNumbers`, {});
  const [resumeText, setResumeText] = useDebouncedLocal<string>(`${KEY_PREFIX}resumeText`, "");
  const [resumeExtract, setResumeExtract] = useDebouncedLocal<{skills:string[];education?:string;years?:number}>(`${KEY_PREFIX}resumeExtract`, { skills: [] });
  const current = useMemo(()=>QUESTIONS[step], [step]);

  const setAnswer = (id: string, v: any) => setAnswers(a => ({ ...a, [id]: v }));
  const setRawNumber = (id: string, v: string) => setRawNumbers(n => ({ ...n, [id]: v }));
  const onNext = () => { if (step < QUESTIONS.length - 1) setStep(step + 1); };
  const onBack = () => { if (step > 0) setStep(step - 1); };

  const onExtract = () => {
    const data = extractFromText(resumeText || "");
    setResumeExtract(data);
    setAnswers(a => ({
      ...a,
      yearsExp: a.yearsExp ?? data.years,
      topSkills: a.topSkills || (data.skills?.join(", ") || "")
    }));
    alert("Resume text scanned ✓ (locally)");
  };

  const Field = ({ q }: { q: Q }) => {
    if (q.type === "select") {
      const v = answers[q.id] ?? "";
      return (
        <select className="input" value={v} onChange={e=>setAnswer(q.id, e.target.value)}>
          <option value="">Select…</option>
          {q.options?.map(op => <option key={op} value={op}>{op}</option>)}
        </select>
      );
    }
    if (q.type === "multiselect") {
      const cur: string[] = Array.isArray(answers[q.id]) ? answers[q.id] : [];
      return (
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {q.options?.map(op => {
            const picked = cur.includes(op);
            return (
              <button key={op} className="btn btn-outline" type="button"
                onClick={()=> setAnswer(q.id, picked ? cur.filter(x=>x!==op) : [...cur, op])}>
                {picked ? "✓ " : ""}{op}
              </button>
            );
          })}
        </div>
      );
    }
    if (q.type === "number") {
      const raw = rawNumbers[q.id] ?? (answers[q.id]?.toString?.() ?? "");
      return (
        <input
          className="input"
          inputMode="numeric"
          placeholder={q.placeholder}
          value={raw}
          onChange={(e)=>{
            const val = e.target.value;
            setRawNumber(q.id, val); // keep as string while typing
            const parsed = val.trim()==="" ? "" : Number(val);
            setAnswer(q.id, parsed);
          }}
        />
      );
    }
    const val = answers[q.id] ?? "";
    return (
      <input
        className="input"
        placeholder={q.placeholder}
        value={val}
        onChange={e=>setAnswer(q.id, e.target.value)}
      />
    );
  };

  return (
    <main className="container" style={{ paddingTop: 16, maxWidth: 900 }}>
      <div className="card card-lg" style={{ marginBottom: 12, display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div>
          <strong>Welcome{answers.name ? `, ${answers.name}` : ""}</strong>
          <div className="subtle">We’ll ask key questions first—career details come next. Everything saves automatically.</div>
        </div>
        <a className="btn btn-outline" href="/pro">Pro Services</a>
      </div>

      <section className="card card-lg" style={{ marginBottom: 12 }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div><strong>Step {step+1} of {QUESTIONS.length}</strong></div>
          <div className="subtle">{current?.label}</div>
        </div>
        <div style={{display:"grid",gap:12}}>
          <label className="label">{current?.label}</label>
          {current && <Field q={current} />}
        </div>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <button className="btn btn-outline" type="button" onClick={onBack} disabled={step===0}>Back</button>
          <button className="btn btn-primary" type="button" onClick={onNext} disabled={step>=QUESTIONS.length-1}>Next</button>
          {step>=QUESTIONS.length-1 && <a className="btn btn-outline" href="/pro">Continue to Pro Services</a>}
        </div>
      </section>

      <section className="card card-lg">
        <strong>Optional: paste your resume text</strong>
        <div className="subtle" style={{marginTop:6}}>If you paste resume text, we’ll infer skills, education, and years locally (no upload).</div>
        <textarea className="textarea" placeholder="Paste resume text here (optional)…"
          value={resumeText} onChange={e=>setResumeText(e.target.value)} style={{marginTop:10}} />
        <div style={{display:"flex",gap:8,marginTop:10}}>
          <button className="btn btn-outline" type="button" onClick={onExtract}>Scan resume text</button>
          <a className="btn btn-primary" href="/pro">Go to Pro Services</a>
        </div>
        {(resumeExtract?.skills?.length || resumeExtract.education || typeof resumeExtract.years === "number") && (
          <div style={{marginTop:12}}>
            <div className="subtle">Detected:</div>
            <ul style={{lineHeight:1.6}}>
              {resumeExtract.education && <li><strong>Education:</strong> {resumeExtract.education}</li>}
              {typeof resumeExtract.years === "number" && <li><strong>Years of experience:</strong> {resumeExtract.years}</li>}
              {resumeExtract.skills?.length ? <li><strong>Skills:</strong> {resumeExtract.skills.join(", ")}</li> : null}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
