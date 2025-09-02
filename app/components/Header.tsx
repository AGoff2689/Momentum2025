"use client";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: "var(--color-primary)"
          }} />
          <strong>Momentum2025</strong>
        </div>

        <nav style={{ display: "flex", gap: "1rem" }}>
          <a className="nav-item" href="/dashboard">Dashboard</a>
          <a className="nav-item" href="/roadmap">Roadmap</a>
          <a className="nav-item" href="/resume">Resume</a>
          <a className="nav-item" href="/jobs">Jobs</a>
          <a className="nav-item" href="/analytics">Analytics</a>
        </nav>
      </div>
    </header>
  );
}
