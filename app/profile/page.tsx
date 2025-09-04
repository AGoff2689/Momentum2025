"use client";
import { useEffect, useState } from "react";

type Profile = {
  name: string; email: string; role: string; exp: string; location: string;
  education: string; skills: string; industries: string; salary: string;
  status: string; resumeName?: string;
};
const KEY = "m25:profile";

export default function ProfilePage() {
  const [p, setP] = useState<Profile>({
    name:"", email:"", role:"", exp:"", location:"",
    education:"", skills:"", industries:"", salary:"", status:"",
    resumeName:""
  });
  const [resumeFile, setResumeFile] = useState<File|null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(KEY);
    if (saved) setP(JSON.parse(saved));
  }, []);

  const set = (k: keyof Profile) => (v: string) => setP(s => ({ ...s, [k]: v }));
  const save = () => { localStorage.setItem(KEY, JSON.stringify(p)); alert("Profile saved ✓"); };

  const onResume = (f?: File) => {
    if (!f) return;
    setResumeFile(f);
    setP(s => ({ ...s, resumeName: f.name }));
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
      if (data.url) window.location.href = data.url; else alert("Could not start trial.");
    } finally { setBusy(false); }
  };

  const input: React.CSSProperties = { width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid #e5e7eb",background:"#fff" };
  const label: React.CSSProperties = { display:"block",fontWeight:600,marginBottom:6 };

  return (
    <main className="container" style={{ paddingTop: "1rem", maxWidth: 900 }}>
      <h1 className="h2" style={{ marginBottom: "1rem" }}>Your Profile</h1>

      <section className="card card-lg">
        <div style={{ display:"grid", gap:"1rem", gridTemplateColumns:"repeat(2,minmax(0,1fr))" }}>
          {/* 1. Full Name */}
          <div><label style={label}>Full Name</label>
            <input style={input} value={p.name} onChange={e=>set("name")(e.target.value)} placeholder="Jane Doe" />
          </div>
          {/* 2. Email */}
          <div><label style={label}>Email Address</label>
            <input style={input} type="email" value={p.email} onChange={e=>set("email")(e.target.value)} placeholder="jane@example.com" />
          </div>
          {/* 3. Target Role */}
          <div><label style={label}>Target Role / Job Title</label>
            <input style={input} value={p.role} onChange={e=>set("role")(e.target.value)} placeholder="Product Manager" />
          </div>
          {/* 4. Years of Experience */}
          <div><label style={label}>Years of Professional Experience</label>
            <input style={input} value={p.exp} onChange={e=>set("exp")(e.target.value)} placeholder="5" />
          </div>
          {/* 5. Location */}
          <div><label style={label}>Location Preference</label>
            <input style={input} value={p.location} onChange={e=>set("location")(e.target.value)} placeholder="NYC · Remote · Hybrid · Onsite" />
          </div>
          {/* 6. Education */}
          <div><label style={label}>Highest Education Level</label>
            <input style={input} value={p.education} onChange={e=>set("education")(e.target.value)} placeholder="B.S. CS, MBA, etc." />
          </div>
          {/* 7. Top 5 Skills */}
          <div><label style={label}>Top 5 Skills (comma-separated)</label>
            <input style={input} value={p.skills} onChange={e=>set("skills")(e.target.value)} placeholder="SQL, Python, stakeholder mgmt, ..." />
          </div>
          {/* 8. Preferred Industries */}
          <div><label style={label}>Preferred Industries</label>
            <input style={input} value={p.industries} onChange={e=>set("industries")(e.target.value)} placeholder="Fintech, Healthcare, AI" />
          </div>
          {/* 9. Desired Salary */}
          <div><label style={label}>Desired Salary Range</label>
            <input style={input} value={p.salary} onChange={e=>set("salary")(e.target.value)} placeholder="$120k–$150k" />
          </div>
          {/* 10. Job Search Status */}
          <div>
            <label style={label}>Current Job Search Status</label>
            <select style={{...input,padding:"10px 8px"}} value={p.status} onChange={e=>set("status")(e.target.value)}>
              <option value="">Select...</option>
              <option value="Exploring">Exploring</option>
              <option value="Actively applying">Actively applying</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer stage">Offer stage</option>
            </select>
          </div>
          {/* Resume upload */}
          <div style={{ gridColumn:"1 / -1" }}>
            <label style={label}>Resume (PDF/DOC)</label>
            <input style={input} type="file" accept=".pdf,.doc,.docx" onChange={e=>onResume(e.target.files?.[0]||undefined)} />
            {p.resumeName && <div className="subtle" style={{ marginTop: 6 }}>Selected: {p.resumeName}</div>}
          </div>
        </div>

        <div style={{ display:"flex", gap:".75rem", marginTop:"1rem" }}>
          <button className="btn btn-primary" onClick={save}>Save Profile</button>
          <a className="btn btn-outline" href="/free">Go to Free Tools</a>
          <button className="btn btn-primary" onClick={startProTrial} disabled={busy}>
            {busy ? "Starting trial…" : "Choose Pro (3-day Free Trial)"}
          </button>
        </div>
      </section>
    </main>
  );
}
