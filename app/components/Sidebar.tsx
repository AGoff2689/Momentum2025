"use client";

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a className="nav-item" href={href}>{label}</a>
);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="kicker" style={{ marginBottom: ".5rem" }}>Navigation</div>
      <div className="stack">
        <NavLink href="/dashboard" label="Dashboard" />
        <NavLink href="/roadmap" label="Career Roadmap" />
        <NavLink href="/skills" label="Skills" />
        <NavLink href="/resume" label="Resume Builder" />
        <NavLink href="/jobs" label="Job Tracker" />
        <NavLink href="/networking" label="Networking" />
        <NavLink href="/analytics" label="Analytics" />
        <NavLink href="/settings" label="Settings" />
      </div>
    </aside>
  );
}
