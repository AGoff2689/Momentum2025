"use client";
import Link from "next/link";

export default function Dashboard(){
  return (
    <main>
      <h1 className="h2" style={{marginBottom:12}}>Dashboard</h1>
      <div className="grid-2">
        <div className="card card-lg">
          <strong>Tasks This Week</strong>
          <ul style={{lineHeight:1.9,marginTop:8,paddingLeft:18}}>
            <li><input type="checkbox" /> Update resume bullets</li>
            <li><input type="checkbox" /> Apply to 5 roles</li>
            <li><input type="checkbox" /> 30 min interview practice</li>
          </ul>
        </div>

        <div className="card card-lg">
          <strong>Progress</strong>
          <div className="subtle" style={{margin:"8px 0"}}>Weekly completion</div>
          <div style={{height:12,background:"#eef2f7",borderRadius:999}}>
            <div style={{width:"45%",height:"100%",background:"var(--color-accent)",borderRadius:999}}/>
          </div>
        </div>

        <div className="card card-lg">
          <strong>Reminders</strong>
          <div className="subtle" style={{marginTop:8}}>Calendar sync (Pro)</div>
          <Link className="btn btn-outline" href="/pro#calendar">Connect calendar</Link>
        </div>

        <div className="card card-lg">
          <strong>Career Insights</strong>
          <div className="subtle" style={{marginTop:8}}>Top skills for your target role this month.</div>
          <Link className="btn btn-outline" href="/pro#insights">Open insights</Link>
        </div>
      </div>
    </main>
  );
}
