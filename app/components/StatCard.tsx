export default function StatCard(
  { title, value, hint }: { title: string; value: string; hint?: string }
) {
  return (
    <div className="card">
      <div className="subtle" style={{ marginBottom: ".4rem" }}>{title}</div>
      <div className="h2" style={{ marginBottom: ".25rem" }}>{value}</div>
      {hint ? <div className="subtle">{hint}</div> : null}
    </div>
  );
}
