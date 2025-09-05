// app/page.tsx
export default function Welcome(){
  return (
    <main className="main">
      <div className="container">
        <section className="card card-lg" style={{textAlign:"center",padding:"36px 24px"}}>
          <h1 className="h1" style={{marginBottom:10}}>Momentum2025 — Your AI Career Copilot</h1>
          <p className="subtle" style={{maxWidth:760,margin:"0 auto 16px"}}>
            Plans, resume bullets, interview prep, networking, and job search orchestration — all in one place.
          </p>
          <div style={{display:"grid",gap:14,gridTemplateColumns:"repeat(3,minmax(0,1fr))",margin:"18px 0"}}>
            <div className="card" style={{padding:14}}><strong>AI Coach</strong><p className="subtle">Chat-first guidance & weekly plans.</p></div>
            <div className="card" style={{padding:14}}><strong>Resume Builder</strong><p className="subtle">Impact bullets with metrics.</p></div>
            <div className="card" style={{padding:14}}><strong>Interview Prep</strong><p className="subtle">Mock Qs with STAR tips.</p></div>
          </div>
          <div className="card" style={{padding:0,overflow:"hidden"}}>
            <img src="https://via.placeholder.com/1200x520?text=App+Screenshots" alt="App screenshots" style={{width:"100%",display:"block"}} />
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:16}}>
            <a className="btn btn-primary" href="/profile">Let’s get started</a>
            <a className="btn btn-outline" href="/coach">Try the Coach</a>
          </div>
        </section>
      </div>
    </main>
  );
}
