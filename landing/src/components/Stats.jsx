export default function Stats({ t }) {
  return (
    <section className="stats section" id="stats">
      <div className="container">
        <div className="stats__grid">
          {t.stats.map((s, idx) => (
            <div className="stat-card" key={idx}>
              <div className="stat-card__number">{s.number}</div>
              <div className="stat-card__label">{s.label}</div>
              <div className="stat-card__sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
