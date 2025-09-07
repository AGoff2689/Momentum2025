"use client";
import { useEffect, useState } from "react";

type F = { name:string; role:string; exp:string; skills:string; location:string };

export default function ProfilePage(){
  const [form, setForm] = useState<F>({ name:"", role:"", exp:"", skills:"", location:"" });

  // Load once on mount (won't steal focus)
  useEffect(() => {
    try {
      setForm({
        name: localStorage.getItem("m25:name") || "",
        role: localStorage.getItem("m25:role") || "",
        exp: localStorage.getItem("m25:exp") || "",
        skills: localStorage.getItem("m25:skills") || "",
        location: localStorage.getItem("m25:location") || "",
      });
    } catch {}
  }, []);

  const onChange = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const save = () => {
    try {
      localStorage.setItem("m25:name", form.name);
      localStorage.setItem("m25:role", form.role);
      localStorage.setItem("m25:exp", form.exp);
      localStorage.setItem("m25:skills", form.skills);
      localStorage.setItem("m25:location", form.location);
      alert("Profile saved ✓");
    } catch {}
  };

  return (
    <main className="container" style={{ paddingTop: 16, maxWidth: 900 }}>
      <h1 className="h2" style={{ marginBottom: 12 }}>Your Profile</h1>

      <section className="card card-lg">
        <div style={{ display:"grid", gap:"1rem", gridTemplateColumns:"repeat(2,minmax(0,1fr))" }}>
          <div>
            <label className="label">Full Name</label>
            <input className="input" value={form.name} onChange={onChange("name")} placeholder="Jane Doe" />
          </div>
          <div>
            <label className="label">Target Role</label>
            <input className="input" value={form.role} onChange={onChange("role")} placeholder="Product Manager" />
          </div>
          <div>
            <label className="label">Years of Experience</label>
            <input className="input" value={form.exp} onChange={onChange("exp")} placeholder="5" />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" value={form.location} onChange={onChange("location")} placeholder="NYC, Remote" />
          </div>
          <div style={{ gridColumn:"1 / -1" }}>
            <label className="label">Key Skills (comma-separated)</label>
            <input className="input" value={form.skills} onChange={onChange("skills")} placeholder="SQL, Python, stakeholder management" />
          </div>
        </div>

        <div style={{ display:"flex", gap:12, marginTop:14 }}>
          <button className="btn btn-primary" onClick={save}>Save Profile</button>
          <a className="btn btn-outline" href="/dashboard">Go to Dashboard</a>
        </div>
      </section>
    </main>
  );
}
