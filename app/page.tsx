export default function Welcome(){
  return (
    <main className="main">
      <div className="container">
        <section className="card card-lg" style={{textAlign:"center",padding:"36px 24px"}}>
          <h1 className="h1">Advance your career with AI-powered coaching.</h1>
          <p className="subtle" style={{maxWidth:720,margin:"6px auto 18px"}}>
            Personalized onboarding, clear goals, weekly plans, and reminders — in one professional app.
          </p>
          <div className="card" style={{padding:0,overflow:"hidden",margin:"18px 0"}}>
            <img src="https://via.placeholder.com/1200x520?text=Momentum2025+Screens" alt="App screenshots" style={{width:"100%",display:"block"}}/>
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:16}}>
            <a className="btn btn-primary" href="/profile">Let’s Get Started</a>
            <a className="btn btn-outline" href="/dashboard">View Dashboard</a>
          </div>
        </section>

        <section className="grid-2" style={{marginTop:16}}>
          {[
            {t:"Find",d:"Industry insights, in-demand skills, benchmarks."},
            {t:"Learn",d:"Curated resources tailored to your profile."},
            {t:"Goals",d:"Define clear career outcomes and milestones."},
            {t:"Plan",d:"Weekly action plans with AI assistance."},
            {t:"Reminders",d:"Stay on track with alerts and nudges."},
            {t:"Pro Services",d:"ATS scan, skills gap, outreach scripts."},
          ].map((x)=>(
            <div key={x.t} className="card">
              <strong>{x.t}</strong>
              <div className="subtle" style={{marginTop:6}}>{x.d}</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
