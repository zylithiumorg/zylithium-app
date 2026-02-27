"use client";
import { useEffect, useRef } from "react";

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight * 1.1);

    const PARTICLE_COUNT = Math.min(Math.floor((W * H) / 9000), 130);
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
      opacity: Math.random() * 0.55 + 0.15,
    }));

    const CONNECT_DIST = 130;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight * 1.1;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #020510;
          --bg2: #060d1f;
          --cyan: #38bdf8;
          --cyan2: #0ea5e9;
          --violet: #818cf8;
          --violet2: #6366f1;
          --text: #e2e8f0;
          --muted: #64748b;
          --border: rgba(56,189,248,0.12);
          --glass: rgba(8,18,40,0.7);
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg);
          color: var(--text);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.25); border-radius: 3px; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 6%;
          background: rgba(2,5,16,0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-size: 1.25rem; font-weight: 800; letter-spacing: -0.04em;
          color: #fff; text-decoration: none;
          display: flex; align-items: center; gap: 9px;
        }
        .nav-logo-icon {
          width: 30px; height: 30px; border-radius: 7px;
          background: linear-gradient(135deg, var(--cyan2), var(--violet2));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 900; color: #fff;
        }
        .nav-logo span { color: var(--cyan); }
        .nav-links { display: flex; align-items: center; gap: 2.2rem; list-style: none; }
        .nav-links a {
          font-size: 0.875rem; font-weight: 500; color: #94a3b8;
          text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: #e2e8f0; }
        .nav-btn {
          padding: 9px 22px !important;
          background: linear-gradient(135deg, var(--cyan2), var(--violet2)) !important;
          color: #fff !important; border-radius: 8px;
          font-weight: 600 !important;
          box-shadow: 0 0 20px rgba(56,189,248,0.2);
          transition: box-shadow 0.2s, transform 0.2s !important;
        }
        .nav-btn:hover {
          box-shadow: 0 0 30px rgba(56,189,248,0.4) !important;
          transform: translateY(-1px);
          color: #fff !important;
        }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 130px 6% 100px;
          overflow: hidden;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 70%, rgba(99,102,241,0.08) 0%, transparent 55%),
            var(--bg);
        }
        .orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; z-index: 0; filter: blur(80px);
        }
        .orb-1 {
          width: 500px; height: 500px; top: -120px; left: -100px;
          background: radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%);
          animation: orb-float 14s ease-in-out infinite;
        }
        .orb-2 {
          width: 400px; height: 400px; bottom: -80px; right: -80px;
          background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%);
          animation: orb-float 18s ease-in-out infinite reverse;
        }
        .orb-3 {
          width: 300px; height: 300px; top: 40%; left: 65%;
          background: radial-gradient(circle, rgba(56,189,248,0.07), transparent 70%);
          animation: orb-float 22s ease-in-out infinite;
        }
        @keyframes orb-float {
          0%,100% { transform: translate(0,0); }
          33% { transform: translate(30px,-20px); }
          66% { transform: translate(-20px,15px); }
        }

        .hero-content { position: relative; z-index: 1; max-width: 900px; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.22);
          border-radius: 999px;
          font-size: 0.75rem; font-weight: 600;
          color: var(--cyan); letter-spacing: 0.06em; text-transform: uppercase;
          margin-bottom: 32px;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--cyan); box-shadow: 0 0 8px var(--cyan);
          animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .hero h1 {
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 900; line-height: 1.06;
          letter-spacing: -0.045em; color: #fff; margin-bottom: 28px;
        }
        .hero h1 .accent {
          background: linear-gradient(135deg, var(--cyan) 0%, var(--violet) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #94a3b8; max-width: 600px; margin: 0 auto 48px;
          line-height: 1.8; font-weight: 400;
        }
        .hero-actions {
          display: flex; gap: 16px; flex-wrap: wrap;
          justify-content: center; margin-bottom: 72px;
        }
        .btn-glow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 34px;
          background: linear-gradient(135deg, var(--cyan2) 0%, var(--violet2) 100%);
          color: #fff; font-size: 0.975rem; font-weight: 700;
          border-radius: 10px; text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 0 30px rgba(14,165,233,0.3), 0 4px 20px rgba(0,0,0,0.4);
          transition: all 0.25s; position: relative; overflow: hidden;
        }
        .btn-glow::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          opacity: 0; transition: opacity 0.25s;
        }
        .btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 50px rgba(14,165,233,0.45), 0 8px 30px rgba(0,0,0,0.5);
        }
        .btn-glow:hover::before { opacity: 1; }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: transparent;
          color: #cbd5e1; font-size: 0.975rem; font-weight: 600;
          border-radius: 10px; text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.12);
          cursor: pointer; transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: rgba(56,189,248,0.4); color: var(--cyan);
          background: rgba(56,189,248,0.05); transform: translateY(-2px);
        }

        .hero-stats {
          display: flex; gap: 0; flex-wrap: wrap; justify-content: center;
          background: var(--glass); border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden;
          backdrop-filter: blur(12px);
        }
        .stat-item {
          padding: 24px 40px; text-align: center;
          border-right: 1px solid var(--border);
          flex: 1; min-width: 150px;
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-size: 1.9rem; font-weight: 900; letter-spacing: -0.04em;
          background: linear-gradient(135deg, #fff, var(--cyan));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label { font-size: 0.75rem; color: var(--muted); font-weight: 500; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }

        /* TICKER */
        .ticker-section { padding: 0 0 80px; overflow: hidden; }
        .ticker-label { font-size: 0.7rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.12em; text-align: center; margin-bottom: 20px; }
        .ticker-wrap { display: flex; overflow: hidden; }
        .ticker-track { display: flex; gap: 14px; animation: ticker 30s linear infinite; width: max-content; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px;
          background: rgba(8,18,40,0.7);
          border: 1px solid var(--border); border-radius: 999px;
          white-space: nowrap; font-size: 0.8rem; color: #94a3b8; font-weight: 500;
        }
        .ticker-dot { width: 6px; height: 6px; border-radius: 50%; }
        .dot-red { background: #f87171; box-shadow: 0 0 6px #f87171; }
        .dot-yellow { background: #fbbf24; box-shadow: 0 0 6px #fbbf24; }
        .dot-green { background: #34d399; box-shadow: 0 0 6px #34d399; }

        /* SECTION COMMON */
        .section { padding: 110px 6%; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .sec-tag {
          display: inline-block; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--cyan);
          background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.18);
          padding: 5px 12px; border-radius: 999px; margin-bottom: 20px;
        }
        .sec-title {
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 900; color: #fff; letter-spacing: -0.04em;
          line-height: 1.12; margin-bottom: 18px;
        }
        .sec-title .accent {
          background: linear-gradient(135deg, var(--cyan), var(--violet));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sec-sub { font-size: 1.05rem; color: #64748b; line-height: 1.75; max-width: 520px; margin-bottom: 64px; }
        .centered { text-align: center; }
        .centered .sec-sub { margin-left: auto; margin-right: auto; }

        /* FEATURES */
        .features-bg {
          background:
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%),
            var(--bg2);
        }
        .features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .feat-card {
          padding: 36px 32px;
          background: rgba(8,18,40,0.6);
          border: 1px solid rgba(56,189,248,0.1);
          border-radius: 18px; transition: all 0.3s;
          position: relative; overflow: hidden;
          backdrop-filter: blur(8px);
        }
        .feat-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(56,189,248,0.04), transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .feat-card:hover {
          border-color: rgba(56,189,248,0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(56,189,248,0.06);
        }
        .feat-card:hover::after { opacity: 1; }
        .feat-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          background: linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.12));
          border: 1px solid rgba(56,189,248,0.18);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin-bottom: 22px; position: relative; z-index: 1;
        }
        .feat-card h3 { font-size: 1.02rem; font-weight: 700; color: #e2e8f0; letter-spacing: -0.02em; margin-bottom: 10px; position: relative; z-index: 1; }
        .feat-card p { font-size: 0.875rem; color: #64748b; line-height: 1.75; position: relative; z-index: 1; }
        .feat-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.8rem; font-weight: 600; color: var(--cyan);
          text-decoration: none; margin-top: 18px;
          opacity: 0; transform: translateY(6px);
          transition: all 0.25s; position: relative; z-index: 1;
        }
        .feat-card:hover .feat-link { opacity: 1; transform: translateY(0); }

        /* HOW IT WORKS */
        .hiw-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 28px;
          position: relative; margin-top: 64px;
        }
        .hiw-connector {
          position: absolute; top: 36px;
          left: calc(16.66% + 28px); right: calc(16.66% + 28px);
          height: 1px;
          background: linear-gradient(90deg, var(--cyan2), var(--violet2));
          opacity: 0.3;
        }
        .hiw-step { text-align: center; padding: 0 8px; position: relative; z-index: 1; }
        .hiw-num-wrap {
          width: 72px; height: 72px; border-radius: 50%;
          background: var(--glass); border: 1px solid rgba(56,189,248,0.25);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px; backdrop-filter: blur(8px); position: relative;
        }
        .hiw-num-wrap::before {
          content: ''; position: absolute; inset: -3px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(56,189,248,0.3), rgba(99,102,241,0.2));
          z-index: -1; opacity: 0; transition: opacity 0.3s;
        }
        .hiw-step:hover .hiw-num-wrap::before { opacity: 1; }
        .hiw-num {
          font-size: 1.3rem; font-weight: 900;
          background: linear-gradient(135deg, var(--cyan), var(--violet));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hiw-step h3 { font-size: 1rem; font-weight: 700; color: #e2e8f0; margin-bottom: 10px; letter-spacing: -0.02em; }
        .hiw-step p { font-size: 0.875rem; color: var(--muted); line-height: 1.75; }

        /* CTA */
        .cta-section { padding: 80px 6% 110px; }
        .cta-card {
          max-width: 900px; margin: 0 auto;
          padding: 80px 64px;
          background: linear-gradient(135deg, rgba(8,18,40,0.95), rgba(15,8,40,0.95));
          border: 1px solid rgba(56,189,248,0.15); border-radius: 24px;
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-card::before {
          content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-card::after {
          content: ''; position: absolute; bottom: -80px; right: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-card h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900; color: #fff; letter-spacing: -0.04em;
          line-height: 1.12; margin-bottom: 18px; position: relative; z-index: 1;
        }
        .cta-card p { font-size: 1.05rem; color: #64748b; margin-bottom: 44px; line-height: 1.75; position: relative; z-index: 1; }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border); padding: 40px 6%;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px; background: var(--bg);
        }
        .foot-logo { font-size: 1rem; font-weight: 800; color: #fff; letter-spacing: -0.03em; }
        .foot-logo span { color: var(--cyan); }
        footer p { font-size: 0.8rem; color: var(--muted); }
        footer nav { display: flex; gap: 24px; }
        footer nav a { font-size: 0.8rem; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        footer nav a:hover { color: var(--cyan); }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .features-grid, .hiw-grid { grid-template-columns: 1fr 1fr; }
          .hiw-connector { display: none; }
        }
        @media (max-width: 640px) {
          .features-grid, .hiw-grid { grid-template-columns: 1fr; }
          .nav-links { display: none; }
          .hero-stats { flex-direction: column; }
          .stat-item { border-right: none; border-bottom: 1px solid var(--border); }
          .stat-item:last-child { border-bottom: none; }
          .cta-card { padding: 48px 28px; }
          footer { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <div className="nav-logo-icon">Z</div>
          Zyli<span>thium</span>
        </a>
        <ul className="nav-links">
          <li><a href="#features">Platform</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Docs</a></li>
          <li><a href="#" className="nav-btn">Start Free Audit</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <ParticleCanvas />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Institutional Web3 Risk Intelligence
          </div>
          <h1>
            The Smartest Way to<br />
            <span className="accent">Audit, Detect & Protect</span><br />
            On-Chain Assets
          </h1>
          <p className="hero-sub">
            Zylithium delivers institutional-grade smart contract auditing, real-time threat detection, and deep risk scoring — purpose-built for founders, traders, and security teams who operate at scale.
          </p>
          <div className="hero-actions">
            <a href="#" className="btn-glow">Start Free Audit →</a>
            <a href="#features" className="btn-outline">Explore Platform</a>
          </div>
          <div className="hero-stats">
            {[
              { num: "98.4%", label: "Audit Accuracy" },
              { num: "12k+", label: "Contracts Audited" },
              { num: "$2.1B+", label: "Capital Protected" },
              { num: "<60s", label: "Avg. Report Time" },
            ].map((s) => (
              <div className="stat-item" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE THREAT TICKER */}
      <div className="ticker-section">
        <p className="ticker-label">Live Threat Intelligence Feed</p>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[
              { dot: "dot-red",    text: "Reentrancy exploit detected · Protocol XYZ" },
              { dot: "dot-yellow", text: "Unusual mint activity · Token ABC" },
              { dot: "dot-green",  text: "Audit passed · Vault Protocol v2.1" },
              { dot: "dot-red",    text: "Flash loan attack pattern · DEX Omega" },
              { dot: "dot-yellow", text: "High centralization risk · Bridge Delta" },
              { dot: "dot-green",  text: "Risk score: 94/100 · StableYield Finance" },
              { dot: "dot-red",    text: "Backdoor function detected · NFT Launchpad" },
              { dot: "dot-yellow", text: "Liquidity withdrawal trap · Yield Aggregator" },
              { dot: "dot-green",  text: "Clean audit · Lending Protocol Sigma" },
              { dot: "dot-red",    text: "Reentrancy exploit detected · Protocol XYZ" },
              { dot: "dot-yellow", text: "Unusual mint activity · Token ABC" },
              { dot: "dot-green",  text: "Audit passed · Vault Protocol v2.1" },
              { dot: "dot-red",    text: "Flash loan attack pattern · DEX Omega" },
              { dot: "dot-yellow", text: "High centralization risk · Bridge Delta" },
              { dot: "dot-green",  text: "Risk score: 94/100 · StableYield Finance" },
              { dot: "dot-red",    text: "Backdoor function detected · NFT Launchpad" },
              { dot: "dot-yellow", text: "Liquidity withdrawal trap · Yield Aggregator" },
              { dot: "dot-green",  text: "Clean audit · Lending Protocol Sigma" },
            ].map((t, i) => (
              <div className="ticker-pill" key={i}>
                <span className={`ticker-dot ${t.dot}`} />
                {t.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section features-bg" id="features">
        <div className="section-inner">
          <div className="centered">
            <div className="sec-tag">Platform Capabilities</div>
            <h2 className="sec-title">Risk intelligence at <span className="accent">every layer</span></h2>
            <p className="sec-sub">From pre-deployment audits to real-time on-chain monitoring — Zylithium covers the full threat surface of Web3.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: "🔍", title: "AI Smart Contract Auditing", desc: "Submit any Solidity or Rust contract and receive a structured vulnerability report with severity ratings, attack vectors, and remediation steps — in under 60 seconds." },
              { icon: "📊", title: "Institutional Risk Scoring", desc: "Every protocol is assigned a composite risk score across code quality, liquidity depth, team credibility, and on-chain behavior patterns." },
              { icon: "⚡", title: "Real-Time Threat Monitoring", desc: "Get alerted the moment anomalous activity is detected — flash loan attacks, rug mechanics, or unusual fund movements in any tracked contract." },
              { icon: "🛡️", title: "Backdoor & Rug Detection", desc: "Proprietary detection models identify hidden owner privileges, mint bypasses, and liquidity withdrawal traps before they trigger." },
              { icon: "📄", title: "Boardroom-Ready PDF Reports", desc: "Export audit findings as professional PDF reports complete with executive summaries, CVSS scores, and compliance checklists." },
              { icon: "🔗", title: "API & Multi-Chain Integration", desc: "Plug Zylithium into your dev or trading stack via REST API. Supports Ethereum, Solana, Arbitrum, Polygon, BNB Chain, and more." },
            ].map((f) => (
              <div className="feat-card" key={f.title}>
                <div className="feat-icon-wrap">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <a href="#" className="feat-link">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="centered">
            <div className="sec-tag">How It Works</div>
            <h2 className="sec-title">Audit in <span className="accent">three steps</span></h2>
            <p className="sec-sub">No lengthy onboarding. Paste your contract and receive a full institutional-grade risk assessment in under 60 seconds.</p>
          </div>
          <div className="hiw-grid">
            <div className="hiw-connector" />
            {[
              { num: "01", title: "Submit Your Contract", desc: "Paste a contract address, upload a .sol file, or connect your GitHub repo. All major EVM and non-EVM chains supported." },
              { num: "02", title: "AI Analyzes Every Layer", desc: "Our multi-model engine scans 100+ vulnerability classes — logic flaws, access control issues, and economic exploits — simultaneously." },
              { num: "03", title: "Receive Actionable Intelligence", desc: "Get a scored report with prioritized findings, code-level explanations, and one-click PDF export for your team or investors." },
            ].map((s) => (
              <div className="hiw-step" key={s.num}>
                <div className="hiw-num-wrap">
                  <span className="hiw-num">{s.num}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Don&apos;t deploy blind.<br />Audit before you ship.</h2>
          <p>Join hundreds of founders and traders who trust Zylithium to protect capital before going on-chain. First audit is free.</p>
          <div className="cta-btns">
            <a href="#" className="btn-glow">Start Free Audit →</a>
            <a href="#" className="btn-outline">Book a Demo</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-logo">Zyli<span>thium</span></div>
        <p>© 2025 Zylithium · Institutional Web3 Risk Intelligence</p>
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
