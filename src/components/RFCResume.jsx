import React from 'react';
import RR from '../data/resume.js';

// Direction B — RFC-2026 — technical specification document (canvas variant).
// The richer standalone version lives in RFCSpec.jsx; this is the artboard-
// embedded original to keep all three explorations representative.

const RFC = {
  bg: '#fdfcf9',
  bgDark: '#0e0e0e',
  fg: '#0e0e0e',
  fgDark: '#e8e6e1',
  rule: '#0e0e0e',
  ruleDark: '#3a3a36',
  dim: '#5a5852',
  dimDark: '#8a857c',
};

const short2 = (s) => {
  if (!s) return s;
  const m = String(s).match(/^([A-Za-z]{3}) (\d{4})$/);
  if (!m) return s;
  return `${m[1]} ${m[2].slice(2)}`;
};
const RFC_EXPERIENCE = RR.experience.map((e) => ({
  role: e.role, co: e.co,
  from: short2(e.from),
  to: e.to === 'now' ? 'pres.' : short2(e.to),
  detail: e.short,
  team: '—',
}));

const RFC_SKILLS = [
  { area: 'Languages',           items: RR.skills.languages.join(', ') },
  { area: 'Distributed Systems', items: RR.skills.distributed.join(', ') },
  { area: 'Backend / API',       items: RR.skills.backend.join(', ') },
  { area: 'Mobile (formerly)',   items: RR.skills.mobile.join(', ') },
  { area: 'Domains',             items: RR.skills.domains.join(', ') },
  { area: 'Tools',               items: RR.skills.tools.join(', ') },
];

const RFC_PROJECTS = RR.projects.map((p) => ({
  name: p.name, tags: p.tags, year: p.year, stars: p.scale, blurb: p.blurb,
}));

export default function RFCResume() {
  const [dark, setDark] = React.useState(false);
  const [filter, setFilter] = React.useState('all');
  const bg = dark ? RFC.bgDark : RFC.bg;
  const fg = dark ? RFC.fgDark : RFC.fg;
  const dim = dark ? RFC.dimDark : RFC.dim;
  const rule = dark ? RFC.ruleDark : RFC.rule;

  const allTags = ['all', ...Array.from(new Set(RFC_PROJECTS.flatMap((p) => p.tags)))];
  const filtered = filter === 'all' ? RFC_PROJECTS : RFC_PROJECTS.filter((p) => p.tags.includes(filter));

  const archRef = React.useRef(null);
  const [pan, setPan] = React.useState({ x: 0, y: 0, k: 1 });
  const dragging = React.useRef(null);

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: bg, color: fg,
      fontFamily: '"IBM Plex Serif", "Lyon Text", Charter, Georgia, serif',
      fontSize: 13.5, lineHeight: 1.55,
      padding: '40px 56px 60px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        borderBottom: `2px solid ${rule}`, paddingBottom: 16, marginBottom: 24,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
        fontFamily: '"IBM Plex Mono", "JetBrains Mono", monospace', fontSize: 11, letterSpacing: 0.4,
        textTransform: 'uppercase',
      }}>
        <div>Document &nbsp;·&nbsp; RFC-2026</div>
        <div style={{ textAlign: 'right' }}>Category &nbsp;·&nbsp; Career — Standards Track</div>
        <div>Author &nbsp;·&nbsp; {RR.name}</div>
        <div style={{ textAlign: 'right' }}>Status &nbsp;·&nbsp; <button onClick={() => setDark((v) => !v)} style={{ all: 'unset', cursor: 'pointer', borderBottom: `1px solid ${fg}` }}>{dark ? 'dark' : 'light'} mode</button></div>
        <div>Updated &nbsp;·&nbsp; May 2026</div>
        <div style={{ textAlign: 'right' }}>Distribution &nbsp;·&nbsp; Unlimited</div>
      </div>

      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: dim, marginBottom: 18 }}>
          A Specification for One (1) Principal Engineer
        </div>
        <h1 style={{
          fontSize: 56, fontWeight: 400, letterSpacing: -1, lineHeight: 1.02,
          margin: 0, fontFamily: '"IBM Plex Serif", Georgia, serif',
          fontStyle: 'italic',
        }}>
          Adrian Castillejos:<br/>Notes On Taking Systems<br/>Apart, Then Putting Them<br/>Back Together.
        </h1>
        <div style={{ marginTop: 22, fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: dim, letterSpacing: 0.5 }}>
          {RR.title.toUpperCase()} @ {RR.company.toUpperCase()} &nbsp;·&nbsp; {RR.years} YEARS &nbsp;·&nbsp; {RR.location.toUpperCase()}
        </div>
      </div>

      <Sect num="ABSTRACT" rule={rule} dim={dim}>
        <p style={{ margin: 0, columnCount: 2, columnGap: 26, fontSize: 14, lineHeight: 1.6 }}>
          This document specifies the professional history, technical capabilities, and
          notable projects of one (1) Principal Engineer. The author began in mathematics,
          discovered that the best application of math was computer science, and has spent
          the subsequent thirteen (13) years building things that take apart and put
          themselves back together: real-time collaboration platforms, backends serving
          millions of readers, mobile apps that unlock front doors, and most recently an
          AI-assisted circuit-design system. Implementations MUST tolerate ambiguity,
          SHOULD ship to production, and MAY contain wit.
        </p>
      </Sect>

      <Sect num="1." title="Introduction" rule={rule} dim={dim}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, maxWidth: 760 }}>
          The author is a <em>Principal Engineer</em> currently at Circuitly, where
          mathematics, software, and electrons all meet at the same standup. The career
          described herein spans mobile (front doors, speakers, ads), platform engineering
          (Medium, Projector), and now AI-augmented design tooling. This document is the
          canonical reference. Where it conflicts with the author’s LinkedIn profile,
          this document MUST be considered authoritative.<sup style={{ fontSize: 9, marginLeft: 2 }}>[1]</sup>
        </p>
      </Sect>

      <Sect num="2." title="Operational History" rule={rule} dim={dim}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${rule}`, textAlign: 'left', textTransform: 'uppercase', letterSpacing: 0.6, color: dim }}>
              <th style={{ padding: '8px 8px 8px 0', fontWeight: 500, width: 110 }}>Period</th>
              <th style={{ padding: '8px', fontWeight: 500, width: 200 }}>Role / Organization</th>
              <th style={{ padding: '8px', fontWeight: 500, width: 60, textAlign: 'right' }}>Team</th>
              <th style={{ padding: '8px 0 8px 8px', fontWeight: 500 }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {RFC_EXPERIENCE.map((e, i) => (
              <tr key={i} style={{ borderBottom: i < RFC_EXPERIENCE.length - 1 ? `1px dotted ${dim}` : 'none', verticalAlign: 'top' }}>
                <td style={{ padding: '12px 8px 12px 0' }}>{e.from}–{e.to}</td>
                <td style={{ padding: '12px 8px' }}>
                  <div style={{ fontWeight: 600 }}>{e.role}</div>
                  <div style={{ color: dim }}>{e.co}</div>
                </td>
                <td style={{ padding: '12px 8px', textAlign: 'right' }}>{e.team}</td>
                <td style={{ padding: '12px 0 12px 8px', fontFamily: '"IBM Plex Serif", serif', fontSize: 13.5 }}>{e.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Sect>

      <Sect num="3." title="Timeline (Fig. 1)" rule={rule} dim={dim}>
        <RFCTimeline fg={fg} dim={dim} rule={rule} />
        <Caption dim={dim}>Fig. 1 — Career velocity vs. year. Slope steepens during pandemic interval.</Caption>
      </Sect>

      <Sect num="4." title="Capability Matrix" rule={rule} dim={dim}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>
          <tbody>
            {RFC_SKILLS.map((s, i) => (
              <tr key={s.area} style={{ borderBottom: i < RFC_SKILLS.length - 1 ? `1px dotted ${dim}` : 'none' }}>
                <td style={{ padding: '10px 12px 10px 0', width: 200, verticalAlign: 'top', textTransform: 'uppercase', letterSpacing: 0.5, color: dim, fontSize: 11 }}>
                  {`§4.${i + 1}`} &nbsp; {s.area}
                </td>
                <td style={{ padding: '10px 0', fontFamily: '"IBM Plex Mono", monospace' }}>{s.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Sect>

      <Sect num="5." title="Reference Architecture (Fig. 2)" rule={rule} dim={dim}>
        <div style={{
          border: `1px solid ${rule}`, position: 'relative',
          height: 340, overflow: 'hidden', background: dark ? '#111' : '#fff',
          userSelect: 'none', WebkitUserSelect: 'none',
        }}
          onWheel={(e) => {
            e.preventDefault();
            const r = e.currentTarget.getBoundingClientRect();
            const px = e.clientX - r.left, py = e.clientY - r.top;
            setPan((p) => {
              const k = Math.max(0.4, Math.min(3, p.k * Math.exp(-e.deltaY * 0.001)));
              const ratio = k / p.k;
              return { k, x: px - (px - p.x) * ratio, y: py - (py - p.y) * ratio };
            });
          }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            dragging.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            const dx = e.clientX - dragging.current.x, dy = e.clientY - dragging.current.y;
            dragging.current = { x: e.clientX, y: e.clientY };
            setPan((p) => ({ ...p, x: p.x + dx, y: p.y + dy }));
          }}
          onPointerUp={(e) => { dragging.current = null; e.currentTarget.releasePointerCapture(e.pointerId); }}
        >
          <div ref={archRef} style={{
            position: 'absolute', top: 0, left: 0,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${pan.k})`,
            transformOrigin: '0 0', cursor: 'grab', pointerEvents: 'none',
          }}>
            <RFCArchSVG fg={fg} dim={dim} />
          </div>
          <div style={{
            position: 'absolute', bottom: 8, right: 10, fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10, color: dim, background: bg, padding: '3px 7px', border: `1px solid ${rule}`,
            display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <span>{Math.round(pan.k * 100)}%</span>
            <button onClick={() => setPan({ x: 0, y: 0, k: 1 })} style={{
              all: 'unset', cursor: 'pointer', borderBottom: `1px solid ${fg}`, color: fg,
            }}>reset</button>
            <span style={{ opacity: 0.6 }}>· drag / scroll to zoom</span>
          </div>
        </div>
        <Caption dim={dim}>Fig. 2 — Canonical request path. Components MAY be swapped; semantics MUST NOT.</Caption>
      </Sect>

      <Sect num="6." title="Open-Source Output" rule={rule} dim={dim}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14, fontFamily: '"IBM Plex Mono", monospace', fontSize: 11 }}>
          <span style={{ color: dim, textTransform: 'uppercase', letterSpacing: 0.5, padding: '4px 0' }}>FILTER:</span>
          {allTags.map((t) => {
            const on = filter === t;
            return (
              <button key={t} onClick={() => setFilter(t)} style={{
                fontFamily: 'inherit', fontSize: 11,
                padding: '3px 8px', borderRadius: 0, cursor: 'pointer',
                border: `1px solid ${rule}`,
                background: on ? fg : 'transparent',
                color: on ? bg : fg,
                textTransform: 'uppercase', letterSpacing: 0.5,
              }}>{t}</button>
            );
          })}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${rule}`, textAlign: 'left', fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, color: dim }}>
              <th style={{ padding: '7px 8px 7px 0', fontWeight: 500, width: 140 }}>Name</th>
              <th style={{ padding: '7px 8px', fontWeight: 500, width: 60 }}>Year</th>
              <th style={{ padding: '7px 8px', fontWeight: 500, width: 60, textAlign: 'right' }}>★</th>
              <th style={{ padding: '7px 0 7px 8px', fontWeight: 500 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.name} style={{ borderBottom: i < filtered.length - 1 ? `1px dotted ${dim}` : 'none' }}>
                <td style={{ padding: '10px 8px 10px 0', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{p.name}</td>
                <td style={{ padding: '10px 8px', fontFamily: '"IBM Plex Mono", monospace' }}>{p.year}</td>
                <td style={{ padding: '10px 8px', fontFamily: '"IBM Plex Mono", monospace', textAlign: 'right' }}>{p.stars}</td>
                <td style={{ padding: '10px 0 10px 8px' }}>{p.blurb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Sect>

      <Sect num="7." title="Formal Education" rule={rule} dim={dim}>
        <div style={{ fontSize: 14 }}>
          <strong>{RR.education[0].degree}</strong>, {RR.education[0].school}.<br />
          <span style={{ color: dim }}>{RR.education[0].note}</span>
        </div>
      </Sect>

      <Sect num="8." title="Contact Endpoints" rule={rule} dim={dim}>
        <table style={{ borderCollapse: 'collapse', fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>
          <tbody>
            <tr><td style={{ padding: '5px 24px 5px 0', color: dim }}>EMAIL</td><td>{RR.email}</td></tr>
            <tr><td style={{ padding: '5px 24px 5px 0', color: dim }}>GITHUB</td><td>{RR.github}</td></tr>
            <tr><td style={{ padding: '5px 24px 5px 0', color: dim }}>LINKEDIN</td><td>{RR.linkedin}</td></tr>
            <tr><td style={{ padding: '5px 24px 5px 0', color: dim }}>SLA</td><td>response within 1 business day (best-effort)</td></tr>
          </tbody>
        </table>
      </Sect>

      <div style={{ marginTop: 32, paddingTop: 14, borderTop: `1px solid ${rule}`, fontSize: 11, color: dim, fontFamily: '"IBM Plex Mono", monospace' }}>
        <div>[1] This document’s LinkedIn profile is, however, more frequently updated.</div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between' }}>
          <span>RFC-2026 &nbsp;·&nbsp; {RR.name} &nbsp;·&nbsp; Standards Track</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}

function Sect({ num, title, children, rule, dim }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 14,
        borderBottom: `1px solid ${rule}`, paddingBottom: 6, marginBottom: 14,
        fontFamily: '"IBM Plex Mono", monospace', textTransform: 'uppercase', letterSpacing: 0.7,
      }}>
        <span style={{ fontSize: 12, color: dim, minWidth: 28 }}>{num}</span>
        {title && <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>}
      </div>
      {children}
    </section>
  );
}

function Caption({ dim, children }) {
  return (
    <div style={{ marginTop: 8, textAlign: 'center', fontStyle: 'italic', fontSize: 12, color: dim }}>{children}</div>
  );
}

function RFCTimeline({ fg, dim, rule }) {
  const { from: minY, to: maxY } = RR.timelineRange;
  const span = maxY - minY;
  const years = [];
  for (let y = minY; y <= maxY; y += 2) years.push(y);
  if (years[years.length - 1] !== maxY) years.push(maxY);
  const markers = RR.timelineBands;
  const pct = (y) => `${((y - minY) / span) * 100}%`;
  return (
    <div style={{ position: 'relative', height: 96, fontFamily: '"IBM Plex Mono", monospace', fontSize: 11 }}>
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, height: 1, background: rule }} />
      {years.map((y) => (
        <div key={y} style={{ position: 'absolute', left: pct(y), top: 36, transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 8, background: rule }} />
          <div style={{ marginTop: 4, color: dim }}>{y}</div>
        </div>
      ))}
      {markers.map((m, i) => {
        const next = markers[i + 1];
        const w = next ? `calc(${pct(next.year)} - ${pct(m.year)})` : `calc(${pct(maxY)} - ${pct(m.year)})`;
        return (
          <React.Fragment key={m.year}>
            <div style={{ position: 'absolute', left: pct(m.year), top: 22, height: 6, width: w, background: fg }} />
            <div style={{ position: 'absolute', left: pct(m.year), top: 4, transform: 'translateX(-50%)', color: fg, fontWeight: 600 }}>
              {m.role}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function RFCArchSVG({ fg, dim }) {
  return (
    <svg width="900" height="540" viewBox="0 0 900 540" style={{ display: 'block' }}>
      <g fill="none" stroke={fg} strokeWidth="1.2" fontFamily="'IBM Plex Mono', monospace" fontSize="11">
        {[
          { x: 80,  label: 'web app' },
          { x: 280, label: 'ios app' },
          { x: 480, label: 'cli / api' },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={40} width={100} height={36} />
            <text x={c.x + 50} y={62} fill={fg} textAnchor="middle">{c.label}</text>
          </g>
        ))}
        <path d="M 130 76 L 130 130 L 450 130 L 450 160 M 330 76 L 330 130 M 530 76 L 530 130" />
        <rect x={370} y={160} width={160} height={44} />
        <text x={450} y={180} fill={fg} textAnchor="middle" fontWeight="600">edge proxy</text>
        <text x={450} y={196} fill={dim} textAnchor="middle">authz · rate-limit</text>
        <path d="M 450 204 L 450 240 M 200 280 L 450 240 L 700 280 M 200 280 L 200 300 M 450 280 L 450 300 M 700 280 L 700 300" />
        {[
          { x: 130, y: 300, name: 'schematic',  lang: 'TS' },
          { x: 380, y: 300, name: 'solver',     lang: 'Rust' },
          { x: 630, y: 300, name: 'ai assist',  lang: 'TS' },
        ].map((s, i) => (
          <g key={i}>
            <rect x={s.x} y={s.y} width={140} height={48} />
            <text x={s.x + 70} y={s.y + 22} fill={fg} textAnchor="middle" fontWeight="600">{s.name}</text>
            <text x={s.x + 70} y={s.y + 38} fill={dim} textAnchor="middle">({s.lang})</text>
          </g>
        ))}
        <path d="M 200 348 L 200 380 M 450 348 L 450 380 M 700 348 L 700 380" />
        <rect x={330} y={380} width={240} height={36} />
        <text x={450} y={402} fill={fg} textAnchor="middle">event bus · redis streams</text>
        <path d="M 450 416 L 450 450" />
        <rect x={330} y={450} width={240} height={48} />
        <text x={450} y={472} fill={fg} textAnchor="middle" fontWeight="600">postgres · primary</text>
        <text x={450} y={488} fill={dim} textAnchor="middle">durable state · replicated reads</text>
        <text x={20}  y={400} fill={dim}>CDC →</text>
        <text x={585} y={172} fill={dim}>typescript everywhere</text>
      </g>
    </svg>
  );
}
