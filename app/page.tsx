import StartTrial from "./components/StartTrial";
export default function Welcome(){
  return (
    <main className="main">
      <div className="container">
        <section className="hero">
          <h1 className="h1">Advance your career with AI-powered coaching.</h1>
          <p className="subtle" style={{maxWidth:760,margin:"6px 0 16px"}}>
            Personalized onboarding, clear goals, weekly plans, and reminders — in one professional app.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <a className="btn btn-primary" href="/profile">Let’s Get Started</a>
            <a className="btn btn-outline" href="/dashboard">View Dashboard</a>
          </div>
        </section>

        <section className="features">
          {[
            {t:"Find",d:"Industry insights, in-demand skills, salary benchmarks."},
            {t:"Learn",d:"Curated resources tailored to your profile and goals."},
            {t:"Goals",d:"Define outcomes with milestones and timeframes."},
            {t:"Plan",d:"AI-generated weekly action plans to stay on track."},
            {t:"Reminders",d:"Alerts and nudges to complete high-leverage tasks."},
            {t:"Pro Services",d:"ATS scan, skills gap analysis, outreach scripts."},
          ].map((x)=>(
            <div key={x.t} className="card">
              <div className="feature">
                <div className="dot" />
                <div>
                  <strong>{x.t}</strong>
                  <div className="subtle" style={{marginTop:6}}>{x.d}</div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
