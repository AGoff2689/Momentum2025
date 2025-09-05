"use client";
import ProGate from "../components/ProGate";

export default function ProServices(){
  return (
    <main className="container" style={{paddingTop:12}}>
      <h1 className="h2" style={{marginBottom:12}}>Pro Services</h1>

      <div className="grid-2">
        <ProGate title="ATS Resume Scan">
          <div className="card card-lg">
            <strong>ATS Resume Scan</strong>
            <p className="subtle">Upload your resume to get ATS score and improvement tips.</p>
            <button className="btn btn-outline">Upload resume</button>
          </div>
        </ProGate>

        <ProGate title="Skills Gap & Targeting">
          <div className="card card-lg">
            <strong>Skills Gap & Role Targeting</strong>
            <p className="subtle">Identify gaps vs. target roles; get a weekly plan.</p>
            <button className="btn btn-outline">Analyze profile</button>
          </div>
        </ProGate>

        <ProGate title="Outreach Scripts">
          <div className="card card-lg">
            <strong>Personalized Outreach Scripts</strong>
            <p className="subtle">Recruiter & hiring manager messages, tailored to your profile.</p>
            <button className="btn btn-outline">Generate scripts</button>
          </div>
        </ProGate>

        <ProGate title="Portfolio & Case Prompts">
          <div className="card card-lg">
            <strong>Portfolio & Case Prompts</strong>
            <p className="subtle">Role-specific prompts and practice cases to showcase skills.</p>
            <button className="btn btn-outline">Get prompts</button>
          </div>
        </ProGate>
      </div>
    </main>
  );
}
