export default function ProServices(){
  const stub = (m:string)=>()=>alert(m+" (stub)");
  return (
    <main>
      <h1 className="h2" style={{marginBottom:12}}>Pro Services</h1>
      <div className="grid-2">
        <div className="card card-lg">
          <strong>ATS Resume Scan</strong>
          <div className="subtle" style={{marginTop:6}}>Upload your resume to get ATS score & tips.</div>
          <button className="btn btn-outline" onClick={stub("Open file picker")}>Upload resume</button>
        </div>
        <div className="card card-lg">
          <strong>Skills Gap Analysis</strong>
          <div className="subtle" style={{marginTop:6}}>Identify gaps vs. target roles; get weekly plan.</div>
          <button className="btn btn-outline" onClick={stub("Analyze profile")}>Analyze profile</button>
        </div>
        <div className="card card-lg">
          <strong>Outreach Script Generator</strong>
          <div className="subtle" style={{marginTop:6}}>Tailored messages for recruiters & managers.</div>
          <button className="btn btn-outline" onClick={stub("Generate scripts")}>Generate scripts</button>
        </div>
        <div className="card card-lg">
          <strong>Portfolio & Case Prompts</strong>
          <div className="subtle" style={{marginTop:6}}>Role-specific prompts and practice cases.</div>
          <button className="btn btn-outline" onClick={stub("Get prompts")}>Get prompts</button>
        </div>
      </div>
    </main>
  );
}
