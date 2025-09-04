import { FileCheck2, Briefcase, TrendingUp } from "lucide-react";

const Stat = ({icon, label, value}:{icon:React.ReactNode; label:string; value:string}) => (
  <div className="card" style={{display:"grid",gap:".4rem",padding:"1.1rem"}}>
    <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>{icon}<span className="subtle">{label}</span></div>
    <div className="h2">{value}</div>
  </div>
);

export default function DashboardPage() {
  return (
    <main className="container" style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:"1.25rem",paddingTop:"1rem"}}>
      <aside className="sidebar">
        <div className="subtle" style={{marginBottom:".5rem",fontWeight:700}}>Navigation</div>
        <div style={{display:"grid",gap:".4rem"}}>
          <a className="nav-item" href="/dashboard">Overview</a>
          <a className="nav-item" href="/free">Free Tools</a>
          <a className="nav-item" href="/pricing">Upgrade</a>
        </div>
      </aside>

      <section style={{display:"grid",gap:"1.25rem"}}>
        {/* Stats */}
        <div style={{display:"grid",gap:"1rem",gridTemplateColumns:"repeat(3,minmax(0,1fr))"}}>
          <Stat icon={<FileCheck2 size={18}/>} label="Resume Score" value="86" />
          <Stat icon={<Briefcase size={18}/>} label="Applications" value="12" />
          <Stat icon={<TrendingUp size={18}/>} label="Interview Rate" value="25%" />
        </div>

        {/* Two-column content */}
        <div style={{display:"grid",gap:"1rem",gridTemplateColumns:"1fr 1fr"}}>
          <div className="card card-lg">
            <div className="h2" style={{marginBottom:".6rem"}}>Learning Recommendations</div>
            <div style={{display:"grid",gap:".75rem"}}>
              <div className="card"><strong>SQL for Analysts</strong><div className="subtle">LinkedIn Learning · 3h</div><span className="badge">Recommended</span></div>
              <div className="card"><strong>Product Sense Interview Prep</strong><div className="subtle">Coursera · 6h</div></div>
            </div>
          </div>

          <div className="card card-lg">
            <div className="h2" style={{marginBottom:".6rem"}}>Job Applications</div>
            <table className="table">
              <thead><tr><th>Role</th><th>Company</th><th>Stage</th><th>Updated</th></tr></thead>
              <tbody>
                <tr><td>Product Manager</td><td>Acme</td><td><span className="badge">Applied</span></td><td className="subtle">today</td></tr>
                <tr><td>Data Analyst</td><td>Northwind</td><td><span className="badge">Interview</span></td><td className="subtle">yesterday</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
