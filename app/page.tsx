export default function Welcome(){
  return (
    <main className="main">
      <div className="container">
        <section className="card card-lg" style={{textAlign:"center",padding:"36px 24px"}}>
          <h1 className="h1" style={{marginBottom:10}}>Momentum2025 — Your AI Career Copilot</h1>
          <p className="subtle" style={{maxWidth:760,margin:"0 auto 16px"}}>
            Plans, resume bullets, interview prep, networking, and job search orchestration — all in one place.
          </p>
          <div className="card" style={{padding:0,overflow:"hidden", margin:"18px 0"}}>
            <img src="https://via.placeholder.com/1200x520?text=App+Screenshots" alt="App screenshots" style={{width:"100%",display:"block"}} />
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:16}}>
            <a className="btn btn-primary" href="/profile">Let’s get started</a>
            <a className="btn btn-outline" href="/pro">View Pro Services</a>
          </div>
        </section>
      </div>
    </main>
  );
}
