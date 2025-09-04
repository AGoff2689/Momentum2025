"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./chat.module.css";

type Profile = {
  name?: string; email?: string; role?: string; exp?: string; location?: string;
  education?: string; skills?: string; industries?: string; salary?: string; status?: string;
  workType?: string; resumeName?: string;
};
type Q = { key: keyof Profile; prompt: string; placeholder?: string };

const STORAGE_KEY = "m25:profile";

const QUESTIONS: Q[] = [
  { key: "name",       prompt: "What’s your full name?",            placeholder: "Jane Doe" },
  { key: "email",      prompt: "What’s your email address?",        placeholder: "jane@example.com" },
  { key: "role",       prompt: "What’s your target role/title?",    placeholder: "Product Manager" },
  { key: "exp",        prompt: "How many years of experience?",     placeholder: "5" },
  { key: "location",   prompt: "Where do you prefer to work?",      placeholder: "NYC · Remote · Hybrid · Onsite" },
  { key: "workType",   prompt: "Preferred work type?",              placeholder: "Remote / Hybrid / Onsite" },
  { key: "education",  prompt: "Highest education?",                placeholder: "BS CS, MBA, etc." },
  { key: "skills",     prompt: "Top 5 skills (comma-separated)?",   placeholder: "SQL, Python, stakeholder mgmt" },
  { key: "industries", prompt: "Preferred industries?",             placeholder: "Fintech, Healthcare, AI" },
  { key: "salary",     prompt: "Desired salary range?",             placeholder: "$120k–$150k" },
  { key: "status",     prompt: "Current job search status?",        placeholder: "Exploring / Applying / Interviewing" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({});
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [resumeName, setResumeName] = useState<string | undefined>(undefined);
  const done = idx >= QUESTIONS.length;

  // Load saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const p = JSON.parse(saved) as Profile;
        setProfile(p);
        const next = QUESTIONS.findIndex(q => !p[q.key]);
        setIdx(next === -1 ? QUESTIONS.length : next);
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); } catch {}
  }, [profile]);

  const signedAs = useMemo(() => {
    if (profile.name && profile.email) return `${profile.name} • ${profile.email}`;
    if (profile.email) return profile.email;
    if (profile.name) return profile.name;
    return null;
  }, [profile]);

  const ask = QUESTIONS[idx];
  const questionText = ask ? ask.prompt : "All set! Review below and continue.";

  const submitAnswer = () => {
    if (!ask) return;
    const value = input.trim();
    if (!value) return;
    setProfile(p => ({ ...p, [ask.key]: value }));
    setInput("");
    setIdx(i => i + 1);
  };

  const onResume = (file?: File) => {
    if (!file) return;
    setResumeName(file.name);
    setProfile(p => ({ ...p, resumeName: file.name }));
  };

  const startProTrial = async () => {
    try {
      setBusy(true);
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "subscription", trialDays: 3 })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Could not start trial. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="container" style={{ paddingTop: 16, maxWidth: 900 }}>
      <div className="card" style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <strong>Profile</strong>
          <div className="subtle">
            {signedAs ? <>Signed in as {signedAs}</> : <>Not signed in · answers saved on this device</>}
          </div>
        </div>
        <a className="btn btn-outline" href="/free">Free Tools</a>
      </div>

      {!done ? (
        <section className="card card-lg" style={{ display: "grid", gap: 12 }}>
          <div className={styles.chatContainer}>
            <div className={`${styles.chatBubble} ${styles.coach}`}>
              {questionText}
              {ask?.placeholder && (
                <div className="subtle" style={{ marginTop: 6 }}>
                  e.g., {ask.placeholder}
                </div>
              )}
            </div>

            {input && (
              <div className={`${styles.chatBubble} ${styles.user}`}>
                {input}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="input"
              style={{ flex: 1, padding: "10px 12px", borderRadius: 10 }}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={ask?.placeholder || ""}
              onKeyDown={e => { if (e.key === "Enter") submitAnswer(); }}
            />
            <button className="btn btn-primary" onClick={submitAnswer}>Send</button>
            <button className="btn btn-outline" onClick={() => setIdx(i => i + 1)}>Skip</button>
          </div>

          <div style={{ marginTop: 8 }}>
            <label className="label">Upload resume (PDF/DOC/DOCX)</label>
            <input
              className="input"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => onResume(e.target.files?.[0] || undefined)}
            />
            {resumeName && <div className="subtle" style={{ marginTop: 6 }}>Selected: {resumeName}</div>}
          </div>
        </section>
      ) : (
        <section className="card card-lg" style={{ display: "grid", gap: 16 }}>
          <div className="h2">Review & continue</div>
          <div className="card" style={{ display: "grid", gap: 8 }}>
            <Row k="Name" v={profile.name} />
            <Row k="Email" v={profile.email} />
            <Row k="Target role" v={profile.role} />
            <Row k="Experience (yrs)" v={profile.exp} />
            <Row k="Location" v={profile.location} />
            <Row k="Work type" v={profile.workType} />
            <Row k="Education" v={profile.education} />
            <Row k="Skills" v={profile.skills} />
            <Row k="Industries" v={profile.industries} />
            <Row k="Salary" v={profile.salary} />
            <Row k="Status" v={profile.status} />
            <Row k="Resume" v={profile.resumeName} />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              className="btn btn-outline"
              onClick={() => {
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); alert("Profile saved ✓"); } catch {}
              }}
            >
              Save
            </button>
            <a className="btn btn-outline" href="/free">Continue Free</a>
            <button className="btn btn-primary" onClick={startProTrial} disabled={busy}>
              {busy ? "Starting trial…" : "Start 3-day Pro Trial"}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
      <span className="subtle">{k}</span>
      <span>{v || <em className="subtle">—</em>}</span>
    </div>
  );
}
