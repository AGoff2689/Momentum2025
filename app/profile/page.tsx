"use client";
import { useEffect, useState } from "react";

type Profile = {
  name: string;
  email: string;
  role: string;
  exp: string;
  location: string;
  education: string;
  skills: string;
  industries: string;
  salary: string;
  status: string;
  resumeName?: string;
};

const KEY = "m25:profile";

export default function ProfilePage() {
  const [p, setP] = useState<Profile>({
    name: "", email: "", role: "", exp: "", location: "",
    education: "", skills: "", industries: "", salary: "", status: "",
    resumeName: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(KEY);
    if (saved) setP(JSON.parse(saved));
  }, []);

  const save = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(p));
    alert("Profile saved ✓");
  };

  const onResume = (f?: File) => {
    if (!f) return;
    setResumeFile(f);
    setP(s => ({ ...s, resumeName: f.name }));
  };

  const set = (field: keyof Profile) => (v: string) =>
    setP(s => ({ ...s, [field]: v }));

  // 👉 New: start Pro trial via Netlify function
  const startProTrial = async () => {
    try {
      setBusy(true);
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "subscription", trialDays: 3 })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Could not start trial. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", borderRadius: 10,
    border: "1px solid #e5e7eb", background: "#fff"
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontWeight: 600, marginBottom: 6
  };

  return (
    <main className="container" style={{ paddingTop: "1rem", maxWidth: 900 }}>
      <h1 className="h2" style={{ marginBottom: "1rem" }}>Your Profile</h1>

      <section className="card card-lg">
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
          {/* (all your profile questions stay the same) */}
          {/* … */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Resume (PDF/DOC)</label>
            <input
              style={inputStyle}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => onResume(e.target.files?.[0] || undefined)}
            />
            {p.resumeName && <div className="subtle" style={{ marginTop: 6 }}>Selected: {p.resumeName}</div>}
          </div>
        </div>

        <div style={{ display: "flex", gap: ".75rem", marginTop: "1rem" }}>
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

