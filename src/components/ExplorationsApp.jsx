import { DesignCanvas, DCSection, DCArtboard, DCPostIt } from './DesignCanvas.jsx';
import TerminalResume from './TerminalResume.jsx';
import RFCResume from './RFCResume.jsx';
import MonolithResume from './MonolithResume.jsx';

export default function ExplorationsApp() {
  return (
    <DesignCanvas>
      <DCSection
        id="resume"
        title="Personal Resume — Principal Engineer, Backend Systems"
        subtitle="Three monochrome directions. Click any to focus. All are interactive — try the terminal, ⌘K, filters, and the timeline scrub."
      >
        <DCArtboard id="terminal" label="A · ~/resume — Terminal native" width={1180} height={3200}>
          <TerminalResume />
        </DCArtboard>

        <DCArtboard id="rfc" label="B · RFC-2026 — Technical spec" width={1180} height={3200}>
          <RFCResume />
        </DCArtboard>

        <DCArtboard
          id="monolith"
          label="C · MONOLITH — Brutalist editorial"
          width={1280}
          height={3600}
        >
          <MonolithResume />
        </DCArtboard>

        <DCPostIt top={-30} left={20} rotate={-3} width={240}>
          Each board is a full working site. Click to focus, then try the terminal, ⌘K, filters, and
          the timeline. Content lives in <strong>src/data/resume.js</strong> — edit once, all three
          update.
        </DCPostIt>
      </DCSection>
    </DesignCanvas>
  );
}
