export default function StatCard({ title, value, icon: Icon }) {
  return (
    <section className="card stat" aria-label={title}>
      <Icon size={20} aria-hidden="true" /><p className="muted">{title}</p><strong>{value}</strong>
    </section>
  );
}
