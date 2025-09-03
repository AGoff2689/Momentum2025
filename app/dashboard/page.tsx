import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <main className="container" style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:"1.25rem", paddingTop:"1rem" }}>
      <Sidebar />
      <section style={{ display:"grid", gap:"1.25rem" }}>
        <div style={{ display:"grid", gap:"1rem", gridTemplateColumns:"repeat(3,minmax(0,1fr))" }}>
          <div className="card"><div className="subtle">Resume Score</div><div className="h2">86</div></div>
          <div className="card"><div className="subtle">Applications</div><div className="h2">12</div></div>
          <div className="card"><div className="subtle">Interview Rate</div><div className="h2">25%</div></div>
        </div>
        <div className="card card-lg">
          <div className="h2" style={{ marginBottom:".5rem" }}>Learning Recommendations</div>
          <div style={{ display:"grid", gap:".75rem", gridTemplateColumns:"repeat(2,minmax(0,1fr))" }}>
            <div className="card"><strong>SQL for Analysts</strong><div className="subtle">LinkedIn Learning · 3h</div><span className="badge">Recommended</span></div>
            <div className="card"><strong>Product Sense Interview Prep</strong><div className="subtle">Coursera · 6h</div></div>
          </div>
        </div>
      </section>
    </main>
  );
}
