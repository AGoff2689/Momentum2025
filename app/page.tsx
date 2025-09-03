export default function Home() {
  return (
    <main className="main">
      <div className="container" style={{ width:"100%" }}>
        <section className="card-hero" style={{ textAlign:"center" }}>
          <div className="h1" style={{ marginBottom:".5rem" }}>Advance your career with AI-powered tools</div>
          <p className="subtle" style={{ margin:"0 auto 1rem", maxWidth:680 }}>
            Build your roadmap, perfect your resume, track applications, and get guidance from the AI Career Coach.
          </p>
          <div style={{ display:"flex", gap:".75rem", justifyContent:"center" }}>
            <a className="btn btn-primary" href="/free">Start Free</a>
            <a className="btn btn-outline" href="/pricing">See Pro Features</a>
          </div>
        </section>
      </div>
    </main>
  );
}
