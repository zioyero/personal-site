// Single source of truth for all resume views.
// Edit this file to update every direction at once.

const RESUME = {
  // ── identity ─────────────────────────────────────────────
  name: 'Adrian Castillejos',
  initials: 'AC',
  monogram: 'AC',
  title: 'Principal Engineer',
  company: 'Circuitly',
  location: 'San Francisco, CA',
  years: 13,
  email: 'zioyero@gmail.com',
  github: 'github.com/zioyero',
  website: 'zioyero.com',
  linkedin: 'linkedin.com/in/zioyero',

  // ── about ────────────────────────────────────────────────
  about: {
    short: 'Principal Engineer at Circuitly. Started in mathematics, ended up writing code.',
    long:
      'After studying mathematics, I discovered that the best application and ' +
      'exploration of math was in computer science. So I learned to program. I love ' +
      'to see and understand how things work, mostly by taking them apart, changing ' +
      'them, putting them back together, and seeing what happens. It’s fascinating ' +
      'that we can create systems with very simple rules and see such complex ' +
      'interactions and outcomes.',
    witty:
      'Strong opinions about idempotency, weakly held opinions about indentation. ' +
      'Currently building AI-assisted circuit design at the intersection of math, ' +
      'software, and electrons.',
  },

  // ── experience ───────────────────────────────────────────
  experience: [
    {
      role: 'Principal Engineer',
      co: 'Circuitly',
      from: 'Oct 2025', to: 'now',
      fromYear: 2025, toYear: 2026,
      short: 'TypeScript backend · distributed systems · AI-assisted circuit design',
      detail:
        'TypeScript backends and distributed systems for an AI-assisted circuit ' +
        'design tool. Where math, software, and electrons all meet at the same standup.',
      wins: [
        'Shaping backend architecture for an AI-assisted CAD product from the ground up.',
        'Bridging classical EDA solvers with TypeScript services and LLM-driven assistance.',
      ],
      stack: ['TypeScript', 'Node', 'Postgres', 'Redis', 'LLMs'],
    },
    {
      role: 'Principal Backend Engineer',
      co: 'Medium',
      from: 'Oct 2024', to: 'Oct 2025',
      fromYear: 2024, toYear: 2025,
      short: 'Backend architecture for the publishing platform',
      detail:
        'Owned backend architecture for the publishing platform. Distributed systems ' +
        'work that ships to millions of readers without paging anyone at 3am.',
      wins: [
        'Set technical direction for platform-wide backend initiatives serving millions of readers.',
        'Mentored staff and senior engineers; reviewed designs that became long-lived primitives.',
        'Drove a series of refactors that retired several years of accumulated complexity.',
      ],
      stack: ['TypeScript', 'Node', 'GraphQL', 'DynamoDB', 'AWS'],
    },
    {
      role: 'Staff Software Engineer',
      co: 'Medium',
      from: 'Nov 2021', to: 'Oct 2024',
      fromYear: 2021, toYear: 2024,
      short: 'Three years of platform & reliability work',
      detail:
        'Three years on Medium’s platform. Backend systems, reliability, and the ' +
        'kind of refactors that make new engineers stop asking “wait, why does this work?”',
      wins: [
        'Owned reliability and architecture for several core publishing surfaces.',
        'Led migrations and platform upgrades with negligible reader-visible impact.',
        'Established review patterns and runbooks still in use by the team.',
      ],
      stack: ['TypeScript', 'Node', 'GraphQL', 'DynamoDB', 'AWS', 'Datadog'],
    },
    {
      role: 'Software Engineer',
      co: 'Projector',
      from: 'Feb 2020', to: 'Nov 2021',
      fromYear: 2020, toYear: 2021,
      short: 'Real-time multiplayer design · CRDTs in production',
      detail:
        'Real-time collaborative design app. Got intimate with CRDTs, websockets, ' +
        'and Python on the server.',
      wins: [
        'Shipped real-time multiplayer with CRDT-based document sync.',
        'Tuned websocket fan-out so dozens of cursors stayed buttery on a single doc.',
      ],
      stack: ['Python', 'TypeScript', 'WebSockets', 'CRDTs', 'Postgres'],
    },
    {
      role: 'Senior Software Architect',
      co: 'August Home',
      from: 'Mar 2018', to: 'Feb 2020',
      fromYear: 2018, toYear: 2020,
      short: 'Connected-home architecture',
      detail:
        'Architecture for connected-home products. Designing systems where the ' +
        'doorbell really, really has to work.',
      wins: [
        'Set architecture across mobile, cloud, and embedded for a multi-product hardware line.',
        'Hardened the unlock path — the one where a software bug means someone’s locked out.',
      ],
      stack: ['Android', 'iOS', 'AWS', 'BLE', 'embedded firmware'],
    },
    {
      role: 'Senior Android Engineer',
      co: 'Vungle',
      from: 'Jan 2017', to: 'Mar 2018',
      fromYear: 2017, toYear: 2018,
      short: 'Publisher SDK · mobile ad serving at scale',
      detail:
        'Worked on the Vungle publisher SDK. Mobile ad serving at scale, with the ' +
        'kind of constraints that teach you respect for memory.',
      wins: [
        'Shipped publisher-SDK features running on hundreds of millions of devices.',
        'Drove down memory footprint and crash rate on long-tail Android hardware.',
      ],
      stack: ['Android', 'Java', 'RxJava', 'OkHttp'],
    },
    {
      role: 'Senior Mobile Developer',
      co: 'August Home',
      from: 'May 2015', to: 'Jan 2017',
      fromYear: 2015, toYear: 2017,
      short: 'The Android app that unlocks your front door',
      detail:
        'The Android August Home app — the one that opens your front door. Stakes ' +
        'appropriately high.',
      wins: [
        'Owned the Android app users trusted with their front door.',
        'Designed BLE-first sync to keep the app honest when the network was not.',
      ],
      stack: ['Android', 'Java', 'RxJava', 'BLE'],
    },
    {
      role: 'Technical Head of Mobile',
      co: 'Aether Things',
      from: 'Mar 2013', to: 'May 2015',
      fromYear: 2013, toYear: 2015,
      short: 'iOS + Android for the Aether Cone speaker',
      detail:
        'Built and led mobile for the Aether Cone speaker. iOS + Android remote ' +
        'control apps, separate codebases, shared architecture.',
      wins: [
        'Led mobile for a connected-speaker product from prototype to shipping hardware.',
        'Kept feature parity across two independent iOS / Android codebases.',
      ],
      stack: ['Objective-C', 'Java', 'BLE', 'WiFi'],
    },
  ],

  // ── timeline ────────────────────────────────────────────
  timelineBands: [
    { year: 2013, role: 'Mobile Lead' },
    { year: 2015, role: 'Senior Mobile' },
    { year: 2018, role: 'Architect' },
    { year: 2020, role: 'Engineer' },
    { year: 2021, role: 'Staff' },
    { year: 2024, role: 'Principal' },
  ],
  timelineRange: { from: 2013, to: 2026 },

  // ── skills ───────────────────────────────────────────────
  skills: {
    languages:   ['TypeScript', 'Python', 'Java', 'C', 'C++'],
    distributed: ['distributed systems', 'CRDTs', 'real-time sync', 'event-driven', 'scaling'],
    backend:     ['API design', 'service architecture', 'reliability', 'data pipelines'],
    mobile:      ['Android', 'iOS', 'RxJava', 'mobile SDKs'],
    domains:     ['AI / ML integration', 'CAD / EDA', 'publishing platforms', 'IoT', 'mobile ads'],
    tools:       ['Vim', 'gdb', 'git'],
  },

  // ── projects ─────────────────────────────────────────────
  projects: [
    { name: 'circuitly',   tags: ['current', 'distributed', 'ai', 'backend'], year: 2026, scale: 'TYPESCRIPT',    blurb: 'AI-assisted circuit design platform. TypeScript backend. Day job.' },
    { name: 'medium',      tags: ['scale',   'backend', 'distributed'],       year: 2024, scale: '4 YEARS',       blurb: 'Four years of platform & backend work serving the long tail of writing on the internet.' },
    { name: 'projector',   tags: ['realtime','crdt', 'collaboration'],        year: 2021, scale: 'REALTIME',      blurb: 'Multiplayer collaborative design with CRDT sync. Before that was cool.' },
    { name: 'august-home', tags: ['mobile',  'android', 'iot'],               year: 2017, scale: 'IOT',           blurb: 'The Android app that unlocks your front door. Used by millions.' },
    { name: 'vungle-sdk',  tags: ['mobile',  'android', 'sdk'],               year: 2018, scale: 'SDK',           blurb: 'Mobile-ad publisher SDK. Memory budgets you can count on your fingers.' },
    { name: 'aether-cone', tags: ['mobile',  'ios', 'android'],               year: 2015, scale: 'IOS + ANDROID', blurb: 'Companion apps for a connected speaker. Two codebases, one architecture.' },
  ],
  projectTags: ['current', 'distributed', 'backend', 'mobile', 'realtime', 'ios', 'android'],

  // ── public OSS / side projects (from github.com/zioyero) ────
  oss: [
    { name: 'mediaCenterSkill', lang: 'Python', blurb: 'An Alexa skill to communicate to a computer and play videos.' },
    { name: 'TVShows',          lang: 'Java',   blurb: 'Android app to track television shows using thetvdb.com.' },
    { name: 'NSObject-Utils',   lang: 'Obj-C',  blurb: 'A collection of helper, convenience, and utility functions for base NSObjects.' },
    { name: 'danger-jira',      lang: 'Ruby',   blurb: 'Danger plugin to link JIRA issues in a pull request. (Maintained fork.)' },
  ],

  // ── achievements (from GitHub profile) ──────
  achievements: [
    ['✕ 4',  'Pull Shark'],
    ['✕ 3',  'Pair Extraordinaire'],
    ['✕ 1',  'YOLO'],
    ['✕ 1',  'Quickdraw'],
    ['✕ 1',  'Arctic Code Vault Contributor'],
  ],

  // ── education ────────────────────────────────────────────
  education: [
    {
      school: 'Carnegie Mellon University',
      degree: 'B.S. Computer Science',
      year: '',
      note: 'Came in studying mathematics. Left writing code. The transition was not subtle.',
    },
  ],

  // ── fun facts ────────────────────────────────────────────
  facts: [
    ['13',   'YEARS BUILDING SOFTWARE'],
    ['8',    'COMPANIES, MOSTLY IN SF'],
    ['2',    'AUGUST HOME TOURS (BOOMERANGED)'],
    ['4',    'YEARS AT MEDIUM'],
    ['1',    'SPEAKER, AETHER CONE, SHIPPED'],
    ['1',    'APP THAT OPENS YOUR FRONT DOOR'],
    ['∞', 'OPINIONS ABOUT IDEMPOTENCY'],
    ['1',    'CIRCUIT DESIGN STARTUP, NOW'],
  ],

  // ── reference architecture diagram ───────────────────────
  architecture: {
    clients:   [{ label: 'web app' }, { label: 'ios app' }, { label: 'cli / api' }],
    edge:      { name: 'edge proxy', sub: 'authz · rate-limit' },
    services:  [
      { name: 'schematic', lang: 'TS' },
      { name: 'solver',    lang: 'Rust' },
      { name: 'ai assist', lang: 'TS' },
    ],
    bus:       { name: 'event bus', sub: 'redis streams' },
    store:     { name: 'postgres', sub: 'durable state · replicated reads' },
  },

  // ── RFC-specific extras ──────────────────────────────────
  headlines: [
    'Notes on taking systems\napart, then putting them\nback together.',
    'On the construction\nof systems that can\nbe taken apart.',
    'A specification\nfor one (1)\nprincipal engineer.',
  ],

  snippets: {
    bio:
`// principal_engineer.ts
type PrincipalEngineer = {
  name:        "Adrian Castillejos",
  since:       2013,
  taking_apart: System[],
  putting_back: System[],
  opinions_on_idempotency: "strong",
};`,
    onCall:
`# on-call protocol
while (alert) {
  ack();
  read(runbook);
  if (!fixable) escalate();
  else          { fix(); postmortem(); }
}`,
    api:
`// circuitly/schematic.ts
export const createNet = (a: Pin, b: Pin) =>
  Net.of([a, b])
    .check(rules.electrical)
    .commit({ idempotent: true });`,
  },

  schematics: {
    request:    { title: 'Fig. 1 — Canonical request path',     caption: 'Components MAY be swapped; semantics MUST NOT.' },
    dataflow:   { title: 'Fig. 2 — Data flow & change capture', caption: 'Writes are durable before they are visible. Reads are eventually consistent unless the caller pays otherwise.' },
    deployment: { title: 'Fig. 3 — Deployment topology',        caption: 'Per-region cells. Blast radius bounded by cell, not by region.' },
    onCall:     { title: 'Fig. 4 — On-call protocol',           caption: 'A loop, not a hero. The pager is a feature; the runbook is the spec.' },
  },
};

export default RESUME;
