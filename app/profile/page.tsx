"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setName(localStorage.getItem("m25:name") || "");
    setRole(localStorage.getItem("m25:role") || "");
    setExp(localStorage.getItem("m25:exp") || "");
    setSkills(localStorage.getItem("m25:skills") || "");
    setLocation(localStorage.getItem("m25:location") || "");
  }, []);

  const save = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem("m25:name", name);
    localStorage.setItem("m25:role", role);
    localStorage.setItem("m25:exp", exp);
    localStorage.setItem("m25:skills", skills);
    localStorage.setItem("m25:location", location);
    alert("Profile saved ✓");
  };

  return (
    <main className="container" style={{ paddingTop: "1rem" }}>
      <h1 className="h2" style={{ marginBottom: "1rem" }}>Your Profile</h1>

      <section className="card card-lg" style={{ maxWidth: 720 }}>
        <div style={{ display:"grid", gap:"1rem", gridTemplateColumns:"repeat(2,minmax(0,1fr))" }}>
          <div>
            <label className="label">Full Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Doe" />
          </div>
          <div>
            <label className="label">Target Role</label>
            <input className="input" value={role} onChange={e=>setRole(e.target.value)} placeholder="Product Manager" />
          </div>
          <div>
            <label className="label">Years of Experience</label>
            <input className="input" value={exp} onChange={e=>setExp(e.target.value)} placeholder="5" />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" value={location} onChange={e=>setLocation(e.target.value)} placeholder="NYC, Remote" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="label">Key Skills (comma-separated)</label>
            <input className="input" value={skills} onChange={e=>setSkills(e.target.value)} placeholder="SQL, Python, stakeholder management" />
          </div>
        </div>

        <div style={{ display: "flex", gap: ".75rem", marginTop: "1rem" }}>
          <button className="btn btn-primary" onClick={save}>Save Profile</button>
          <a className="btn btn-outline" href="/free">Go to Free Tools</a>
        </div>
      </section>
    </main>
  );
}
