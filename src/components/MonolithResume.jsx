import React from 'react';
import MR from '../data/resume.js';

// Direction C — MONOLITH — Brutalist editorial monochrome
// Massive Inter-Tight display type, huge numerals, inverted bands, slabby grids.

const MONO = {
  bg: '#f4f2ec',
  fg: '#0d0d0d',
  bgDark: '#0d0d0d',
  fgDark: '#f4f2ec',
  dim: '#6e6a63',
  dimDark: '#8a857c',
};

const M_EXPERIENCE = MR.experience.map((e) => ({
  role: e.role, co: e.co,
  from: e.fromYear,
  to: e.to === 'now' ? 'NOW' : e.toYear,
  headline: e.short,
}));

const M_PROJECTS = MR.projects.map((p) => ({
  name: p.name,
  cat: p.tags[0].toUpperCase(),
  year: p.year,
  scale: p.scale,
}));

const M_FACTS = MR.facts;

export default function MonolithResume() {
  const [dark, setDark] = React.useState(false);
  const [filter, setFilter] = React.useState('ALL');
  const [scrub, setScrub] = React.useState(1);
  const [showCmd, setShowCmd] = React.useState(false);

  const bg = dark ? MONO.bgDark : MONO.bg;
  const fg = dark ? MONO.fgDark : MONO.fg;
  const dim = dark ? MONO.dimDark : MONO.dim;

  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - start) / 2200);
      setScrub(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const tags = ['ALL', ...Array.from(new Set(M_PROJECTS.map((p) => p.cat)))];
  const filteredProjects = filter === 'ALL' ? M_PROJECTS : M_PROJECTS.filter((p) => p.cat === filter);

  React.useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCmd((v) => !v);
      } else if (e.key === 'Escape') {
        setShowCmd(false);
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: bg, color: fg,
      fontFamily: '"Inter Tight", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      letterSpacing: -0.02,
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 36px', borderBottom: `1px solid ${fg}`,
        fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500,
      }}>
        <span>{MR.name.toUpperCase()} / {MR.title.toUpperCase()} / V{MR.years}.0</span>
        <span style={{ display: 'flex', gap: 20 }}>
          <button onClick={() => setShowCmd(true)} style={btn(fg)}>⌘K</button>
          <button onClick={() => setDark((v) => !v)} style={btn(fg)}>{dark ? 'LIGHT' : 'DARK'}</button>
        </span>
      </div>

      <section style={{ padding: '64px 36px 36px', borderBottom: `1px solid ${fg}` }}>
        <div style={{
          fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 36, color: dim,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>FIG. 00 — INDEX</span>
          <span>EST. {MR.timelineRange.from}</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 162, lineHeight: 0.85, fontWeight: 800, letterSpacing: -6 }}>
          {MR.name.split(' ')[0].toUpperCase()}<br/>
          {MR.name.split(' ').slice(1).join(' ').toUpperCase()}<br/>
          <span style={{ fontStyle: 'italic', fontWeight: 300 }}>takes things apart</span><br/>
          AND PUTS&nbsp;THEM<br/>
          BACK&nbsp;TOGETHER.
        </h1>
        <div style={{
          marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 36,
          paddingTop: 24, borderTop: `1px solid ${fg}`,
        }}>
          <div>
            <div style={{ fontSize: 11, color: dim, textTransform: 'uppercase', marginBottom: 8 }}>WHO</div>
            <div style={{ fontSize: 18, lineHeight: 1.35 }}>{MR.about.long}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: dim, textTransform: 'uppercase', marginBottom: 8 }}>SPECIALTIES</div>
            <div style={{ fontSize: 18, lineHeight: 1.35 }}>
              {[...MR.skills.distributed.slice(0, 3), ...MR.skills.backend.slice(0, 2)].join(' · ')}
              {' · '}
              {MR.skills.languages.slice(0, 2).join(' + ')}.
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: dim, textTransform: 'uppercase', marginBottom: 8 }}>LOCATION / STATUS</div>
            <div style={{ fontSize: 18, lineHeight: 1.35 }}>
              {MR.location}. Currently at {MR.company}. {MR.about.witty.split('.')[0]}.
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: fg, color: bg, padding: '56px 36px' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 28, opacity: 0.65 }}>
          §01 — FACTS, ROUNDED TO TWO SIGNIFICANT FIGURES
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {M_FACTS.map(([n, lbl], i) => (
            <div key={i} style={{
              padding: '24px 20px 18px 0',
              borderTop: i < 4 ? 'none' : `1px solid ${bg}`,
              borderRight: (i % 4 !== 3) ? `1px solid ${bg}` : 'none',
              paddingLeft: (i % 4 === 0) ? 0 : 20,
            }}>
              <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 0.9, letterSpacing: -3 }}>{n}</div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 10, opacity: 0.75 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '56px 36px', borderBottom: `1px solid ${fg}` }}>
        <SectionHead num="02" title="EXPERIENCE" dim={dim} fg={fg} />
        {M_EXPERIENCE.map((e, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '160px 1fr auto',
            gap: 20, padding: '26px 0', borderTop: `1px solid ${fg}`,
            alignItems: 'baseline',
          }}>
            <div style={{ fontSize: 14, fontFamily: '"JetBrains Mono", monospace', fontWeight: 500 }}>
              {e.from}—{e.to}
            </div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>
                {e.role}
                <span style={{ color: dim, fontWeight: 300, fontStyle: 'italic', marginLeft: 14 }}>@ {e.co}</span>
              </div>
              <div style={{ fontSize: 15, marginTop: 10, color: dim, fontFamily: '"JetBrains Mono", monospace' }}>
                {e.headline}
              </div>
            </div>
            <div style={{ fontSize: 14, color: dim, fontFamily: '"JetBrains Mono", monospace' }}>
              {String(i + 1).padStart(2, '0')} / {String(M_EXPERIENCE.length).padStart(2, '0')}
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: '56px 36px', borderBottom: `1px solid ${fg}` }}>
        <SectionHead num="03" title="TIMELINE" dim={dim} fg={fg} />
        <div style={{ position: 'relative', height: 220, marginTop: 24 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 110, height: 1, background: fg, opacity: 0.25 }} />
          <div style={{
            position: 'absolute', left: 0, top: 105, height: 10, background: fg,
            width: `${scrub * 100}%`, transition: 'width 60ms linear',
          }} />
          {(() => {
            const { from: y0, to: y1 } = MR.timelineRange;
            const span = y1 - y0;
            const bands = [
              ...MR.timelineBands.map((b) => ({ y: b.year, role: b.role.toUpperCase(), pos: (b.year - y0) / span })),
              { y: y1, role: 'NOW', pos: 1 },
            ];
            return bands.map((m, i) => (
              <div key={i} style={{
                position: 'absolute', left: `${m.pos * 100}%`, top: 0, transform: 'translateX(-50%)',
                opacity: scrub >= m.pos ? 1 : 0.15, transition: 'opacity 120ms',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: dim, fontFamily: '"JetBrains Mono", monospace' }}>{m.y}</div>
                <div style={{ width: 1, height: 80, background: fg, margin: '6px auto' }} />
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, marginTop: 8, whiteSpace: 'nowrap' }}>{m.role}</div>
              </div>
            ));
          })()}
        </div>
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <input type="range" min="0" max="100" value={Math.round(scrub * 100)}
            onChange={(e) => setScrub(parseInt(e.target.value, 10) / 100)}
            style={{ flex: 1, accentColor: fg }} />
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: dim, width: 60, textAlign: 'right' }}>
            {String(Math.round(MR.timelineRange.from + scrub * (MR.timelineRange.to - MR.timelineRange.from))).padStart(4, '0')}
          </span>
        </div>
      </section>

      <section style={{ padding: '56px 36px', borderBottom: `1px solid ${fg}` }}>
        <SectionHead num="04" title="STACK" dim={dim} fg={fg} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: `1px solid ${fg}` }}>
          {[
            ['LANGUAGES',    MR.skills.languages.join(' / ')],
            ['DISTRIBUTED',  MR.skills.distributed.join(' · ')],
            ['BACKEND',      MR.skills.backend.join(' · ')],
            ['MOBILE',       MR.skills.mobile.join(' / ')],
            ['DOMAINS',      MR.skills.domains.join(' · ')],
            ['TOOLS',        MR.skills.tools.join(' · ')],
          ].map(([k, v], i) => (
            <div key={k} style={{
              padding: '22px 24px',
              borderBottom: `1px solid ${fg}`,
              borderRight: (i % 2 === 0) ? `1px solid ${fg}` : 'none',
            }}>
              <div style={{ fontSize: 11, color: dim, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{k}</div>
              <div style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.2 }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '56px 36px', borderBottom: `1px solid ${fg}` }}>
        <SectionHead num="05" title="REFERENCE ARCHITECTURE" dim={dim} fg={fg} />
        <div style={{ marginTop: 24, padding: 24, border: `1px solid ${fg}` }}>
          <MonoArch fg={fg} dim={dim} bg={bg} />
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: dim, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          FIG. 05 — CANONICAL REQUEST PATH. ONE OF THE DOZEN OR SO I’VE DRAWN ON A WHITEBOARD AT 11&nbsp;P.M.
        </div>
      </section>

      <section style={{ padding: '56px 36px', borderBottom: `1px solid ${fg}` }}>
        <SectionHead num="06" title="SELECTED OUTPUT" dim={dim} fg={fg} />
        <div style={{ display: 'flex', gap: 0, marginTop: 4, marginBottom: 0 }}>
          {tags.map((t) => {
            const on = filter === t;
            return (
              <button key={t} onClick={() => setFilter(t)} style={{
                padding: '10px 18px', fontFamily: 'inherit',
                fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
                background: on ? fg : 'transparent', color: on ? bg : fg,
                border: `1px solid ${fg}`, borderRight: 'none', cursor: 'pointer',
                textTransform: 'uppercase',
              }}>{t}</button>
            );
          })}
          <div style={{ flex: 1, borderTop: `1px solid ${fg}`, borderRight: `1px solid ${fg}` }} />
        </div>
        <div style={{ borderLeft: `1px solid ${fg}`, borderRight: `1px solid ${fg}` }}>
          {filteredProjects.map((p, i) => (
            <div key={p.name} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 100px 130px',
              gap: 16, padding: '22px 18px',
              borderBottom: `1px solid ${fg}`, alignItems: 'baseline',
            }}>
              <div style={{ fontSize: 14, fontFamily: '"JetBrains Mono", monospace', color: dim }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>{p.name}</div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>{p.cat}</div>
              <div style={{ fontSize: 12, fontFamily: '"JetBrains Mono", monospace', color: dim, textAlign: 'right' }}>
                {p.year} · {p.scale}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '56px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, borderBottom: `1px solid ${fg}` }}>
        <div>
          <SectionHead num="07" title="EDUCATION" dim={dim} fg={fg} />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8, lineHeight: 1.05, marginTop: 8 }}>
            {MR.education[0].degree}
          </div>
          <div style={{ fontSize: 16, color: dim, marginTop: 8 }}>
            {MR.education[0].school}{MR.education[0].year ? ` · ${MR.education[0].year}` : ''}<br/>
            {MR.education[0].note}
          </div>
        </div>
        <div>
          <SectionHead num="08" title="CONTACT" dim={dim} fg={fg} />
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, marginTop: 8 }}>
            <div style={{ borderTop: `1px solid ${fg}`, padding: '12px 0', display: 'flex' }}>
              <span style={{ width: 100, color: dim }}>EMAIL</span> {MR.email}
            </div>
            <div style={{ borderTop: `1px solid ${fg}`, padding: '12px 0', display: 'flex' }}>
              <span style={{ width: 100, color: dim }}>GITHUB</span> {MR.github}
            </div>
            <div style={{ borderTop: `1px solid ${fg}`, padding: '12px 0', display: 'flex' }}>
              <span style={{ width: 100, color: dim }}>LINKEDIN</span> {MR.linkedin}
            </div>
            <div style={{ borderTop: `1px solid ${fg}`, borderBottom: `1px solid ${fg}`, padding: '12px 0', display: 'flex' }}>
              <span style={{ width: 100, color: dim }}>RESPONSE</span> within 1 business day
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 36px 48px', display: 'flex', justifyContent: 'space-between', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, color: dim }}>
        <span>END / DOCUMENT V{MR.years}.0 / SET IN INTER TIGHT &amp; JETBRAINS MONO</span>
        <span>© {MR.name.toUpperCase()} 2026 · NO RIGHTS RESERVED</span>
      </section>

      {showCmd && (
        <CommandPalette fg={fg} bg={bg} dim={dim} onClose={() => setShowCmd(false)} setDark={setDark} setFilter={setFilter} />
      )}
    </div>
  );
}

function btn(fg) {
  return {
    fontFamily: 'inherit', fontSize: 11, fontWeight: 500, letterSpacing: 0.5,
    padding: '4px 10px', cursor: 'pointer',
    background: 'transparent', color: fg, border: `1px solid ${fg}`,
    textTransform: 'uppercase',
  };
}

function SectionHead({ num, title, dim, fg }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
      <div style={{ fontSize: 11, color: dim, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 0.5 }}>§{num}</div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{title}</div>
      <div style={{ flex: 1, height: 1, background: fg, opacity: 0.25 }} />
    </div>
  );
}

function MonoArch({ fg, dim }) {
  const A = MR.architecture;
  return (
    <svg width="100%" viewBox="0 0 1000 360" style={{ display: 'block' }} preserveAspectRatio="xMidYMid meet">
      <g fill="none" stroke={fg} strokeWidth="1.5" fontFamily="'JetBrains Mono', monospace" fontSize="12">
        {A.clients.map((c, i) => {
          const x = 100 + i * 320;
          return (
            <g key={i}>
              <rect x={x} y={20} width={160} height={42} />
              <text x={x + 80} y={47} fill={fg} textAnchor="middle" fontWeight="600">{c.label.toUpperCase()}</text>
            </g>
          );
        })}
        <path d="M 180 62 L 180 100 L 500 100 L 500 140 M 500 62 L 500 100 M 820 62 L 820 100 L 500 100" />
        <rect x={400} y={140} width={200} height={50} />
        <text x={500} y={162} fill={fg} textAnchor="middle" fontWeight="700">{A.edge.name.toUpperCase()}</text>
        <text x={500} y={180} fill={dim} textAnchor="middle">{A.edge.sub}</text>
        <path d="M 500 190 L 500 220 M 200 250 L 500 220 L 800 250 M 200 250 L 200 260 M 500 250 L 500 260 M 800 250 L 800 260" />
        {A.services.map((s, i) => {
          const x = 120 + i * 300;
          return (
            <g key={i}>
              <rect x={x} y={260} width={160} height={52} />
              <text x={x + 80} y={284} fill={fg} textAnchor="middle" fontWeight="700">{s.name.toUpperCase()}</text>
              <text x={x + 80} y={302} fill={dim} textAnchor="middle">({s.lang})</text>
            </g>
          );
        })}
        <text x={970} y={290} fill={dim} textAnchor="end">→ {A.bus.name.toUpperCase()} ({A.bus.sub}) → {A.store.name.toUpperCase()}</text>
        <path d="M 30 320 L 970 320" strokeDasharray="2 4" />
      </g>
    </svg>
  );
}

function CommandPalette({ fg, bg, dim, onClose, setDark, setFilter }) {
  const [q, setQ] = React.useState('');
  const ref = React.useRef(null);
  React.useEffect(() => { ref.current && ref.current.focus(); }, []);

  const items = [
    { label: 'Toggle theme', run: () => { setDark((v) => !v); onClose(); } },
    ...['ALL', ...Array.from(new Set(M_PROJECTS.map((p) => p.cat)))].map((cat) => ({
      label: `Show projects: ${cat}`,
      run: () => { setFilter(cat); onClose(); },
    })),
    { label: 'Copy email →',          run: () => { navigator.clipboard?.writeText(MR.email); onClose(); } },
    { label: 'Open GitHub →',         run: () => { onClose(); } },
    { label: 'Open LinkedIn →',       run: () => { onClose(); } },
  ];
  const matched = items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <div onClick={onClose}
      style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)',
        backdropFilter: 'blur(4px)',
        zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 120,
      }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 520, background: bg, color: fg, border: `1px solid ${fg}`,
        boxShadow: `12px 12px 0 ${fg}`, fontFamily: '"JetBrains Mono", monospace',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${fg}`, padding: '12px 14px' }}>
          <span style={{ color: dim, marginRight: 10 }}>⌘</span>
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command…"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: fg, fontFamily: 'inherit', fontSize: 14 }} />
          <span style={{ fontSize: 10, color: dim, border: `1px solid ${dim}`, padding: '2px 6px' }}>ESC</span>
        </div>
        <div style={{ maxHeight: 280, overflow: 'auto' }}>
          {matched.map((it, i) => (
            <button key={i} onClick={it.run} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '11px 14px', fontFamily: 'inherit', fontSize: 13,
              background: 'transparent', color: fg, border: 'none',
              borderBottom: i < matched.length - 1 ? `1px solid ${fg}22` : 'none',
              cursor: 'pointer',
            }}>
              <span>{it.label}</span>
            </button>
          ))}
          {!matched.length && (
            <div style={{ padding: '14px', fontSize: 12, color: dim }}>no matches</div>
          )}
        </div>
      </div>
    </div>
  );
}
