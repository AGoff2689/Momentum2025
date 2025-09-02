export default function FreeTools() {
  return (
    <main className="container" style={{ paddingTop:"1rem" }}>
      <h1 className="h2" style={{ marginBottom:"1rem" }}>Free Career Tools</h1>

      <section className="grid-2">
        <div className="card">
          <h2 className="h2" style={{ marginBottom:".5rem" }}>Weekly Plan Generator</h2>
          <p className="subtle" style={{ marginBottom:".75rem" }}>Get a 1-week action plan for job search.</p>
          <textarea className="textarea" placeholder="Your goal (e.g., 'land a PM interview')"></textarea>
          <button className="btn btn-primary" style={{ marginTop:".75rem" }}>Generate Plan</button>
        </div>

        <div className="card">
          <h2 className="h2" style={{ marginBottom:".5rem" }}>Resume Bullet Helper</h2>
          <p className="subtle" style={{ marginBottom:".75rem" }}>Turn tasks into impact bullets.</p>
          <textarea className="textarea" placeholder="Describe a task you did…"></textarea>
          <button className="btn btn-outline" style={{ marginTop:".75rem" }}>Suggest Bullet</button>
        </div>
      </section>

      <section className="card" style={{ marginTop:"1rem" }}>
        <h2 className="h2" style={{ marginBottom:".5rem" }}>Basic Job Tracker</h2>
        <table className="table">
          <thead><tr><th>Role</th><th>Company</th><th>Stage</th><th>Updated</th></tr></thead>
          <tbody>
            <tr><td>Product Manager</td><td>Acme</td><td><span className="badge">Applied</span></td><td className="subtle">today</td></tr>
            <tr><td>Data Analyst</td><td>Northwind</td><td><span className="badge">Interview</span></td><td className="subtle">yesterday</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
