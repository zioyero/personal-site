// SVG diagrams for the RFC: request path, data flow, deployment, on-call.
// All monochrome — fill/stroke from props. Designed to fill 100% width of
// their parent.

export const SchemRequest = ({ fg, dim }) => (
  <svg
    width="900"
    height="500"
    viewBox="0 0 900 500"
    style={{ display: 'block', maxWidth: '100%' }}
  >
    <g
      fill="none"
      stroke={fg}
      strokeWidth="1.1"
      fontFamily="'IBM Plex Mono', monospace"
      fontSize="11"
    >
      {[
        { x: 80, label: 'web app' },
        { x: 280, label: 'ios app' },
        { x: 480, label: 'cli / api' },
        { x: 680, label: 'ext webhooks' },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={30} width={140} height={36} />
          <text x={c.x + 70} y={52} fill={fg} textAnchor="middle">
            {c.label}
          </text>
        </g>
      ))}
      <path d="M 150 66 L 150 110 L 450 110 L 450 140 M 350 66 L 350 110 M 550 66 L 550 110 M 750 66 L 750 110 L 450 110" />
      <rect x={350} y={140} width={200} height={44} />
      <text x={450} y={160} fill={fg} textAnchor="middle" fontWeight="600">
        edge proxy
      </text>
      <text x={450} y={175} fill={dim} textAnchor="middle">
        authz · rate-limit · routing
      </text>
      <path d="M 450 184 L 450 220 M 150 260 L 450 220 L 450 260 L 750 260 M 150 260 L 150 280 M 450 260 L 450 280 M 750 260 L 750 280" />
      {[
        { x: 80, label: 'schematic api', sub: 'TypeScript' },
        { x: 380, label: 'solver', sub: 'Rust' },
        { x: 680, label: 'ai assist', sub: 'TypeScript' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={280} width={140} height={50} />
          <text x={s.x + 70} y={302} fill={fg} textAnchor="middle" fontWeight="600">
            {s.label}
          </text>
          <text x={s.x + 70} y={318} fill={dim} textAnchor="middle">
            ({s.sub})
          </text>
        </g>
      ))}
      <path d="M 150 330 L 150 360 M 450 330 L 450 360 M 750 330 L 750 360" />
      <rect x={250} y={360} width={400} height={36} />
      <text x={450} y={382} fill={fg} textAnchor="middle">
        event bus · redis streams
      </text>
      <path d="M 450 396 L 450 430" />
      <rect x={250} y={430} width={400} height={48} />
      <text x={450} y={452} fill={fg} textAnchor="middle" fontWeight="600">
        postgres · primary
      </text>
      <text x={450} y={468} fill={dim} textAnchor="middle">
        durable state · replicated reads
      </text>
      <text x={20} y={385} fill={dim}>
        ← CDC
      </text>
      <text x={870} y={385} fill={dim} textAnchor="end">
        retention 14d
      </text>
    </g>
  </svg>
);

export const SchemDataflow = ({ fg, dim }) => (
  <svg
    width="900"
    height="460"
    viewBox="0 0 900 460"
    style={{ display: 'block', maxWidth: '100%' }}
  >
    <defs>
      <marker id="rfc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M 0 0 L 8 4 L 0 8 z" fill={fg} />
      </marker>
    </defs>
    <g
      fill="none"
      stroke={fg}
      strokeWidth="1.1"
      fontFamily="'IBM Plex Mono', monospace"
      fontSize="11"
    >
      <text x={20} y={30} fill={dim} fontWeight="600">
        WRITE PATH
      </text>
      <rect x={20} y={50} width={140} height={42} />
      <text x={90} y={75} fill={fg} textAnchor="middle">
        client
      </text>
      <rect x={210} y={50} width={140} height={42} />
      <text x={280} y={70} fill={fg} textAnchor="middle">
        validate
      </text>
      <text x={280} y={84} fill={dim} textAnchor="middle">
        (schema, authz)
      </text>
      <rect x={400} y={50} width={140} height={42} />
      <text x={470} y={70} fill={fg} textAnchor="middle">
        append
      </text>
      <text x={470} y={84} fill={dim} textAnchor="middle">
        (WAL, durable)
      </text>
      <rect x={590} y={50} width={140} height={42} />
      <text x={660} y={70} fill={fg} textAnchor="middle">
        publish
      </text>
      <text x={660} y={84} fill={dim} textAnchor="middle">
        (redis stream)
      </text>
      <rect x={780} y={50} width={100} height={42} />
      <text x={830} y={75} fill={fg} textAnchor="middle">
        ack
      </text>
      <path d="M 160 71 L 205 71" markerEnd="url(#rfc-arrow)" />
      <path d="M 350 71 L 395 71" markerEnd="url(#rfc-arrow)" />
      <path d="M 540 71 L 585 71" markerEnd="url(#rfc-arrow)" />
      <path d="M 730 71 L 775 71" markerEnd="url(#rfc-arrow)" />

      <text x={20} y={150} fill={dim} fontWeight="600">
        CDC FANOUT
      </text>
      <rect x={400} y={170} width={140} height={42} />
      <text x={470} y={195} fill={fg} textAnchor="middle">
        cdc reader
      </text>
      <path d="M 470 92 L 470 170" markerEnd="url(#rfc-arrow)" strokeDasharray="3 3" />
      <text x={490} y={130} fill={dim}>
        change-data-capture
      </text>

      {[
        { x: 60, label: 'search index' },
        { x: 260, label: 'cache invalid.' },
        { x: 700, label: 'analytics' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={250} width={150} height={42} />
          <text x={s.x + 75} y={275} fill={fg} textAnchor="middle">
            {s.label}
          </text>
        </g>
      ))}
      <path d="M 470 212 L 135 250" markerEnd="url(#rfc-arrow)" />
      <path d="M 470 212 L 335 250" markerEnd="url(#rfc-arrow)" />
      <path d="M 470 212 L 775 250" markerEnd="url(#rfc-arrow)" />

      <text x={20} y={335} fill={dim} fontWeight="600">
        READ PATH
      </text>
      <rect x={20} y={355} width={140} height={42} />
      <text x={90} y={380} fill={fg} textAnchor="middle">
        client
      </text>
      <rect x={210} y={355} width={170} height={42} />
      <text x={295} y={375} fill={fg} textAnchor="middle">
        cache lookup
      </text>
      <text x={295} y={389} fill={dim} textAnchor="middle">
        (memcache · redis)
      </text>
      <rect x={430} y={355} width={140} height={42} />
      <text x={500} y={375} fill={fg} textAnchor="middle">
        replica
      </text>
      <text x={500} y={389} fill={dim} textAnchor="middle">
        (read-only)
      </text>
      <rect x={620} y={355} width={140} height={42} />
      <text x={690} y={375} fill={fg} textAnchor="middle">
        primary
      </text>
      <text x={690} y={389} fill={dim} textAnchor="middle">
        (strict reads)
      </text>
      <path d="M 160 376 L 205 376" markerEnd="url(#rfc-arrow)" />
      <path d="M 380 376 L 425 376" markerEnd="url(#rfc-arrow)" strokeDasharray="3 3" />
      <path d="M 570 376 L 615 376" markerEnd="url(#rfc-arrow)" strokeDasharray="3 3" />

      <text x={880} y={420} fill={dim} textAnchor="end">
        ↳ p99 &lt; 30ms · cache hit
      </text>
      <text x={880} y={440} fill={dim} textAnchor="end">
        ↳ p99 &lt; 90ms · replica miss
      </text>
    </g>
  </svg>
);

export const SchemDeployment = ({ fg, dim }) => (
  <svg
    width="900"
    height="440"
    viewBox="0 0 900 440"
    style={{ display: 'block', maxWidth: '100%' }}
  >
    <defs>
      <marker id="rfc-arrow-d" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M 0 0 L 8 4 L 0 8 z" fill={fg} />
      </marker>
    </defs>
    <g
      fill="none"
      stroke={fg}
      strokeWidth="1.1"
      fontFamily="'IBM Plex Mono', monospace"
      fontSize="11"
    >
      <text x={20} y={30} fill={dim} fontWeight="600">
        REGION us-east-1
      </text>
      <text x={460} y={30} fill={dim} fontWeight="600">
        REGION us-west-2
      </text>
      {[0, 460].map((dx, ri) => (
        <g key={ri} transform={`translate(${dx}, 50)`}>
          <rect x={0} y={0} width={400} height={360} strokeDasharray="4 4" />
          {[0, 1, 2].map((ci) => (
            <g key={ci} transform={`translate(${20 + ci * 125}, 30)`}>
              <rect x={0} y={0} width={110} height={300} />
              <text x={55} y={20} fill={fg} textAnchor="middle" fontWeight="600">
                cell {ri === 0 ? 'A' : 'D'}
                {ci + 1}
              </text>
              <line x1={10} y1={32} x2={100} y2={32} stroke={dim} />
              {['api', 'worker', 'cache', 'queue', 'state'].map((s, si) => (
                <g key={s} transform={`translate(0, ${50 + si * 42})`}>
                  <rect x={10} y={0} width={90} height={28} />
                  <text x={55} y={18} fill={fg} textAnchor="middle">
                    {s}
                  </text>
                </g>
              ))}
            </g>
          ))}
          <text x={200} y={350} fill={dim} textAnchor="middle">
            blast radius bounded by cell · failover = drain cell
          </text>
        </g>
      ))}
      <path d="M 420 230 L 460 230" markerEnd="url(#rfc-arrow-d)" strokeDasharray="4 4" />
      <text x={440} y={220} fill={dim} textAnchor="middle">
        async repl.
      </text>
    </g>
  </svg>
);

export const SchemOnCall = ({ fg, dim }) => (
  <svg
    width="900"
    height="320"
    viewBox="0 0 900 320"
    style={{ display: 'block', maxWidth: '100%' }}
  >
    <defs>
      <marker id="rfc-arrow-o" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M 0 0 L 8 4 L 0 8 z" fill={fg} />
      </marker>
    </defs>
    <g
      fill="none"
      stroke={fg}
      strokeWidth="1.1"
      fontFamily="'IBM Plex Mono', monospace"
      fontSize="11"
    >
      {['alert', 'eng on-call', 'runbook', 'system'].map((lane, i) => (
        <g key={lane}>
          <text x={10} y={60 + i * 60} fill={dim}>
            {lane}
          </text>
          <line
            x1={120}
            y1={60 + i * 60}
            x2={880}
            y2={60 + i * 60}
            stroke={dim}
            strokeDasharray="2 4"
          />
        </g>
      ))}
      <circle cx={170} cy={60} r="6" fill={fg} />
      <text x={180} y={48} fill={fg}>
        fires
      </text>
      <path d="M 170 60 L 170 110" markerEnd="url(#rfc-arrow-o)" />
      <rect x={140} y={110} width={80} height={26} />
      <text x={180} y={127} fill={fg} textAnchor="middle">
        ack
      </text>
      <path d="M 220 123 L 280 123" markerEnd="url(#rfc-arrow-o)" />
      <path d="M 180 136 L 180 170" markerEnd="url(#rfc-arrow-o)" strokeDasharray="3 3" />
      <rect x={140} y={170} width={120} height={26} />
      <text x={200} y={187} fill={fg} textAnchor="middle">
        read runbook
      </text>
      <path d="M 260 183 L 310 183" markerEnd="url(#rfc-arrow-o)" />
      <path d="M 360 170 L 410 170 L 410 196 L 360 196 z" />
      <text x={385} y={188} fill={fg} textAnchor="middle">
        fix?
      </text>
      <path d="M 410 170 L 470 110" markerEnd="url(#rfc-arrow-o)" />
      <rect x={470} y={92} width={80} height={26} />
      <text x={510} y={110} fill={fg} textAnchor="middle">
        escalate
      </text>
      <path d="M 410 196 L 470 230" markerEnd="url(#rfc-arrow-o)" />
      <rect x={470} y={216} width={80} height={26} />
      <text x={510} y={234} fill={fg} textAnchor="middle">
        fix
      </text>
      <path d="M 550 230 L 620 230" markerEnd="url(#rfc-arrow-o)" strokeDasharray="3 3" />
      <rect x={620} y={216} width={120} height={26} />
      <text x={680} y={234} fill={fg} textAnchor="middle">
        postmortem
      </text>
      <path d="M 740 240 C 800 270, 200 280, 170 80" strokeDasharray="2 4" />
      <text x={500} y={295} fill={dim} textAnchor="middle">
        the loop is the protocol. heroism is a smell.
      </text>
    </g>
  </svg>
);
