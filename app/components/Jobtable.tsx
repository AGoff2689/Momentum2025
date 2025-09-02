type Row = { role: string; company: string; stage: string; updated: string };

export default function JobTable({ rows }: { rows: Row[] }) {
  return (
    <div className="card">
      <div className="h2" style={{ marginBottom: ".75rem" }}>Job Applications</div>
      <table className="table">
        <thead>
          <tr>
            <th>Role</th><th>Company</th><th>Stage</th><th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.role}</td>
              <td>{r.company}</td>
              <td><span className="badge">{r.stage}</span></td>
              <td className="subtle">{r.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
