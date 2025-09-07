"use client";
import Link from "next/link";

export default function ProServices(){
  return (
    <main>
      <h1 className="h2" style={{marginBottom:12}}>Pro Services</h1>
      <div className="grid-2">
        <div id="resume" className="card card-lg">
          <strong>ATS Resume Scan</strong>
          <div className="subtle" style={{marginTop:6}}>Upload your resume to get ATS score & tips.</div>
          <Link className="btn btn-outline" href="/profile">Upload resume</Link>
        </div>

        <div id="gap" className="card card-lg">
          <strong>Skills Gap Analysis</strong>
          <div className="subtle" style={{marginTop:6}}>Identify gaps vs. target roles; get weekly plan.</div>
          <Link className="btn btn-outline" href="/dashboard">Analyze profile</Link>
        </div>

        <div id="outreach" className="card card-lg">
          <strong>Outreach Script Generator</strong>
          <div className="subtle" style={{marginTop:6}}>Tailored messages for recruiters & managers.</div>
          <Link className="btn btn-outline" href="/dashboard">Generate scripts</Link>
        </div>

        <div id="calendar" className="card card-lg">
          <strong>Reminders & Calendar</strong>
          <div className="subtle" style={{marginTop:6}}>Sync your plan with calendar (Pro).</div>
          <Link className="btn btn-outline" href="/dashboard">Open reminders</Link>
        </div>
      </div>
    </main>
  );
}
