export default function Home() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #0f172a;
          background: #ffffff;
          -webkit-font-smoothing: antialiased;
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          height: 68px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(15,23,42,0.06);
        }
        .nav-logo {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0f172a;
          text-decoration: none;
        }
        .nav-logo span { color: #2563eb; }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }
        .nav-links a {
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #0f172a; }
        .nav-cta {
          padding: 8px 20px;
          background: #0f172a;
          color: #fff !important;
          border-radius: 8px;
          font-weight: 600 !important;
          font-size: 0.875rem;
          transition: background 0.2s !important;
        }
        .nav-cta:hover { background: #1e293b !important; color: #fff !important; }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 5% 80px;
          background: linear-gradient(160deg, #f8faff 0%, #ffffff 50%, #f0f4ff 100%);
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -200px; left: 50%;
          transform: translateX(-50%);
          width: 900px; height: 900px;
          background: radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.18);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #2563eb;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .hero-badge-dot {
          width: 6px; height: 6px;
          background: #2563eb;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .hero h1 {
          font-size: clamp(2.6rem, 5.5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #0f172a;
          max-width: 780px;
          margin-bottom: 24px;
        }
        .hero h1 em {
          font-style: normal;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #64748b;
          max-width: 560px;
          line-height: 1.7;
          margin-bottom: 44px;
          font-weight: 400;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 64px;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          background: #2563eb;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(37,99,235,0.3);
        }
        .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.38);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          background: transparent;
          color: #0f172a;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          border: 1.5px solid #cbd5e1;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          border-color: #94a3b8;
          background: #f8fafc;
          transform: translateY(-1px);
        }
        .hero-stats {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .stat { text-align: center; }
        .stat-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.04em;
        }
        .stat-label {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stat-divider {
          width: 1px;
          background: #e2e8f0;
          align-self: stretch;
        }

        /* LOGOS STRIP */
        .logos-strip {
          padding: 48px 5%;
          text-align: center;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
          background: #fafbff;
        }
        .logos-strip p {
          font-size: 0.78rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 28px;
        }
        .logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        .logo-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          letter-spacing: -0.01em;
        }
        .logo-icon {
          width: 20px; height: 20px;
          border-radius: 4px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          color: #fff;
          font-weight: 800;
        }

        /* FEATURES */
        .features {
          padding: 100px 5%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-align: center;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          text-align: center;
          color: #0f172a;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          line-height: 1.15;
        }
        .section-sub {
          text-align: center;
          color: #64748b;
          font-size: 1.05rem;
          max-width: 520px;
          margin: 0 auto 64px;
          line-height: 1.7;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .feature-card {
          padding: 36px 32px;
          background: #fff;
          border: 1px solid #e8edf5;
          border-radius: 16px;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(15,23,42,0.08);
          border-color: #c7d7f5;
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.08));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 20px;
        }
        .feature-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }
        .feature-card p {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.7;
        }

        /* HOW IT WORKS */
        .how-it-works {
          padding: 100px 5%;
          background: #f8faff;
        }
        .hiw-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .hiw-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 64px;
          position: relative;
        }
        .hiw-steps::before {
          content: '';
          position: absolute;
          top: 28px;
          left: calc(16.66% + 16px);
          right: calc(16.66% + 16px);
          height: 1px;
          background: linear-gradient(90deg, #2563eb33, #7c3aed33);
        }
        .hiw-step {
          text-align: center;
          padding: 0 16px;
          position: relative;
        }
        .hiw-num {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #2563eb;
          margin: 0 auto 20px;
          position: relative;
          z-index: 1;
        }
        .hiw-step h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .hiw-step p {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.7;
        }

        /* CTA SECTION */
        .cta-section {
          padding: 100px 5%;
          text-align: center;
        }
        .cta-inner {
          max-width: 700px;
          margin: 0 auto;
          padding: 72px 48px;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .cta-inner::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-inner h2 {
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          line-height: 1.2;
          position: relative;
        }
        .cta-inner p {
          color: rgba(255,255,255,0.6);
          font-size: 1rem;
          margin-bottom: 40px;
          line-height: 1.7;
          position: relative;
        }
        .cta-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }
        .btn-white {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          background: #fff;
          color: #0f172a;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-white:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          background: transparent;
          color: rgba(255,255,255,0.85);
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.2);
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.06);
        }

        /* FOOTER */
        footer {
          padding: 40px 5%;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        footer .foot-logo {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.03em;
        }
        footer .foot-logo span { color: #2563eb; }
        footer p {
          font-size: 0.82rem;
          color: #94a3b8;
        }
        footer nav {
          display: flex;
          gap: 24px;
        }
        footer nav a {
          font-size: 0.82rem;
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s;
        }
        footer nav a:hover { color: #0f172a; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .features-grid,
          .hiw-steps { grid-template-columns: 1fr; }
          .hiw-steps::before { display: none; }
          .nav-links { display: none; }
          .hero-stats { gap: 32px; }
          .stat-divider { display: none; }
        }
        @media (max-width: 600px) {
          .hero h1 { font-size: 2.2rem; }
          .cta-inner { padding: 48px 28px; }
          footer { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">Zyli<span>thium</span></a>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#" className="nav-cta">Get Started</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Institutional-Grade Web3 Risk Intelligence
        </div>
        <h1>
          Identify Risk.<br />
          <em>Protect Capital.</em><br />
          Move with Confidence.
        </h1>
        <p className="hero-sub">
          Zylithium delivers deep smart contract auditing, on-chain threat detection, and institutional-grade risk scoring — built for founders and traders who can't afford to guess.
        </p>
        <div className="hero-actions">
          <a href="#" className="btn-primary">
            Start Free Audit
            <span>→</span>
          </a>
          <a href="#features" className="btn-secondary">
            Explore Platform
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">98.4%</div>
            <div className="stat-label">Audit Accuracy</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-num">12k+</div>
            <div className="stat-label">Contracts Analyzed</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-num">$2.1B+</div>
            <div className="stat-label">Capital Protected</div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="logos-strip">
        <p>Trusted by teams building on</p>
        <div className="logos-row">
          {[
            { icon: 'E', name: 'Ethereum' },
            { icon: 'S', name: 'Solana' },
            { icon: 'A', name: 'Arbitrum' },
            { icon: 'P', name: 'Polygon' },
            { icon: 'B', name: 'BNB Chain' },
          ].map((l) => (
            <div className="logo-pill" key={l.name}>
              <div className="logo-icon">{l.icon}</div>
              {l.name}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-label">Platform Features</div>
        <h2 className="section-title">Risk intelligence at every layer</h2>
        <p className="section-sub">
          From pre-deployment audits to real-time on-chain monitoring — Zylithium covers the full threat surface.
        </p>
        <div className="features-grid">
          {[
            {
              icon: '🔍',
              title: 'AI-Powered Smart Contract Auditing',
              desc: 'Submit any Solidity or Rust contract and receive a structured vulnerability report with severity ratings, attack vectors, and remediation guidance — in seconds.',
            },
            {
              icon: '📊',
              title: 'Institutional Risk Scoring',
              desc: 'Every protocol is assigned a composite risk score across code quality, liquidity depth, team credibility, and on-chain behavior patterns.',
            },
            {
              icon: '⚡',
              title: 'Real-Time Threat Monitoring',
              desc: 'Get alerted the moment anomalous activity is detected in any tracked contract — flash loan attacks, rug mechanics, or unusual fund flows.',
            },
            {
              icon: '🛡️',
              title: 'Rug Pull & Backdoor Detection',
              desc: 'Proprietary detection models identify hidden owner privileges, mint bypasses, and liquidity withdrawal traps before they trigger.',
            },
            {
              icon: '📄',
              title: 'Professional PDF Reports',
              desc: 'Export audit findings as boardroom-ready PDF reports, complete with executive summaries, CVSS scores, and compliance checklists.',
            },
            {
              icon: '🔗',
              title: 'API & Wallet Integration',
              desc: 'Integrate Zylithium directly into your existing dev or trading stack via REST API, or connect your wallet for instant portfolio-level risk views.',
            },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="how-it-works">
        <div className="hiw-inner">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Audit in three steps</h2>
          <p className="section-sub">No setup. No lengthy onboarding. Paste your contract address or code and get a full risk assessment in under 60 seconds.</p>
          <div className="hiw-steps">
            {[
              {
                num: '01',
                title: 'Submit Your Contract',
                desc: 'Paste a contract address, upload a .sol file, or connect your GitHub repo. We support all major EVM and non-EVM chains.',
              },
              {
                num: '02',
                title: 'AI Analyzes Every Layer',
                desc: 'Our multi-model engine scans for 100+ vulnerability classes, logic flaws, economic exploits, and access control issues simultaneously.',
              },
              {
                num: '03',
                title: 'Receive Actionable Intelligence',
                desc: 'Get a scored report with prioritized findings, code-level explanations, and one-click PDF export for your team or investors.',
              },
            ].map((s) => (
              <div className="hiw-step" key={s.num}>
                <div className="hiw-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Don't deploy blind.<br />Start your first audit free.</h2>
          <p>Join hundreds of founders and traders who use Zylithium to protect capital before going on-chain.</p>
          <div className="cta-buttons">
            <a href="#" className="btn-white">Start Free Audit →</a>
            <a href="#" className="btn-ghost">Book a Demo</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-logo">Zyli<span>thium</span></div>
        <p>© 2025 Zylithium. Institutional Web3 Risk Intelligence.</p>
        <nav>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Docs</a>
          <a href="#">Contact</a>
        </nav>
      </footer>
    </>
  );
}
