import React from 'react';
import D from '../data/resume.js';
import { SchemRequest, SchemDataflow, SchemDeployment, SchemOnCall } from './RFCSchematics.jsx';
import { TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle } from './TweaksPanel.jsx';
import { useTweaks } from './useTweaks.js';

const RFC_DEFAULTS = {
  density: 'comfortable',
  abstractCols: 2,
  headline: 0,
  dark: false,
};

const RFC_PALETTE = {
  light: {
    bg: '#fdfcf6',
    fg: '#0c0c0a',
    rule: '#0c0c0a',
    dim: '#6a675f',
    faint: '#cfcbc0',
    paper: '#f4f1e8',
  },
  dark: {
    bg: '#0c0c0a',
    fg: '#e8e6dd',
    rule: '#e8e6dd',
    dim: '#807c72',
    faint: '#2a2a26',
    paper: '#171612',
  },
};

const DENSITIES = {
  compact: { body: 13, lh: 1.45, gapY: 30, padX: 56, h1: 56, abstract: 13.5, table: 11.5 },
  comfortable: { body: 15, lh: 1.55, gapY: 44, padX: 64, h1: 72, abstract: 15.5, table: 12.5 },
  airy: { body: 16.5, lh: 1.7, gapY: 60, padX: 80, h1: 88, abstract: 17, table: 13.5 },
};

const SECTIONS = [
  ['abstract', 'Abstract'],
  ['introduction', '1.  Introduction'],
  ['history', '2.  Operational History'],
  ['timeline', '3.  Career Timeline'],
  ['capability', '4.  Capability Matrix'],
  ['reference', '5.  Reference Architecture'],
  ['dataflow', '6.  Data Flow & Change Capture'],
  ['deployment', '7.  Deployment Topology'],
  ['oncall', '8.  On-Call Protocol'],
  ['output', '9.  Selected Output'],
  ['public', '10.  Public Source'],
  ['education', '11.  Education'],
  ['contact', '12.  Contact Endpoints'],
];

export default function RFCSpec() {
  const [t, setTweak] = useTweaks(RFC_DEFAULTS);
  const [filter, setFilter] = React.useState('all');
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [rawOpen, setRawOpen] = React.useState(false);

  const P = t.dark ? RFC_PALETTE.dark : RFC_PALETTE.light;
  const D_ = DENSITIES[t.density] || DENSITIES.comfortable;

  const [pan, setPan] = React.useState({ x: 0, y: 0, k: 1 });
  const draggingRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      const editing =
        e.target && (e.target.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setRawOpen(false);
        return;
      }
      if (editing) return;
      if (e.key === '/') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key.toLowerCase() === 'r') {
        setRawOpen((v) => !v);
      }
      if (e.key.toLowerCase() === 'd' && !e.metaKey && !e.ctrlKey) {
        setTweak('dark', !t.dark);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [t.dark, setTweak]);

  const allTags = ['all', ...Array.from(new Set(D.projects.flatMap((p) => p.tags)))];
  const filteredProjects =
    filter === 'all' ? D.projects : D.projects.filter((p) => p.tags.includes(filter));
  const headline = D.headlines[t.headline % D.headlines.length];

  const jumpTo = (id) => {
    const el = document.getElementById(`sect-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPaletteOpen(false);
  };

  React.useEffect(() => {
    if (document.getElementById('rfc-spec-styles')) return;
    const s = document.createElement('style');
    s.id = 'rfc-spec-styles';
    s.textContent = `
      .rfc-doc{font-family:"IBM Plex Serif", "Lyon Text", Charter, Georgia, serif;
        hanging-punctuation:first allow-end;
        font-feature-settings:"onum","liga","kern";
        -webkit-font-smoothing:antialiased;
        text-rendering:optimizeLegibility;}
      .rfc-doc p, .rfc-doc li { text-wrap: pretty; }
      .rfc-doc h1, .rfc-doc h2, .rfc-doc h3 { text-wrap: balance; }
      .rfc-mono{font-family:"IBM Plex Mono","JetBrains Mono",ui-monospace,monospace;}
      .rfc-link{color:inherit; text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:.5px;}
      .rfc-link:hover{text-decoration-thickness:1.5px;}
      .rfc-sup{font-size:.6em; vertical-align:super; margin-left:1px; font-feature-settings:"sups";}
      .rfc-toc a{color:inherit;text-decoration:none;display:block;padding:3px 8px;border-radius:3px;}
      .rfc-toc a:hover{background:rgba(0,0,0,.06);}
      .rfc-toc.dark a:hover{background:rgba(255,255,255,.06);}
      .rfc-code{white-space:pre;overflow-x:auto;padding:14px 16px;border:.5px solid currentColor;
        font-family:"IBM Plex Mono",monospace;font-size:12px;line-height:1.55;}
      .rfc-pill{display:inline-block;border:.5px solid currentColor;padding:1px 7px;border-radius:0;
        font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.04em;margin:0 4px 4px 0;text-transform:uppercase;}
      .rfc-marker{position:absolute;left:-72px;width:60px;text-align:right;font-family:"IBM Plex Mono",monospace;
        font-size:10px;letter-spacing:.05em;text-transform:uppercase;opacity:.55;line-height:1.4;}
      @media (max-width:1100px){.rfc-marker{display:none;}}
    `;
    document.head.appendChild(s);
  }, []);

  if (rawOpen) {
    return <RawView P={P} onClose={() => setRawOpen(false)} />;
  }

  return (
    <div
      className={`rfc-doc ${t.dark ? 'dark' : ''}`}
      style={{
        background: P.bg,
        color: P.fg,
        minHeight: '100vh',
        fontSize: D_.body,
        lineHeight: D_.lh,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 22px',
          borderBottom: `.5px solid ${P.rule}`,
          background: P.bg,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 11,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              border: `.5px solid ${P.rule}`,
              fontWeight: 700,
            }}
          >
            {D.monogram}
          </span>
          <span style={{ fontWeight: 600 }}>{D.name}</span>
          <span style={{ opacity: 0.6 }}>· RFC-2026</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={() => setPaletteOpen(true)} style={tbBtn(P)}>
            ⌘K · jump
          </button>
          <button onClick={() => setRawOpen(true)} style={tbBtn(P)}>
            view raw
          </button>
          <button onClick={() => setTweak('dark', !t.dark)} style={tbBtn(P)}>
            {t.dark ? 'light' : 'dark'}
          </button>
          <a href="/explorations.html" style={{ ...tbBtn(P), textDecoration: 'none' }}>
            ↗ explorations
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '180px minmax(0, 1fr)', gap: 0 }}>
        <aside
          style={{
            padding: `${D_.gapY}px 8px ${D_.gapY}px ${D_.padX / 2}px`,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 11,
            letterSpacing: 0.3,
            color: P.dim,
            position: 'sticky',
            top: 49,
            alignSelf: 'flex-start',
            maxHeight: 'calc(100vh - 49px)',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              marginBottom: 8,
              opacity: 0.7,
            }}
          >
            Contents
          </div>
          <div className={`rfc-toc ${t.dark ? 'dark' : ''}`}>
            {SECTIONS.map(([id, title]) => (
              <a
                key={id}
                href={`#sect-${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  jumpTo(id);
                }}
              >
                {title}
              </a>
            ))}
          </div>
        </aside>

        <main style={{ padding: `${D_.gapY}px ${D_.padX}px ${D_.gapY * 2}px`, maxWidth: 980 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 4,
              marginBottom: D_.gapY,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 11,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              color: P.dim,
              borderTop: `1px solid ${P.rule}`,
              borderBottom: `1px solid ${P.rule}`,
              padding: '14px 0',
            }}
          >
            <div>Document &nbsp;·&nbsp; RFC-2026</div>
            <div style={{ textAlign: 'right' }}>
              Category &nbsp;·&nbsp; Career — Standards Track
            </div>
            <div>Author &nbsp;·&nbsp; {D.name}</div>
            <div style={{ textAlign: 'right' }}>Affiliation &nbsp;·&nbsp; {D.company}</div>
            <div>Updated &nbsp;·&nbsp; May 2026</div>
            <div style={{ textAlign: 'right' }}>Distribution &nbsp;·&nbsp; Unlimited</div>
          </div>

          <div style={{ marginBottom: D_.gapY }}>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: P.dim,
                marginBottom: 18,
              }}
            >
              A specification for one (1) Principal Engineer
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: D_.h1,
                fontWeight: 400,
                letterSpacing: -1.2,
                lineHeight: 0.98,
                fontFamily: '"IBM Plex Serif", Georgia, serif',
                fontStyle: 'italic',
                whiteSpace: 'pre-line',
                textWrap: 'balance',
              }}
            >
              {headline}
            </h1>
            <div
              style={{
                marginTop: 22,
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11,
                color: P.dim,
                letterSpacing: 0.5,
              }}
            >
              {D.title.toUpperCase()} @ {D.company.toUpperCase()} &nbsp;·&nbsp; {D.years} YEARS
              &nbsp;·&nbsp; {D.location.toUpperCase()}
            </div>
          </div>

          <Section id="abstract" num="" title="Abstract" P={P} D_={D_}>
            <p
              style={{
                margin: 0,
                fontSize: D_.abstract,
                lineHeight: D_.lh,
                columnCount: t.abstractCols,
                columnGap: 32,
                textWrap: 'pretty',
              }}
            >
              This document specifies the professional history, technical capabilities, and notable
              outputs of one (1) Principal Engineer. The author began in mathematics, discovered
              that the best application of math was computer science, and has spent the subsequent{' '}
              {D.years} years building things that take apart and put themselves back together —
              real-time collaboration platforms, backends serving millions of readers, mobile apps
              that unlock front doors, and most recently an AI-assisted circuit-design system.
              Implementations MUST tolerate ambiguity, SHOULD ship to production, and MAY contain
              wit.
            </p>
          </Section>

          <Section id="introduction" num="1." title="Introduction" P={P} D_={D_}>
            <p style={{ margin: 0, fontSize: D_.body, lineHeight: D_.lh, maxWidth: 720 }}>
              The author is a <em>Principal Engineer</em> currently at {D.company}, where
              mathematics, software, and electrons all meet at the same standup. The career
              described herein spans mobile (front doors, speakers, ads), platform engineering
              (Medium, Projector), and now AI-augmented design tooling. This document is the
              canonical reference. Where it conflicts with the author’s LinkedIn profile, this
              document MUST be considered authoritative.<sup className="rfc-sup">[1]</sup>
            </p>
            <pre
              className="rfc-code"
              style={{ marginTop: 22, background: P.paper, color: P.fg, borderColor: P.rule }}
            >
              {D.snippets.bio}
            </pre>
          </Section>

          <Section id="history" num="2." title="Operational History" P={P} D_={D_}>
            <ExperienceTable P={P} D_={D_} />
          </Section>

          <Section id="timeline" num="3." title="Career Timeline" P={P} D_={D_}>
            <Timeline P={P} />
            <Caption P={P}>
              Fig. 0 — Title progression vs. year. The slope is not the point.
            </Caption>
          </Section>

          <Section id="capability" num="4." title="Capability Matrix" P={P} D_={D_}>
            <CapabilityMatrix P={P} D_={D_} />
          </Section>

          <Section id="reference" num="5." title="Reference Architecture" P={P} D_={D_}>
            <PanZoom pan={pan} setPan={setPan} draggingRef={draggingRef} P={P}>
              <SchemRequest fg={P.fg} dim={P.dim} />
            </PanZoom>
            <Caption P={P}>
              {D.schematics.request.title} — {D.schematics.request.caption}
            </Caption>
          </Section>

          <Section id="dataflow" num="6." title="Data Flow & Change Capture" P={P} D_={D_}>
            <div
              style={{
                border: `.5px solid ${P.rule}`,
                padding: 16,
                overflowX: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            >
              <SchemDataflow fg={P.fg} dim={P.dim} />
            </div>
            <Caption P={P}>
              {D.schematics.dataflow.title} — {D.schematics.dataflow.caption}
            </Caption>
          </Section>

          <Section id="deployment" num="7." title="Deployment Topology" P={P} D_={D_}>
            <div
              style={{
                border: `.5px solid ${P.rule}`,
                padding: 16,
                overflowX: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            >
              <SchemDeployment fg={P.fg} dim={P.dim} />
            </div>
            <Caption P={P}>
              {D.schematics.deployment.title} — {D.schematics.deployment.caption}
            </Caption>
          </Section>

          <Section id="oncall" num="8." title="On-Call Protocol" P={P} D_={D_}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 22,
                alignItems: 'start',
              }}
            >
              <div
                style={{
                  border: `.5px solid ${P.rule}`,
                  padding: 12,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <SchemOnCall fg={P.fg} dim={P.dim} />
              </div>
              <pre
                className="rfc-code"
                style={{ background: P.paper, color: P.fg, borderColor: P.rule, margin: 0 }}
              >
                {D.snippets.onCall}
              </pre>
            </div>
            <Caption P={P}>
              {D.schematics.onCall.title} — {D.schematics.onCall.caption}
            </Caption>
          </Section>

          <Section id="output" num="9." title="Selected Output" P={P} D_={D_}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginBottom: 14,
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11,
              }}
            >
              <span
                style={{
                  color: P.dim,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  padding: '4px 0',
                }}
              >
                FILTER:
              </span>
              {allTags.map((tag) => {
                const on = filter === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    style={{
                      fontFamily: 'inherit',
                      fontSize: 11,
                      padding: '3px 8px',
                      borderRadius: 0,
                      cursor: 'pointer',
                      border: `.5px solid ${P.rule}`,
                      background: on ? P.fg : 'transparent',
                      color: on ? P.bg : P.fg,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            <ProjectTable filtered={filteredProjects} P={P} D_={D_} />
            <pre
              className="rfc-code"
              style={{ marginTop: 22, background: P.paper, color: P.fg, borderColor: P.rule }}
            >
              {D.snippets.api}
            </pre>
            <Caption P={P}>
              Listing 9.1 — Idempotent net creation. Production code is similar in spirit, less
              terse.
            </Caption>
          </Section>

          <Section id="public" num="10." title="Public Source" P={P} D_={D_}>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: D_.body,
                lineHeight: D_.lh,
                maxWidth: 720,
                color: P.dim,
              }}
            >
              Side projects on{' '}
              <a
                className="rfc-link"
                href={`https://${D.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {D.github}
              </a>
              . These are mostly small things written in the gaps — Alexa skills, Android trackers,
              Objective-C utilities. They are not the main act; they are evidence of curiosity.
            </p>
            <OssList P={P} D_={D_} />
          </Section>

          <Section id="education" num="11." title="Education" P={P} D_={D_}>
            <div style={{ fontSize: D_.body, lineHeight: D_.lh }}>
              <strong>{D.education[0].degree}</strong>, {D.education[0].school}.<br />
              <span style={{ color: P.dim }}>{D.education[0].note}</span>
            </div>
          </Section>

          <Section id="contact" num="12." title="Contact Endpoints" P={P} D_={D_}>
            <table className="rfc-mono" style={{ borderCollapse: 'collapse', fontSize: 12.5 }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 28px 5px 0', color: P.dim }}>EMAIL</td>
                  <td>{D.email}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 28px 5px 0', color: P.dim }}>GITHUB</td>
                  <td>
                    <a className="rfc-link" href={`https://${D.github}`}>
                      {D.github}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 28px 5px 0', color: P.dim }}>WEBSITE</td>
                  <td>
                    <a className="rfc-link" href={`https://${D.website}`}>
                      {D.website}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 28px 5px 0', color: P.dim }}>LINKEDIN</td>
                  <td>
                    <a className="rfc-link" href={`https://${D.linkedin}`}>
                      {D.linkedin}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 28px 5px 0', color: P.dim }}>SLA</td>
                  <td>response within 1 business day (best-effort)</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Footer P={P} D_={D_} />
        </main>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'comfortable', 'airy']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakRadio
          label="Abstract"
          value={String(t.abstractCols)}
          options={['1', '2']}
          onChange={(v) => setTweak('abstractCols', parseInt(v, 10))}
        />
        <TweakSection label="Headline" />
        <TweakSelect
          label="Variant"
          value={String(t.headline)}
          options={D.headlines.map((h, i) => ({
            value: String(i),
            label: h.split('\n').join(' ').slice(0, 40) + '…',
          }))}
          onChange={(v) => setTweak('headline', parseInt(v, 10))}
        />
        <TweakSection label="Theme" />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak('dark', v)} />
      </TweaksPanel>

      {paletteOpen && (
        <CommandPalette
          sections={SECTIONS}
          onPick={jumpTo}
          onClose={() => setPaletteOpen(false)}
          P={P}
          toggleTheme={() => setTweak('dark', !t.dark)}
          openRaw={() => {
            setRawOpen(true);
            setPaletteOpen(false);
          }}
        />
      )}
    </div>
  );
}

function tbBtn(P) {
  return {
    fontFamily: 'inherit',
    fontSize: 11,
    padding: '4px 9px',
    cursor: 'pointer',
    background: 'transparent',
    border: `.5px solid ${P.rule}`,
    color: P.fg,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  };
}

function Section({ id, num, title, P, D_, children }) {
  return (
    <section
      id={`sect-${id}`}
      style={{ marginTop: D_.gapY, scrollMarginTop: 80, position: 'relative' }}
    >
      <div className="rfc-marker">§ {num || '—'}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 14,
          borderBottom: `1px solid ${P.rule}`,
          paddingBottom: 6,
          marginBottom: 14,
          fontFamily: '"IBM Plex Mono", monospace',
          textTransform: 'uppercase',
          letterSpacing: 0.7,
        }}
      >
        <span style={{ fontSize: 11, color: P.dim, minWidth: 28 }}>{num}</span>
        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{title}</span>
      </div>
      {children}
    </section>
  );
}

function Caption({ P, children }) {
  return (
    <div
      style={{
        marginTop: 10,
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 12,
        color: P.dim,
      }}
    >
      {children}
    </div>
  );
}

function Footer({ P, D_ }) {
  return (
    <div
      style={{
        marginTop: D_.gapY * 1.5,
        paddingTop: 22,
        borderTop: `1px solid ${P.rule}`,
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: 10.5,
        color: P.dim,
        letterSpacing: 0.3,
      }}
    >
      <div style={{ marginBottom: 14, fontStyle: 'normal' }}>
        <strong
          style={{ color: P.fg, textTransform: 'uppercase', fontSize: 10.5, letterSpacing: 0.5 }}
        >
          Footnotes
        </strong>
        <div style={{ marginTop: 8 }}>
          [1] The author’s LinkedIn profile is, however, more frequently updated than this document.
        </div>
        <div style={{ marginTop: 4 }}>
          [2] “Idempotency” is the closest thing the author has to a religion.
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <strong
          style={{ color: P.fg, textTransform: 'uppercase', fontSize: 10.5, letterSpacing: 0.5 }}
        >
          Achievements (per the registry)
        </strong>
        <div style={{ marginTop: 8 }}>
          {D.achievements.map(([n, lbl]) => (
            <span key={lbl} style={{ marginRight: 14 }}>
              <span style={{ color: P.fg }}>{n}</span> &nbsp;{lbl}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>RFC-2026 · {D.name} · Standards Track · Set in IBM Plex Serif &amp; Mono.</span>
        <span>
          Press <kbd style={kbd(P)}>⌘K</kbd> to jump · <kbd style={kbd(P)}>R</kbd> raw ·{' '}
          <kbd style={kbd(P)}>D</kbd> dark.
        </span>
      </div>
    </div>
  );
}

function kbd(P) {
  return {
    fontFamily: 'inherit',
    border: `.5px solid ${P.rule}`,
    padding: '0 4px',
    borderRadius: 2,
    fontSize: 10,
  };
}

function ExperienceTable({ P, D_ }) {
  return (
    <div style={{ borderTop: `.5px solid ${P.rule}` }}>
      {D.experience.map((e, i) => (
        <div
          key={`${e.co}-${e.from}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            gap: 28,
            padding: '20px 0',
            borderBottom: `.5px solid ${P.rule}`,
            alignItems: 'start',
          }}
        >
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 11.5,
              color: P.dim,
              letterSpacing: 0.2,
            }}
          >
            <div style={{ color: P.fg, fontWeight: 600 }}>{e.fromYear}</div>
            <div>—{e.toYear === 2026 && e.to === 'now' ? 'now' : e.toYear}</div>
            <div
              style={{ marginTop: 6, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}
            >
              {String(D.experience.length - i).padStart(2, '0')} /{' '}
              {String(D.experience.length).padStart(2, '0')}
            </div>
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div>
                <span style={{ fontWeight: 600, fontSize: D_.body + 2 }}>{e.role}</span>
                <span style={{ color: P.dim, fontStyle: 'italic' }}> @ {e.co}</span>
              </div>
              <span
                style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10.5, color: P.dim }}
              >
                {e.from} — {e.to === 'now' ? 'pres.' : e.to}
              </span>
            </div>
            <div style={{ marginTop: 4, color: P.dim, fontStyle: 'italic' }}>{e.short}</div>
            {e.wins && e.wins.length > 0 && (
              <ul
                style={{
                  margin: '10px 0 0',
                  paddingLeft: 18,
                  fontSize: D_.body,
                  lineHeight: D_.lh,
                }}
              >
                {e.wins.map((w, j) => (
                  <li key={j} style={{ marginBottom: 4 }}>
                    {w}
                  </li>
                ))}
              </ul>
            )}
            {e.stack && e.stack.length > 0 && (
              <div style={{ marginTop: 10, color: P.fg }}>
                {e.stack.map((s) => (
                  <span key={s} className="rfc-pill" style={{ color: P.fg }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CapabilityMatrix({ P, D_ }) {
  const rows = [
    ['Languages', D.skills.languages.join(', ')],
    ['Distributed', D.skills.distributed.join(', ')],
    ['Backend', D.skills.backend.join(', ')],
    ['Mobile', D.skills.mobile.join(', ')],
    ['Domains', D.skills.domains.join(', ')],
    ['Tools', D.skills.tools.join(', ')],
  ];
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: D_.table,
      }}
    >
      <tbody>
        {rows.map(([k, v], i) => (
          <tr
            key={k}
            style={{ borderBottom: i < rows.length - 1 ? `.5px dotted ${P.dim}` : 'none' }}
          >
            <td
              style={{
                padding: '12px 16px 12px 0',
                width: 200,
                verticalAlign: 'top',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: P.dim,
                fontSize: D_.table - 1,
              }}
            >
              {`§4.${i + 1}`} &nbsp; {k}
            </td>
            <td style={{ padding: '12px 0' }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Timeline({ P }) {
  const { from: minY, to: maxY } = D.timelineRange;
  const span = maxY - minY;
  const ticks = [];
  for (let y = minY; y <= maxY; y += 2) ticks.push(y);
  const markers = D.timelineBands;
  const pct = (y) => `${((y - minY) / span) * 100}%`;

  return (
    <div
      style={{
        position: 'relative',
        height: 110,
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: 11,
      }}
    >
      <div
        style={{ position: 'absolute', top: 50, left: 0, right: 0, height: 1, background: P.rule }}
      />
      {ticks.map((y) => (
        <div
          key={y}
          style={{ position: 'absolute', left: pct(y), top: 46, transform: 'translateX(-50%)' }}
        >
          <div style={{ width: 1, height: 8, background: P.rule }} />
          <div style={{ marginTop: 4, color: P.dim }}>{y}</div>
        </div>
      ))}
      {markers.map((m, i) => {
        const next = markers[i + 1];
        const w = next
          ? `calc(${pct(next.year)} - ${pct(m.year)})`
          : `calc(${pct(maxY)} - ${pct(m.year)})`;
        return (
          <React.Fragment key={m.year}>
            <div
              style={{
                position: 'absolute',
                left: pct(m.year),
                top: 30,
                height: 6,
                width: w,
                background: P.fg,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: pct(m.year),
                top: 8,
                transform: 'translateX(-50%)',
                color: P.fg,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {m.role}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function PanZoom({ pan, setPan, draggingRef, P, children }) {
  const [isDragging, setIsDragging] = React.useState(false);
  return (
    <div
      style={{
        border: `.5px solid ${P.rule}`,
        position: 'relative',
        height: 360,
        overflow: 'hidden',
        background: P.bg,
        color: P.fg,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      onWheel={(e) => {
        e.preventDefault();
        const r = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - r.left,
          py = e.clientY - r.top;
        setPan((p) => {
          const k = Math.max(0.4, Math.min(3, p.k * Math.exp(-e.deltaY * 0.001)));
          const ratio = k / p.k;
          return { k, x: px - (px - p.x) * ratio, y: py - (py - p.y) * ratio };
        });
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        draggingRef.current = { x: e.clientX, y: e.clientY };
        setIsDragging(true);
      }}
      onPointerMove={(e) => {
        if (!draggingRef.current) return;
        const dx = e.clientX - draggingRef.current.x,
          dy = e.clientY - draggingRef.current.y;
        draggingRef.current = { x: e.clientX, y: e.clientY };
        setPan((p) => ({ ...p, x: p.x + dx, y: p.y + dy }));
      }}
      onPointerUp={(e) => {
        draggingRef.current = null;
        setIsDragging(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => {
        draggingRef.current = null;
        setIsDragging(false);
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${pan.k})`,
          transformOrigin: '0 0',
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 10,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 10,
          color: P.dim,
          background: P.bg,
          padding: '3px 7px',
          border: `.5px solid ${P.rule}`,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <span>{Math.round(pan.k * 100)}%</span>
        <button
          onClick={() => setPan({ x: 0, y: 0, k: 1 })}
          style={{
            all: 'unset',
            cursor: 'pointer',
            borderBottom: `1px solid ${P.fg}`,
            color: P.fg,
          }}
        >
          reset
        </button>
        <span style={{ opacity: 0.6 }}>· drag / scroll to zoom</span>
      </div>
    </div>
  );
}

function ProjectTable({ filtered, P, D_ }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: D_.body }}>
      <thead>
        <tr
          style={{
            borderBottom: `1px solid ${P.rule}`,
            textAlign: 'left',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10.5,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            color: P.dim,
          }}
        >
          <th style={{ padding: '7px 8px 7px 0', fontWeight: 500, width: 160 }}>Name</th>
          <th style={{ padding: '7px 8px', fontWeight: 500, width: 70 }}>Year</th>
          <th style={{ padding: '7px 8px', fontWeight: 500, width: 130 }}>Scale</th>
          <th style={{ padding: '7px 0 7px 8px', fontWeight: 500 }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((p, i) => (
          <tr
            key={p.name}
            style={{ borderBottom: i < filtered.length - 1 ? `.5px dotted ${P.dim}` : 'none' }}
          >
            <td
              style={{
                padding: '11px 8px 11px 0',
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
              }}
            >
              {p.name}
            </td>
            <td
              style={{
                padding: '11px 8px',
                fontFamily: '"IBM Plex Mono", monospace',
                color: P.dim,
              }}
            >
              {p.year}
            </td>
            <td
              style={{
                padding: '11px 8px',
                fontFamily: '"IBM Plex Mono", monospace',
                color: P.dim,
              }}
            >
              {p.scale}
            </td>
            <td style={{ padding: '11px 0 11px 8px' }}>{p.blurb}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function OssList({ P, D_ }) {
  return (
    <table
      style={{ width: '100%', borderCollapse: 'collapse', fontSize: D_.body - 1, marginTop: 6 }}
    >
      <tbody>
        {D.oss.map((p, i) => (
          <tr
            key={p.name}
            style={{
              borderTop: `.5px dotted ${P.dim}`,
              borderBottom: i === D.oss.length - 1 ? `.5px dotted ${P.dim}` : 'none',
            }}
          >
            <td
              style={{
                padding: '10px 8px 10px 0',
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                width: 220,
              }}
            >
              {p.name}
            </td>
            <td
              style={{
                padding: '10px 8px',
                fontFamily: '"IBM Plex Mono", monospace',
                color: P.dim,
                width: 80,
              }}
            >
              {p.lang}
            </td>
            <td style={{ padding: '10px 0 10px 8px' }}>{p.blurb}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CommandPalette({ sections, onPick, onClose, P, toggleTheme, openRaw }) {
  const [q, setQ] = React.useState('');
  const ref = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    ref.current && ref.current.focus();
  }, []);

  const items = [
    ...sections.map(([id, title]) => ({
      kind: 'go',
      label: `Jump to ${title}`,
      run: () => onPick(id),
    })),
    {
      kind: 'cmd',
      label: 'Toggle theme',
      run: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      kind: 'cmd',
      label: 'View raw (plain text)',
      run: () => {
        openRaw();
      },
    },
  ];
  const matched = items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.35)',
        backdropFilter: 'blur(6px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 120,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 520,
          background: P.bg,
          color: P.fg,
          border: `.5px solid ${P.rule}`,
          boxShadow: `8px 8px 0 ${P.rule}`,
          fontFamily: '"IBM Plex Mono", monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: `.5px solid ${P.rule}`,
            padding: '12px 14px',
          }}
        >
          <span style={{ color: P.dim, marginRight: 10 }}>›</span>
          <input
            ref={ref}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIdx((i) => Math.min(matched.length - 1, i + 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setIdx((i) => Math.max(0, i - 1));
              }
              if (e.key === 'Enter') {
                e.preventDefault();
                matched[idx] && matched[idx].run();
              }
            }}
            placeholder="Type to jump or run a command…"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: P.fg,
              fontFamily: 'inherit',
              fontSize: 14,
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: P.dim,
              border: `.5px solid ${P.dim}`,
              padding: '2px 6px',
            }}
          >
            ESC
          </span>
        </div>
        <div style={{ maxHeight: 320, overflow: 'auto' }}>
          {matched.map((it, i) => (
            <button
              key={i}
              onClick={it.run}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                fontFamily: 'inherit',
                fontSize: 12.5,
                background: idx === i ? 'rgba(0,0,0,.05)' : 'transparent',
                color: P.fg,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: 0.2,
              }}
              onMouseEnter={() => setIdx(i)}
            >
              <span
                style={{ color: P.dim, marginRight: 10, textTransform: 'uppercase', fontSize: 9.5 }}
              >
                {it.kind === 'go' ? 'GO' : 'RUN'}
              </span>
              {it.label}
            </button>
          ))}
          {!matched.length && (
            <div style={{ padding: '14px', fontSize: 12, color: P.dim }}>no matches</div>
          )}
        </div>
      </div>
    </div>
  );
}

function RawView({ P, onClose }) {
  const lines = [];
  const pad = (s, n) => String(s).padEnd(n, ' ');
  lines.push('RFC-2026 — A Specification for One (1) Principal Engineer');
  lines.push(`Author: ${D.name}    Affiliation: ${D.company}    Location: ${D.location}`);
  lines.push('='.repeat(72));
  lines.push('');
  lines.push('ABSTRACT');
  lines.push('-'.repeat(72));
  lines.push(
    (D.about.long + ' ' + D.about.witty)
      .match(/.{1,72}(\s|$)/g)
      .map((s) => s.trim())
      .join('\n'),
  );
  lines.push('');
  lines.push('§2  OPERATIONAL HISTORY');
  lines.push('-'.repeat(72));
  D.experience.forEach((e) => {
    lines.push(`${pad(`${e.from} — ${e.to}`, 26)} ${e.role} @ ${e.co}`);
    lines.push(`${pad('', 26)} ${e.short}`);
    (e.wins || []).forEach((w) => lines.push(`${pad('', 26)}   · ${w}`));
    if (e.stack) lines.push(`${pad('', 26)}   [ ${e.stack.join(' · ')} ]`);
    lines.push('');
  });
  lines.push('§4  CAPABILITY MATRIX');
  lines.push('-'.repeat(72));
  Object.entries(D.skills).forEach(([k, v]) => lines.push(`${pad(k, 16)} ${v.join(', ')}`));
  lines.push('');
  lines.push('§9  SELECTED OUTPUT');
  lines.push('-'.repeat(72));
  D.projects.forEach((p) => lines.push(`${pad(p.name, 16)} ${pad(p.year, 6)} ${p.blurb}`));
  lines.push('');
  lines.push('§10 PUBLIC SOURCE');
  lines.push('-'.repeat(72));
  D.oss.forEach((p) => lines.push(`${pad(p.name, 24)} ${pad(p.lang, 8)} ${p.blurb}`));
  lines.push('');
  lines.push('§11 EDUCATION');
  lines.push('-'.repeat(72));
  lines.push(`${D.education[0].degree}, ${D.education[0].school}`);
  lines.push(`  ${D.education[0].note}`);
  lines.push('');
  lines.push('§12 CONTACT');
  lines.push('-'.repeat(72));
  lines.push(`email     ${D.email}`);
  lines.push(`github    ${D.github}`);
  lines.push(`website   ${D.website}`);
  lines.push(`linkedin  ${D.linkedin}`);
  lines.push('');
  lines.push('--');
  lines.push('END · type "R" or Esc to return to formatted view.');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: P.bg,
        color: P.fg,
        zIndex: 50,
        overflow: 'auto',
        fontFamily: '"IBM Plex Mono", "JetBrains Mono", monospace',
        fontSize: 13,
        lineHeight: 1.55,
        padding: '24px 28px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: `.5px solid ${P.rule}`,
          paddingBottom: 10,
          marginBottom: 16,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        <span>RAW · plain text dump</span>
        <button
          onClick={onClose}
          style={{ all: 'unset', cursor: 'pointer', borderBottom: `1px solid ${P.fg}` }}
        >
          ← back to formatted view
        </button>
      </div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'normal' }}>
        {lines.join('\n')}
      </pre>
    </div>
  );
}
