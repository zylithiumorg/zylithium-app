"use client";
import { useEffect, useRef, useState } from "react";

/* ── 3D SVG LOGO MARK ─────────────────────────────────────────────────── */
function ZylithiumMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* top face gradient */}
        <linearGradient id="topFace" x1="12" y1="8" x2="36" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        {/* left face gradient */}
        <linearGradient id="leftFace" x1="8" y1="22" x2="24" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        {/* right face gradient */}
        <linearGradient id="rightFace" x1="24" y1="22" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
        {/* inner Z top face */}
        <linearGradient id="zTop" x1="15" y1="14" x2="33" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        {/* glow filter */}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* outer glow halo */}
      <ellipse cx="24" cy="38" rx="16" ry="4" fill="rgba(56,189,248,0.18)" filter="url(#outerGlow)" />

      {/* ── CUBE ── */}
      {/* top face */}
      <polygon points="24,6 40,15 24,24 8,15" fill="url(#topFace)" filter="url(#glow)" />
      {/* left face */}
      <polygon points="8,15 24,24 24,42 8,33" fill="url(#leftFace)" />
      {/* right face */}
      <polygon points="24,24 40,15 40,33 24,42" fill="url(#rightFace)" />

      {/* edge highlights */}
      <line x1="24" y1="6" x2="40" y2="15" stroke="rgba(255,255,255,0.45)" strokeWidth="0.6" />
      <line x1="24" y1="6" x2="8" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
      <line x1="8" y1="15" x2="24" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <line x1="24" y1="24" x2="40" y2="15" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <line x1="24" y1="24" x2="24" y2="42" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

      {/* ── Z LETTERFORM on top face ── */}
      {/* top bar of Z */}
      <polygon points="17,11.5 31,11.5 31,13.5 17,13.5" fill="url(#zTop)" opacity="0.92"
        transform="skewX(-30) translate(10,-2) scale(0.62,0.62) translate(-10,2)" />
      {/* diagonal */}
      <polygon points="17,13.5 31,11.5 29,13 17,15.5" fill="url(#zTop)" opacity="0.85"
        transform="skewX(-30) translate(10,-2) scale(0.62,0.62) translate(-10,2)" />
      {/* bottom bar */}
      <polygon points="17,15 31,13 31,15 17,17" fill="url(#zTop)" opacity="0.92"
        transform="skewX(-30) translate(10,-2) scale(0.62,0.62) translate(-10,2)" />
    </svg>
  );
}

/* ── WORDMARK ─────────────────────────────────────────────────────────── */
function Logo({ size = 36 }) {
  return (
    <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <div style={{ filter: "drop-shadow(0 0 8px rgba(56,189,248,0.55)) drop-shadow(0 0 20px rgba(99,102,241,0.3))" }}>
        <ZylithiumMark size={size} />
      </div>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: size * 0.47,
        fontWeight: 800,
        letterSpacing: "-0.04em",
        color: "#fff",
        lineHeight: 1,
      }}>
        Zyli<span style={{
          background: "linear-gradient(135deg,#38bdf8,#818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>thium</span>
      </span>
    </a>
  );
}

/* ── PARTICLE CANVAS ─────────────────────────────────────────────────── */
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
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4, opacity: Math.random() * 0.55 + 0.15,
    }));
    const CONNECT_DIST = 130;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${p.opacity})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / CONNECT_DIST) * 0.18})`;
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight * 1.1; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ── MAIN PAGE ───────────────────────────────────────────────────────── */
export default function Home() {
  const [billing, setBilling] = useState("monthly");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#020510;--bg2:#060d1f;
          --cyan:#38bdf8;--cyan2:#0ea5e9;
          --violet:#818cf8;--violet2:#6366f1;
          --text:#e2e8f0;--muted:#64748b;
          --border:rgba(56,189,248,0.12);
          --glass:rgba(8,18,40,0.7);
        }
        html{scroll-behavior:smooth}
        body{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:rgba(56,189,248,0.25);border-radius:3px}

        /* ── NAV ── */
        .nav{
          position:fixed;top:0;left:0;right:0;z-index:200;height:70px;
          display:flex;align-items:center;justify-content:space-between;padding:0 6%;
          background:rgba(2,5,16,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid var(--border);
        }
        .nav-links{display:flex;align-items:center;gap:2.2rem;list-style:none}
        .nav-links a{font-size:.875rem;font-weight:500;color:#94a3b8;text-decoration:none;transition:color .2s}
        .nav-links a:hover{color:#e2e8f0}
        .nav-btn{
          padding:9px 22px !important;
          background:linear-gradient(135deg,var(--cyan2),var(--violet2)) !important;
          color:#fff !important;border-radius:8px;font-weight:600 !important;
          box-shadow:0 0 20px rgba(56,189,248,.22);
          transition:box-shadow .2s,transform .2s !important;
        }
        .nav-btn:hover{box-shadow:0 0 35px rgba(56,189,248,.45) !important;transform:translateY(-1px);color:#fff !important}

        /* ── HERO ── */
        .hero{
          position:relative;min-height:100vh;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          text-align:center;padding:130px 6% 100px;overflow:hidden;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%,rgba(14,165,233,.1) 0%,transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 70%,rgba(99,102,241,.08) 0%,transparent 55%),
            var(--bg);
        }
        .orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(80px)}
        .orb-1{width:500px;height:500px;top:-120px;left:-100px;background:radial-gradient(circle,rgba(14,165,233,.12),transparent 70%);animation:orb-float 14s ease-in-out infinite}
        .orb-2{width:400px;height:400px;bottom:-80px;right:-80px;background:radial-gradient(circle,rgba(99,102,241,.12),transparent 70%);animation:orb-float 18s ease-in-out infinite reverse}
        .orb-3{width:300px;height:300px;top:40%;left:65%;background:radial-gradient(circle,rgba(56,189,248,.07),transparent 70%);animation:orb-float 22s ease-in-out infinite}
        @keyframes orb-float{0%,100%{transform:translate(0,0)}33%{transform:translate(30px,-20px)}66%{transform:translate(-20px,15px)}}
        .hero-content{position:relative;z-index:1;max-width:900px}
        .hero-badge{
          display:inline-flex;align-items:center;gap:8px;
          padding:7px 16px;background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.22);
          border-radius:999px;font-size:.75rem;font-weight:600;color:var(--cyan);letter-spacing:.06em;text-transform:uppercase;margin-bottom:32px;
        }
        .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan);animation:blink 2s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .hero h1{font-size:clamp(2.8rem,6vw,5rem);font-weight:900;line-height:1.06;letter-spacing:-.045em;color:#fff;margin-bottom:28px}
        .hero h1 .accent{background:linear-gradient(135deg,var(--cyan) 0%,var(--violet) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-sub{font-size:clamp(1rem,2vw,1.2rem);color:#94a3b8;max-width:600px;margin:0 auto 48px;line-height:1.8;font-weight:400}
        .hero-actions{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-bottom:72px}

        .btn-glow{
          display:inline-flex;align-items:center;gap:8px;padding:15px 34px;
          background:linear-gradient(135deg,var(--cyan2) 0%,var(--violet2) 100%);
          color:#fff;font-size:.975rem;font-weight:700;border-radius:10px;text-decoration:none;border:none;cursor:pointer;
          box-shadow:0 0 30px rgba(14,165,233,.3),0 4px 20px rgba(0,0,0,.4);
          transition:all .25s;position:relative;overflow:hidden;
        }
        .btn-glow::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.12),transparent);opacity:0;transition:opacity .25s}
        .btn-glow:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(14,165,233,.45),0 8px 30px rgba(0,0,0,.5)}
        .btn-glow:hover::before{opacity:1}
        .btn-outline{
          display:inline-flex;align-items:center;gap:8px;padding:14px 32px;
          background:transparent;color:#cbd5e1;font-size:.975rem;font-weight:600;
          border-radius:10px;text-decoration:none;border:1.5px solid rgba(255,255,255,.12);cursor:pointer;transition:all .25s;
        }
        .btn-outline:hover{border-color:rgba(56,189,248,.4);color:var(--cyan);background:rgba(56,189,248,.05);transform:translateY(-2px)}

        .hero-stats{
          display:flex;gap:0;flex-wrap:wrap;justify-content:center;
          background:var(--glass);border:1px solid var(--border);border-radius:16px;overflow:hidden;backdrop-filter:blur(12px);
        }
        .stat-item{padding:24px 40px;text-align:center;border-right:1px solid var(--border);flex:1;min-width:150px}
        .stat-item:last-child{border-right:none}
        .stat-num{font-size:1.9rem;font-weight:900;letter-spacing:-.04em;background:linear-gradient(135deg,#fff,var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .stat-label{font-size:.75rem;color:var(--muted);font-weight:500;margin-top:4px;text-transform:uppercase;letter-spacing:.05em}

        /* ── TICKER ── */
        .ticker-section{padding:0 0 80px;overflow:hidden}
        .ticker-label{font-size:.7rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;text-align:center;margin-bottom:20px}
        .ticker-wrap{display:flex;overflow:hidden}
        .ticker-track{display:flex;gap:14px;animation:ticker 30s linear infinite;width:max-content}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker-pill{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;background:rgba(8,18,40,.7);border:1px solid var(--border);border-radius:999px;white-space:nowrap;font-size:.8rem;color:#94a3b8;font-weight:500}
        .ticker-dot{width:6px;height:6px;border-radius:50%}
        .dot-red{background:#f87171;box-shadow:0 0 6px #f87171}
        .dot-yellow{background:#fbbf24;box-shadow:0 0 6px #fbbf24}
        .dot-green{background:#34d399;box-shadow:0 0 6px #34d399}

        /* ── SECTIONS ── */
        .section{padding:110px 6%}
        .section-inner{max-width:1200px;margin:0 auto}
        .sec-tag{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan);background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.18);padding:5px 12px;border-radius:999px;margin-bottom:20px}
        .sec-title{font-size:clamp(1.9rem,3.5vw,2.8rem);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.12;margin-bottom:18px}
        .sec-title .accent{background:linear-gradient(135deg,var(--cyan),var(--violet));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .sec-sub{font-size:1.05rem;color:#64748b;line-height:1.75;max-width:520px;margin-bottom:64px}
        .centered{text-align:center}
        .centered .sec-sub{margin-left:auto;margin-right:auto}

        /* ── FEATURES ── */
        .features-bg{background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(14,165,233,.04) 0%,transparent 70%),var(--bg2)}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .feat-card{padding:36px 32px;background:rgba(8,18,40,.6);border:1px solid rgba(56,189,248,.1);border-radius:18px;transition:all .3s;position:relative;overflow:hidden;backdrop-filter:blur(8px)}
        .feat-card::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(56,189,248,.04),transparent 60%);opacity:0;transition:opacity .3s}
        .feat-card:hover{border-color:rgba(56,189,248,.3);transform:translateY(-5px);box-shadow:0 20px 50px rgba(0,0,0,.4),0 0 30px rgba(56,189,248,.06)}
        .feat-card:hover::after{opacity:1}
        .feat-icon-wrap{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,rgba(14,165,233,.15),rgba(99,102,241,.12));border:1px solid rgba(56,189,248,.18);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:22px;position:relative;z-index:1}
        .feat-card h3{font-size:1.02rem;font-weight:700;color:#e2e8f0;letter-spacing:-.02em;margin-bottom:10px;position:relative;z-index:1}
        .feat-card p{font-size:.875rem;color:#64748b;line-height:1.75;position:relative;z-index:1}
        .feat-link{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;font-weight:600;color:var(--cyan);text-decoration:none;margin-top:18px;opacity:0;transform:translateY(6px);transition:all .25s;position:relative;z-index:1}
        .feat-card:hover .feat-link{opacity:1;transform:translateY(0)}

        /* ── HOW IT WORKS ── */
        .hiw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;position:relative;margin-top:64px}
        .hiw-connector{position:absolute;top:36px;left:calc(16.66% + 28px);right:calc(16.66% + 28px);height:1px;background:linear-gradient(90deg,var(--cyan2),var(--violet2));opacity:.3}
        .hiw-step{text-align:center;padding:0 8px;position:relative;z-index:1}
        .hiw-num-wrap{width:72px;height:72px;border-radius:50%;background:var(--glass);border:1px solid rgba(56,189,248,.25);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;backdrop-filter:blur(8px);position:relative}
        .hiw-num-wrap::before{content:'';position:absolute;inset:-3px;border-radius:50%;background:linear-gradient(135deg,rgba(56,189,248,.3),rgba(99,102,241,.2));z-index:-1;opacity:0;transition:opacity .3s}
        .hiw-step:hover .hiw-num-wrap::before{opacity:1}
        .hiw-num{font-size:1.3rem;font-weight:900;background:linear-gradient(135deg,var(--cyan),var(--violet));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hiw-step h3{font-size:1rem;font-weight:700;color:#e2e8f0;margin-bottom:10px;letter-spacing:-.02em}
        .hiw-step p{font-size:.875rem;color:var(--muted);line-height:1.75}

        /* ── PRICING ── */
        .pricing-bg{background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(99,102,241,.05) 0%,transparent 70%),var(--bg)}
        .billing-toggle{
          display:inline-flex;align-items:center;gap:0;
          background:rgba(8,18,40,.8);border:1px solid var(--border);
          border-radius:999px;padding:4px;margin-bottom:56px;
        }
        .toggle-btn{
          padding:8px 24px;border-radius:999px;font-size:.875rem;font-weight:600;
          border:none;cursor:pointer;transition:all .25s;color:#64748b;background:transparent;
        }
        .toggle-btn.active{
          background:linear-gradient(135deg,var(--cyan2),var(--violet2));
          color:#fff;box-shadow:0 0 16px rgba(56,189,248,.3);
        }
        .badge-save{
          display:inline-block;padding:2px 10px;background:rgba(52,211,153,.15);
          border:1px solid rgba(52,211,153,.3);border-radius:999px;
          font-size:.7rem;font-weight:700;color:#34d399;margin-left:8px;
        }
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start}

        .price-card{
          padding:40px 36px;
          background:rgba(8,18,40,.6);
          border:1px solid rgba(56,189,248,.1);
          border-radius:22px;position:relative;overflow:hidden;
          backdrop-filter:blur(10px);
          transition:all .3s;
        }
        .price-card:hover{transform:translateY(-4px);box-shadow:0 24px 60px rgba(0,0,0,.5)}
        .price-card.featured{
          background:linear-gradient(160deg,rgba(14,165,233,.12) 0%,rgba(99,102,241,.1) 100%);
          border-color:rgba(56,189,248,.35);
          box-shadow:0 0 60px rgba(56,189,248,.1),0 0 0 1px rgba(56,189,248,.2);
        }
        .price-card.featured:hover{box-shadow:0 0 80px rgba(56,189,248,.18),0 24px 60px rgba(0,0,0,.5)}
        .featured-badge{
          position:absolute;top:0;left:50%;transform:translateX(-50%);
          padding:5px 20px;
          background:linear-gradient(135deg,var(--cyan2),var(--violet2));
          border-radius:0 0 12px 12px;
          font-size:.7rem;font-weight:800;color:#fff;letter-spacing:.08em;text-transform:uppercase;
          white-space:nowrap;
        }
        .plan-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:20px}
        .plan-icon.free{background:rgba(148,163,184,.08);border:1px solid rgba(148,163,184,.15)}
        .plan-icon.pro{background:linear-gradient(135deg,rgba(14,165,233,.2),rgba(99,102,241,.15));border:1px solid rgba(56,189,248,.25)}
        .plan-icon.team{background:linear-gradient(135deg,rgba(99,102,241,.2),rgba(139,92,246,.15));border:1px solid rgba(99,102,241,.25)}
        .plan-name{font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:12px}
        .plan-price{display:flex;align-items:baseline;gap:4px;margin-bottom:8px}
        .price-dollar{font-size:1.5rem;font-weight:800;color:#94a3b8;margin-top:6px}
        .price-amount{font-size:3.2rem;font-weight:900;letter-spacing:-.05em;color:#fff;line-height:1}
        .price-period{font-size:.9rem;color:var(--muted);font-weight:500}
        .price-annual-note{font-size:.78rem;color:#34d399;margin-bottom:24px;min-height:20px}
        .plan-desc{font-size:.875rem;color:#64748b;line-height:1.7;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid var(--border)}
        .plan-cta{
          display:block;width:100%;padding:13px 0;text-align:center;
          border-radius:10px;font-size:.9rem;font-weight:700;text-decoration:none;
          transition:all .25s;margin-bottom:28px;
        }
        .cta-ghost{border:1.5px solid rgba(255,255,255,.12);color:#94a3b8;background:transparent}
        .cta-ghost:hover{border-color:rgba(56,189,248,.4);color:var(--cyan);background:rgba(56,189,248,.05)}
        .cta-primary{
          background:linear-gradient(135deg,var(--cyan2),var(--violet2));color:#fff;border:none;
          box-shadow:0 0 24px rgba(14,165,233,.25);
        }
        .cta-primary:hover{box-shadow:0 0 40px rgba(14,165,233,.4);transform:translateY(-1px)}
        .cta-team{border:1.5px solid rgba(99,102,241,.35);color:var(--violet);background:transparent}
        .cta-team:hover{border-color:var(--violet);background:rgba(99,102,241,.08)}
        .feature-list{list-style:none;display:flex;flex-direction:column;gap:11px}
        .feature-list li{display:flex;align-items:flex-start;gap:10px;font-size:.85rem;color:#94a3b8;line-height:1.5}
        .check{
          width:18px;height:18px;border-radius:50%;flex-shrink:0;margin-top:1px;
          display:flex;align-items:center;justify-content:center;font-size:.65rem;
        }
        .check-cyan{background:rgba(14,165,233,.15);border:1px solid rgba(56,189,248,.3);color:var(--cyan)}
        .check-violet{background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.3);color:var(--violet)}
        .check-muted{background:rgba(100,116,139,.1);border:1px solid rgba(100,116,139,.2);color:#64748b}

        /* ── CTA SECTION ── */
        .cta-section{padding:80px 6% 110px}
        .cta-card{
          max-width:900px;margin:0 auto;padding:80px 64px;
          background:linear-gradient(135deg,rgba(8,18,40,.95),rgba(15,8,40,.95));
          border:1px solid rgba(56,189,248,.15);border-radius:24px;
          text-align:center;position:relative;overflow:hidden;
        }
        .cta-card::before{content:'';position:absolute;top:-120px;left:50%;transform:translateX(-50%);width:600px;height:300px;background:radial-gradient(ellipse,rgba(14,165,233,.12) 0%,transparent 70%);pointer-events:none}
        .cta-card::after{content:'';position:absolute;bottom:-80px;right:-80px;width:300px;height:300px;background:radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 70%);pointer-events:none}
        .cta-card h2{font-size:clamp(2rem,3.5vw,3rem);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.12;margin-bottom:18px;position:relative;z-index:1}
        .cta-card p{font-size:1.05rem;color:#64748b;margin-bottom:44px;line-height:1.75;position:relative;z-index:1}
        .cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}

        /* ── FOOTER ── */
        footer{border-top:1px solid var(--border);padding:40px 6%;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;background:var(--bg)}
        footer p{font-size:.8rem;color:var(--muted)}
        footer nav{display:flex;gap:24px}
        footer nav a{font-size:.8rem;color:var(--muted);text-decoration:none;transition:color .2s}
        footer nav a:hover{color:var(--cyan)}

        /* ── RESPONSIVE ── */
        @media(max-width:960px){
          .features-grid,.hiw-grid,.pricing-grid{grid-template-columns:1fr 1fr}
          .hiw-connector{display:none}
          .price-card.featured{transform:none}
        }
        @media(max-width:640px){
          .features-grid,.hiw-grid,.pricing-grid{grid-template-columns:1fr}
          .nav-links{display:none}
          .hero-stats{flex-direction:column}
          .stat-item{border-right:none;border-bottom:1px solid var(--border)}
          .stat-item:last-child{border-bottom:none}
          .cta-card{padding:48px 28px}
          footer{flex-direction:column;text-align:center}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <Logo size={36} />
        <ul className="nav-links">
          <li><a href="#features">Platform</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#">Docs</a></li>
          <li><a href="#" className="nav-btn">Start Free Audit</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <ParticleCanvas />
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="hero-content">
          <div className="hero-badge"><span className="badge-dot" />Institutional Web3 Risk Intelligence</div>
          <h1>The Smartest Way to<br /><span className="accent">Audit, Detect & Protect</span><br />On-Chain Assets</h1>
          <p className="hero-sub">Zylithium delivers institutional-grade smart contract auditing, real-time threat detection, and deep risk scoring — purpose-built for founders, traders, and security teams who operate at scale.</p>
          <div className="hero-actions">
            <a href="#" className="btn-glow">Start Free Audit →</a>
            <a href="#features" className="btn-outline">Explore Platform</a>
          </div>
          <div className="hero-stats">
            {[{num:"98.4%",label:"Audit Accuracy"},{num:"12k+",label:"Contracts Audited"},{num:"$2.1B+",label:"Capital Protected"},{num:"<60s",label:"Avg. Report Time"}].map(s=>(
              <div className="stat-item" key={s.label}><div className="stat-num">{s.num}</div><div className="stat-label">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-section">
        <p className="ticker-label">Live Threat Intelligence Feed</p>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[
              {dot:"dot-red",text:"Reentrancy exploit detected · Protocol XYZ"},
              {dot:"dot-yellow",text:"Unusual mint activity · Token ABC"},
              {dot:"dot-green",text:"Audit passed · Vault Protocol v2.1"},
              {dot:"dot-red",text:"Flash loan attack pattern · DEX Omega"},
              {dot:"dot-yellow",text:"High centralization risk · Bridge Delta"},
              {dot:"dot-green",text:"Risk score: 94/100 · StableYield Finance"},
              {dot:"dot-red",text:"Backdoor function detected · NFT Launchpad"},
              {dot:"dot-yellow",text:"Liquidity withdrawal trap · Yield Aggregator"},
              {dot:"dot-green",text:"Clean audit · Lending Protocol Sigma"},
              {dot:"dot-red",text:"Reentrancy exploit detected · Protocol XYZ"},
              {dot:"dot-yellow",text:"Unusual mint activity · Token ABC"},
              {dot:"dot-green",text:"Audit passed · Vault Protocol v2.1"},
              {dot:"dot-red",text:"Flash loan attack pattern · DEX Omega"},
              {dot:"dot-yellow",text:"High centralization risk · Bridge Delta"},
              {dot:"dot-green",text:"Risk score: 94/100 · StableYield Finance"},
              {dot:"dot-red",text:"Backdoor function detected · NFT Launchpad"},
              {dot:"dot-yellow",text:"Liquidity withdrawal trap · Yield Aggregator"},
              {dot:"dot-green",text:"Clean audit · Lending Protocol Sigma"},
            ].map((t,i)=>(
              <div className="ticker-pill" key={i}><span className={`ticker-dot ${t.dot}`}/>{t.text}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="section features-bg" id="features">
        <div className="section-inner">
          <div className="centered">
            <div className="sec-tag">Platform Capabilities</div>
            <h2 className="sec-title">Risk intelligence at <span className="accent">every layer</span></h2>
            <p className="sec-sub">From pre-deployment audits to real-time on-chain monitoring — Zylithium covers the full threat surface of Web3.</p>
          </div>
          <div className="features-grid">
            {[
              {icon:"🔍",title:"AI Smart Contract Auditing",desc:"Submit any Solidity or Rust contract and receive a structured vulnerability report with severity ratings, attack vectors, and remediation steps — in under 60 seconds."},
              {icon:"📊",title:"Institutional Risk Scoring",desc:"Every protocol is assigned a composite risk score across code quality, liquidity depth, team credibility, and on-chain behavior patterns."},
              {icon:"⚡",title:"Real-Time Threat Monitoring",desc:"Get alerted the moment anomalous activity is detected — flash loan attacks, rug mechanics, or unusual fund movements in any tracked contract."},
              {icon:"🛡️",title:"Backdoor & Rug Detection",desc:"Proprietary detection models identify hidden owner privileges, mint bypasses, and liquidity withdrawal traps before they trigger."},
              {icon:"📄",title:"Boardroom-Ready PDF Reports",desc:"Export audit findings as professional PDF reports complete with executive summaries, CVSS scores, and compliance checklists."},
              {icon:"🔗",title:"API & Multi-Chain Integration",desc:"Plug Zylithium into your dev or trading stack via REST API. Supports Ethereum, Solana, Arbitrum, Polygon, BNB Chain, and more."},
            ].map(f=>(
              <div className="feat-card" key={f.title}>
                <div className="feat-icon-wrap">{f.icon}</div>
                <h3>{f.title}</h3><p>{f.desc}</p>
                <a href="#" className="feat-link">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section" id="how-it-works" style={{background:"var(--bg)"}}>
        <div className="section-inner">
          <div className="centered">
            <div className="sec-tag">How It Works</div>
            <h2 className="sec-title">Audit in <span className="accent">three steps</span></h2>
            <p className="sec-sub">No lengthy onboarding. Paste your contract and receive a full institutional-grade risk assessment in under 60 seconds.</p>
          </div>
          <div className="hiw-grid">
            <div className="hiw-connector"/>
            {[
              {num:"01",title:"Submit Your Contract",desc:"Paste a contract address, upload a .sol file, or connect your GitHub repo. All major EVM and non-EVM chains supported."},
              {num:"02",title:"AI Analyzes Every Layer",desc:"Our multi-model engine scans 100+ vulnerability classes — logic flaws, access control issues, and economic exploits — simultaneously."},
              {num:"03",title:"Receive Actionable Intelligence",desc:"Get a scored report with prioritized findings, code-level explanations, and one-click PDF export for your team or investors."},
            ].map(s=>(
              <div className="hiw-step" key={s.num}>
                <div className="hiw-num-wrap"><span className="hiw-num">{s.num}</span></div>
                <h3>{s.title}</h3><p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section pricing-bg" id="pricing">
        <div className="section-inner">
          <div className="centered">
            <div className="sec-tag">Pricing</div>
            <h2 className="sec-title">Simple, <span className="accent">transparent pricing</span></h2>
            <p className="sec-sub">Start free. Upgrade when you need more power. No hidden fees, no surprises.</p>
            {/* billing toggle */}
            <div className="billing-toggle">
              <button className={`toggle-btn${billing==="monthly"?" active":""}`} onClick={()=>setBilling("monthly")}>Monthly</button>
              <button className={`toggle-btn${billing==="yearly"?" active":""}`} onClick={()=>setBilling("yearly")}>
                Yearly <span className="badge-save">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {/* FREE */}
            <div className="price-card">
              <div className="plan-icon free">🔓</div>
              <div className="plan-name">Free</div>
              <div className="plan-price">
                <span className="price-dollar">$</span>
                <span className="price-amount">0</span>
                <span className="price-period">/ forever</span>
              </div>
              <div className="price-annual-note" />
              <p className="plan-desc">Perfect for developers exploring smart contract security for the first time.</p>
              <a href="#" className="plan-cta cta-ghost">Get Started Free</a>
              <ul className="feature-list">
                {["3 audits per month","Basic vulnerability scan","Severity classification","PDF report export","Community support"].map(f=>(
                  <li key={f}><span className="check check-muted">✓</span>{f}</li>
                ))}
              </ul>
            </div>

            {/* PRO — FEATURED */}
            <div className="price-card featured">
              <div className="featured-badge">⚡ Most Popular</div>
              <div className="plan-icon pro" style={{marginTop:24}}>🛡️</div>
              <div className="plan-name">Pro</div>
              <div className="plan-price">
                <span className="price-dollar">$</span>
                <span className="price-amount" style={{background:"linear-gradient(135deg,var(--cyan),var(--violet))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  {billing==="monthly"?"29":"24"}
                </span>
                <span className="price-period">/ mo</span>
              </div>
              <div className="price-annual-note">
                {billing==="yearly"
                  ? <>Billed $290/yr · <strong style={{color:"#34d399"}}>2 months free</strong></>
                  : <>&nbsp;</>}
              </div>
              <p className="plan-desc">For founders and traders who need institutional-grade protection on every deployment.</p>
              <a href="#" className="plan-cta cta-primary">
                {billing==="yearly"?"Start Pro — $290/yr":"Start Pro — $29/mo"}
              </a>
              <ul className="feature-list">
                {[
                  "Unlimited audits",
                  "100+ vulnerability detectors",
                  "Backdoor & rug pull detection",
                  "Real-time threat monitoring",
                  "Composite risk scoring",
                  "Unlimited PDF exports",
                  "API access (5k calls/mo)",
                  "Multi-chain support (8 chains)",
                  "Priority email support",
                ].map(f=>(
                  <li key={f}><span className="check check-cyan">✓</span>{f}</li>
                ))}
              </ul>
            </div>

            {/* TEAM */}
            <div className="price-card">
              <div className="plan-icon team">🏢</div>
              <div className="plan-name">Team</div>
              <div className="plan-price">
                <span className="price-dollar">$</span>
                <span className="price-amount">99</span>
                <span className="price-period">/ mo</span>
              </div>
              <div className="price-annual-note">
                {billing==="yearly"
                  ? <>Billed $990/yr · <strong style={{color:"#34d399"}}>2 months free</strong></>
                  : <>&nbsp;</>}
              </div>
              <p className="plan-desc">For security teams and DAOs that need collaboration, audit history, and advanced integrations.</p>
              <a href="#" className="plan-cta cta-team">Contact Sales</a>
              <ul className="feature-list">
                {[
                  "Everything in Pro",
                  "Up to 10 team seats",
                  "Shared audit workspace",
                  "Unlimited API access",
                  "Webhook & Slack alerts",
                  "Custom vulnerability rules",
                  "Dedicated account manager",
                  "SLA & compliance reports",
                  "SSO / enterprise auth",
                ].map(f=>(
                  <li key={f}><span className="check check-violet">✓</span>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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

      {/* ── FOOTER ── */}
      <footer>
        <Logo size={30} />
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
