import ReactDOM from 'react-dom/client';
import { DesignCanvas, DCSection, DCArtboard, DCPostIt } from './components/DesignCanvas.jsx';
import TerminalResume from './components/TerminalResume.jsx';
import RFCResume from './components/RFCResume.jsx';
import MonolithResume from './components/MonolithResume.jsx';

function App() {
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

        <DCArtboard id="monolith" label="C · MONOLITH — Brutalist editorial" width={1280} height={3600}>
          <MonolithResume />
        </DCArtboard>

        <DCPostIt top={-30} left={20} rotate={-3} width={240}>
          Each board is a full working site. Click to focus, then try the terminal, ⌘K, filters, and the timeline. Content lives in <strong>src/data/resume.js</strong> — edit once, all three update.
        </DCPostIt>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
