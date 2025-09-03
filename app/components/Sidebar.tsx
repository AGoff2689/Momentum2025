"use client";
const Item = ({ href, label, icon }:{ href:string; label:string; icon:string }) => (
  <a className="nav-item" href={href}><span>{icon}</span><span>{label}</span></a>
);
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="subtle" style={{ marginBottom:".5rem", fontWeight:700 }}>Navigation</div>
      <div style={{ display:"grid", gap:".4rem" }}>
        <Item href="/dashboard" label="Overview" icon="📊" />
        <Item href="/free" label="Free Tools" icon="🧰" />
        <Item href="/resume" label="Resume" icon="📄" />
        <Item href="/jobs" label="Job Tracker" icon="🗂️" />
        <Item href="/analytics" label="Analytics" icon="📈" />
        <Item href="/settings" label="Settings" icon="⚙️" />
      </div>
    </aside>
  );
}
