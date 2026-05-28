import React from 'react';
import R from '../data/resume.js';

// Direction A — ~/resume — Terminal-native resume
// Black-on-mono, JetBrains Mono, live CLI playground.

const TERM = {
  bg: '#0a0a0a',
  bgLight: '#fafaf7',
  fg: '#e8e6e1',
  fgLight: '#1a1a1a',
  dim: '#6e6a63',
  dimLight: '#8a857c',
};

const PROFILE = {
  user: R.name.split(' ')[0].toLowerCase(),
  host: R.company.toLowerCase().replace(/\s+/g, '-'),
  name: R.name,
  title: `${R.title} @ ${R.company}`,
  location: R.location,
  years: R.years,
  email: R.email,
  github: R.github,
  linkedin: R.linkedin,
};

const EXPERIENCE = R.experience.map((e) => ({
  role: e.role, co: e.co, from: e.from, to: e.to, detail: e.detail,
}));

const SKILLS = {
  languages:  R.skills.languages,
  distributed: R.skills.distributed,
  backend:    R.skills.backend,
  mobile:     R.skills.mobile,
  domains:    R.skills.domains,
  tools:      [...R.skills.tools, 'an obnoxious number of dotfiles'],
};

const PROJECTS = R.projects.map((p) => ({ name: p.name, tags: p.tags, blurb: p.blurb }));
const EDUCATION = R.education;

const Banner = ({ light }) => (
  <pre style={{
    margin: 0, fontFamily: 'inherit', fontSize: 12, lineHeight: 1.05,
    color: light ? TERM.fgLight : TERM.fg, whiteSpace: 'pre',
  }}>{
` █████╗ ██████╗ ██████╗ ██╗ █████╗ ███╗  ██╗
██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗████╗ ██║
███████║██║  ██║██████╔╝██║███████║██╔██╗██║
██╔══██║██║  ██║██╔══██╗██║██╔══██║██║╚████║
██║  ██║██████╔╝██║  ██║██║██║  ██║██║ ╚███║
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚══╝   castillejos`
  }</pre>
);

const AsciiArch = ({ light }) => (
  <pre style={{
    margin: 0, fontFamily: 'inherit', fontSize: 12, lineHeight: 1.25,
    color: light ? TERM.fgLight : TERM.fg, whiteSpace: 'pre',
  }}>{
`        ┌──────────┐    ┌──────────┐    ┌──────────┐
        │ ios app  │    │ web app  │    │ cli      │
        └────┬─────┘    └────┬─────┘    └────┬─────┘
             └───────────────┼───────────────┘
                             │  mTLS / h2
                       ┌─────▼──────┐
                       │   edge     │  ◀── auth, ratelimit
                       │  (envoy)   │
                       └─────┬──────┘
                             │
                ┌────────────┼────────────┐
          ┌─────▼─────┐ ┌────▼────┐ ┌─────▼─────┐
          │ schematic │ │  solver │ │ ai assist │
          │    api    │ │  (rust) │ │  (typescript)
          └─────┬─────┘ └────┬────┘ └─────┬─────┘
                │            │            │
                │     ┌──────▼──────┐     │
                └────▶│ event bus   │◀────┘
                      │  (redis)    │
                      └──────┬──────┘
                             │ change-data-capture
                       ┌─────▼──────┐
                       │  postgres  │
                       │  (primary) │
                       └────────────┘`
  }</pre>
);

const AsciiTimeline = ({ light, played }) => {
  const years = [2013, 2017, 2021, 2024, 2026];
  const totalCols = 56;
  const filled = Math.max(0, Math.min(totalCols, Math.round(totalCols * played)));
  const bar = '█'.repeat(filled) + '░'.repeat(totalCols - filled);
  return (
    <pre style={{
      margin: 0, fontFamily: 'inherit', fontSize: 12, lineHeight: 1.3,
      color: light ? TERM.fgLight : TERM.fg, whiteSpace: 'pre',
    }}>{
` 2013        2017          2021         2024     ${years[4]}
 ├─────────┼────────────┼───────────┼─────────┼
 ${bar}
 │ Mobile lead │ Architect    │ Staff       │ Principal `
    }</pre>
  );
};

const ProjectList = ({ filter, setFilter, light }) => {
  const tags = ['all', ...R.projectTags];
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {tags.map((t) => {
          const active = filter === t;
          return (
            <button key={t} onClick={() => setFilter(t)} style={{
              fontFamily: 'inherit', fontSize: 12,
              padding: '4px 9px',
              border: `1px solid ${light ? TERM.dimLight : TERM.dim}`,
              background: active ? (light ? TERM.fgLight : TERM.fg) : 'transparent',
              color: active ? (light ? TERM.bgLight : TERM.bg) : (light ? TERM.fgLight : TERM.fg),
              cursor: 'pointer', borderRadius: 0,
            }}>--filter={t}</button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {filtered.map((p) => (
          <div key={p.name} style={{
            border: `1px solid ${light ? TERM.dimLight : TERM.dim}`,
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontWeight: 600 }}>{p.name}/</span>
              <span style={{ fontSize: 11, color: light ? TERM.dimLight : TERM.dim }}>
                {p.tags.map((t) => `#${t}`).join(' ')}
              </span>
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: light ? TERM.fgLight : TERM.fg, opacity: 0.85 }}>
              {p.blurb}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ fontSize: 13, opacity: 0.6, padding: 10 }}>
            $ no projects matched. try --filter=all
          </div>
        )}
      </div>
    </div>
  );
};

function CommandLine({ light, setLight, jumpTo }) {
  const [history, setHistory] = React.useState([
    { kind: 'out', text: `Welcome to ~/resume. Type \`help\` for commands.` },
  ]);
  const [input, setInput] = React.useState('');
  const inputRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const cmds = {
    help: () => [
      'available commands:',
      '  whoami         — short bio',
      '  experience     — work history',
      '  skills [area]  — what i know',
      '  projects [tag] — selected projects',
      '  education      — degrees',
      '  contact        — how to reach me',
      '  theme [d|l]    — toggle theme',
      '  goto <section> — scroll to section',
      '  clear          — clear terminal',
    ],
    whoami: () => [
      `${PROFILE.name} — ${PROFILE.title}`,
      `${PROFILE.location}`,
      `started in mathematics. learned to program. now i take things apart for a living.`,
    ],
    experience: () => EXPERIENCE.flatMap((e) => [
      `${e.from}–${e.to} · ${e.role} @ ${e.co}`,
      `  ${e.detail}`,
      '',
    ]).slice(0, -1),
    skills: (arg) => {
      if (arg && SKILLS[arg]) return [`${arg}: ${SKILLS[arg].join(', ')}`];
      if (arg) return [`unknown area "${arg}". try one of: ${Object.keys(SKILLS).join(', ')}`];
      return Object.entries(SKILLS).map(([k, v]) => `${k.padEnd(22)} ${v.join(', ')}`);
    },
    projects: (arg) => {
      const list = arg ? PROJECTS.filter((p) => p.tags.includes(arg) || p.name === arg) : PROJECTS;
      if (!list.length) return [`no projects matched "${arg}"`];
      return list.map((p) => `${p.name.padEnd(14)} ${p.blurb}`);
    },
    education: () => EDUCATION.map((e) => `${e.year} · ${e.degree}, ${e.school} — ${e.note}`),
    contact: () => [
      `email     ${PROFILE.email}`,
      `github    ${PROFILE.github}`,
      `linkedin  ${PROFILE.linkedin}`,
    ],
    theme: (arg) => {
      if (arg === 'l' || arg === 'light') { setLight(true);  return ['→ light mode']; }
      if (arg === 'd' || arg === 'dark')  { setLight(false); return ['→ dark mode']; }
      setLight((v) => !v);
      return ['→ toggled'];
    },
    goto: (arg) => {
      if (!arg) return ['usage: goto <experience|skills|projects|architecture|contact>'];
      jumpTo(arg);
      return [`→ ${arg}`];
    },
    clear: () => '__clear__',
  };

  const run = (raw) => {
    const line = raw.trim();
    if (!line) return;
    const [cmd, ...rest] = line.split(/\s+/);
    const fn = cmds[cmd];
    const next = [...history, { kind: 'cmd', text: line }];
    if (!fn) {
      next.push({ kind: 'out', text: `command not found: ${cmd}. type \`help\`.` });
      setHistory(next);
      return;
    }
    const out = fn(rest.join(' '));
    if (out === '__clear__') {
      setHistory([{ kind: 'out', text: '(cleared)' }]);
      return;
    }
    (Array.isArray(out) ? out : [out]).forEach((t) => next.push({ kind: 'out', text: t }));
    setHistory(next);
  };

  const promptStr = `${PROFILE.user}@${PROFILE.host}:~$`;

  return (
    <div onClick={() => inputRef.current && inputRef.current.focus()}
      style={{
        border: `1px solid ${light ? TERM.dimLight : TERM.dim}`,
        background: light ? '#f3f1ec' : '#000',
        color: light ? TERM.fgLight : TERM.fg,
        fontFamily: 'inherit', fontSize: 13, lineHeight: 1.55,
        height: 290, display: 'flex', flexDirection: 'column', cursor: 'text',
      }}>
      <div style={{
        padding: '6px 12px', borderBottom: `1px solid ${light ? TERM.dimLight : TERM.dim}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11,
        opacity: 0.7,
      }}>
        <span>● ● ●   bash — ~/resume</span>
        <span>120×40</span>
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '10px 12px' }}>
        {history.map((h, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {h.kind === 'cmd'
              ? <><span style={{ color: light ? TERM.fgLight : TERM.fg, opacity: 0.55 }}>{promptStr}</span> {h.text}</>
              : h.text}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ opacity: 0.55 }}>{promptStr}&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { run(input); setInput(''); } }}
            spellCheck={false}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'inherit', font: 'inherit', padding: 0,
            }}
          />
          <span style={{
            width: 7, height: 14, background: light ? TERM.fgLight : TERM.fg, opacity: 0.7,
            animation: 'tterm-blink 1s steps(2) infinite', marginLeft: 1,
          }} />
        </div>
      </div>
      <style>{`@keyframes tterm-blink{50%{opacity:0}}`}</style>
    </div>
  );
}

export default function TerminalResume() {
  const [light, setLight] = React.useState(false);
  const [filter, setFilter] = React.useState('all');
  const [played, setPlayed] = React.useState(0);
  const refs = {
    experience: React.useRef(null),
    skills: React.useRef(null),
    projects: React.useRef(null),
    architecture: React.useRef(null),
    contact: React.useRef(null),
  };

  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - start) / 2200);
      setPlayed(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const jumpTo = (key) => {
    const el = refs[key] && refs[key].current;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const bg = light ? TERM.bgLight : TERM.bg;
  const fg = light ? TERM.fgLight : TERM.fg;
  const dim = light ? TERM.dimLight : TERM.dim;

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: bg, color: fg,
      fontFamily: '"JetBrains Mono", "SFMono-Regular", Menlo, monospace',
      fontSize: 13, lineHeight: 1.55,
      padding: '36px 44px 56px',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, opacity: 0.65, marginBottom: 24, borderBottom: `1px dashed ${dim}`, paddingBottom: 10 }}>
        <span>~/resume · main · adrian@circuitly</span>
        <span style={{ display: 'flex', gap: 14 }}>
          <button onClick={() => setLight((v) => !v)} style={{
            background: 'transparent', border: `1px solid ${dim}`, color: fg,
            fontFamily: 'inherit', fontSize: 11, padding: '2px 8px', cursor: 'pointer',
          }}>
            [{light ? 'L' : 'D'}] theme:{light ? 'light' : 'dark'}
          </button>
          <span>{new Date().toISOString().slice(0,10)}</span>
        </span>
      </div>

      <Banner light={light} />

      <div style={{ marginTop: 14, marginBottom: 22 }}>
        <div style={{ fontSize: 14 }}>
          <span style={{ opacity: 0.55 }}>$ cat about.txt</span>
        </div>
        <div style={{ marginTop: 6, maxWidth: 720 }}>
          {R.about.long} {R.about.witty}
        </div>
      </div>

      <CommandLine light={light} setLight={setLight} jumpTo={jumpTo} />

      <section ref={refs.experience} style={{ marginTop: 36 }}>
        <Heading dim={dim} num="01" title="experience" cmd="cat experience.log" />
        <div style={{ marginTop: 14, display: 'grid', gap: 16 }}>
          {EXPERIENCE.map((e) => (
            <div key={`${e.co}-${e.from}`} style={{ borderLeft: `2px solid ${fg}`, paddingLeft: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600 }}>{e.role} @ {e.co}</span>
                <span style={{ color: dim, fontSize: 12 }}>{e.from} → {e.to}</span>
              </div>
              <div style={{ marginTop: 6, opacity: 0.85 }}>{e.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <Heading dim={dim} num="02" title="timeline" cmd="./timeline --animate" />
        <div style={{ marginTop: 14 }}>
          <AsciiTimeline light={light} played={played} />
          <button onClick={() => setPlayed(0)} style={{
            marginTop: 10, background: 'transparent', border: `1px solid ${dim}`, color: fg,
            fontFamily: 'inherit', fontSize: 11, padding: '3px 9px', cursor: 'pointer',
          }}>▷ replay</button>
        </div>
      </section>

      <section ref={refs.skills} style={{ marginTop: 36 }}>
        <Heading dim={dim} num="03" title="skills" cmd="ls ~/skills" />
        <div style={{ marginTop: 14, display: 'grid', gap: 6 }}>
          {Object.entries(SKILLS).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 14 }}>
              <span style={{ width: 180, color: dim }}>{k}/</span>
              <span>{v.join('  ')}</span>
            </div>
          ))}
        </div>
      </section>

      <section ref={refs.architecture} style={{ marginTop: 36 }}>
        <Heading dim={dim} num="04" title="architecture" cmd="cat ~/systems/canonical.txt" />
        <div style={{ marginTop: 14, padding: 16, overflow: 'auto', border: `1px solid ${dim}` }}>
          <AsciiArch light={light} />
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: dim }}>
          {'// one of the dozen-or-so distributed systems I’ve drawn on a whiteboard at 11pm.'}
        </div>
      </section>

      <section ref={refs.projects} style={{ marginTop: 36 }}>
        <Heading dim={dim} num="05" title="projects" cmd="grep -r open-source ~/" />
        <div style={{ marginTop: 14 }}>
          <ProjectList filter={filter} setFilter={setFilter} light={light} />
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <Heading dim={dim} num="06" title="education" cmd="cat education.txt" />
        <div style={{ marginTop: 14 }}>
          {EDUCATION.map((e) => (
            <div key={e.school}>
              <div style={{ fontWeight: 600 }}>{e.degree} · {e.school}</div>
              {e.year && <div style={{ color: dim, fontSize: 12 }}>{e.year}</div>}
              <div style={{ marginTop: 4, opacity: 0.85 }}>{e.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section ref={refs.contact} style={{ marginTop: 36 }}>
        <Heading dim={dim} num="07" title="contact" cmd="cat ~/.contact" />
        <div style={{ marginTop: 14, display: 'grid', gap: 6 }}>
          <div><span style={{ color: dim }}>email     </span>{PROFILE.email}</div>
          <div><span style={{ color: dim }}>github    </span>{PROFILE.github}</div>
          <div><span style={{ color: dim }}>linkedin  </span>{PROFILE.linkedin}</div>
        </div>
      </section>

      <div style={{ marginTop: 50, fontSize: 11, color: dim, borderTop: `1px dashed ${dim}`, paddingTop: 14 }}>
        {'$ echo "thanks for reading. now type `help` in the terminal above." > /dev/null'}
      </div>
    </div>
  );
}

function Heading({ dim, num, title, cmd }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: dim, marginBottom: 4 }}>
        <span style={{ opacity: 0.55 }}>$ </span>{cmd}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, borderBottom: `1px solid ${dim}`, paddingBottom: 6 }}>
        <span style={{ color: dim, fontSize: 12 }}>[{num}]</span>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.2 }}>{title}</span>
      </div>
    </div>
  );
}
