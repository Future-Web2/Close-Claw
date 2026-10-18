export default function Features({ t, bgRef }) {
  return (
    <section className="features section" id="features">
      {/* Background image with parallax */}
      <div className="features__bg" ref={bgRef}>
        <img src="./images/features-bg.png" alt="" className="features__bg-img" />
        <div className="features__bg-overlay" />
      </div>

      <div className="container">
        <div className="section__header">
          <span className="section__label">{t.features.label}</span>
          <h2 className="section__title">{t.features.title}</h2>
          <p className="section__subtitle">{t.features.subtitle}</p>
        </div>

        <div className="features__grid">
          {t.features.items.map((item, i) => (
            <div
              key={item.title}
              className={`feature-card feature-card--${item.color}`}
              id={`feature-${i}`}
            >
              <div className="feature-card__top">
                <div className={`feature-card__icon feature-card__icon--${item.color}`}>
                  {item.icon}
                </div>
                <span className={`feature-card__tag feature-card__tag--${item.color}`}>
                  {item.tag}
                </span>
              </div>
              <h3 className="feature-card__title">{item.title}</h3>
              <p className="feature-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
