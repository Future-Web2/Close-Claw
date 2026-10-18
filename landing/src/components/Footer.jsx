export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="./image.png" alt="CloseCLAW" className="footer__logo-img" />
            <span className="footer__logo-text">
              Close<span className="text-gradient">CLAW</span>
            </span>
          </div>
          <p className="footer__tagline">{t.footer.about}</p>
        </div>

        <div className="footer__links-col">
          <h4 className="footer__col-title">{t.footer.linksTitle}</h4>
          <a
            href="https://github.com/Future-Web2/Close-Claw"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            {t.footer.repo} ↗
          </a>
          <a
            href="./docs/guide.html"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            {t.footer.slides} ↗
          </a>
          <a href="#simulator" className="footer__link">
            {t.nav.simulator}
          </a>
          <a href="#env-builder" className="footer__link">
            {t.nav.envBuilder}
          </a>
          <a href="#commands" className="footer__link">
            {t.nav.commands}
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          {t.footer.copyright} • {t.footer.builtBy}
        </p>
      </div>
    </footer>
  )
}
