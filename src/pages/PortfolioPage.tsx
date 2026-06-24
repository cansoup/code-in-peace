import { useState } from "react";
import { LangContext, useT, type Lang, readStoredLang, storeLang } from "../i18n";
import { colors as c, font } from "../theme";
import { GITHUB_USERNAME } from "../data/portfolio";
import { LangToggle } from "../components/LangToggle";
import { AboutCode } from "../components/AboutCode";
import { ImpactGrid, ProjectList } from "../components/Sections";
import { GitHubActivity } from "../components/GitHubActivity";
import { BackgroundSkills, ContactBar } from "../components/BackgroundSkills";

const FILES: { icon: string; iconColor: string; name: string; active?: boolean; indent?: number }[] = [
  { icon: "{ }", iconColor: c.accent, name: "about.tsx", active: true, indent: 26 },
  { icon: "{ }", iconColor: c.synYellow, name: "skills.json", indent: 28 },
  { icon: "▸", iconColor: c.muted, name: "projects", indent: 16 },
  { icon: "V", iconColor: c.synGreen, name: "payroll-access.vue", indent: 40 },
  { icon: "V", iconColor: c.synGreen, name: "payroll-mgmt.vue", indent: 40 },
  { icon: "⬡", iconColor: c.accent, name: "design-system.tsx", indent: 40 },
  { icon: "M↓", iconColor: c.synPunct, name: "experience.md", indent: 28 },
  { icon: "{ }", iconColor: c.accent, name: "contact.ts", indent: 28 },
];

function Inner() {
  const t = useT();
  return (
    <div style={{ minHeight: "100vh", background: c.bg, color: c.text, fontSize: 13, display: "flex", fontFamily: font }}>
      {/* Explorer sidebar */}
      <aside
        style={{
          width: 228,
          flexShrink: 0,
          background: c.sidebar,
          borderRight: `1px solid ${c.borderHair}`,
          padding: "14px 0 40px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "0 16px 10px", color: c.dim, letterSpacing: "0.14em", fontSize: 10 }}>EXPLORER</div>
        <div style={{ padding: "5px 16px", color: "#9aa4b2", fontWeight: 600, fontSize: 12 }}>▾ MINHA-KIM</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 12 }}>
          {FILES.map((f) => (
            <div
              key={f.name}
              style={{
                padding: `5px 16px 5px ${f.indent}px`,
                color: f.active ? c.heading : "#9aa4b2",
                background: f.active ? "rgba(91,157,255,0.12)" : "transparent",
                borderLeft: f.active ? `2px solid ${c.accent}` : "2px solid transparent",
                display: "flex",
                gap: 8,
              }}
            >
              <span style={{ color: f.iconColor }}>{f.icon}</span>
              {f.name}
            </div>
          ))}
        </div>
      </aside>

      {/* Editor pane */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Tab bar */}
        <div style={{ display: "flex", justifyContent: "space-between", background: c.sidebar, borderBottom: `1px solid ${c.borderHair}`, fontSize: 12, position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex" }}>
            <div style={{ padding: "9px 16px", background: c.bg, borderTop: `2px solid ${c.accent}`, color: c.heading, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: c.accent }}>{"{ }"}</span>about.tsx <span style={{ color: c.dim }}>×</span>
            </div>
            <div style={{ padding: "9px 16px", color: c.dim, borderTop: "2px solid transparent" }}>README.md</div>
          </div>
          <div style={{ padding: "6px 10px" }}>
            <LangToggle />
          </div>
        </div>

        <div style={{ padding: "26px 30px 80px" }}>
          <AboutCode />
          <ImpactGrid />
          <ProjectList />
          {/* Live contribution data via the public jogruber proxy (no token).
              This also switches the recent-commit log to the GitHub events API. */}
          <GitHubActivity fetchUrl={`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`} />
          <BackgroundSkills />
          <ContactBar />
        </div>

        {/* Status bar */}
        <div style={{ position: "sticky", bottom: 0, height: 26, background: c.statusBg, color: c.statusText, display: "flex", alignItems: "center", gap: 16, padding: "0 14px", fontSize: 11, fontWeight: 600, zIndex: 100 }}>
          <span>⎇ main*</span>
          <span>UTF-8</span>
          <span>TSX React</span>
          <span style={{ marginLeft: "auto" }}>Ln 12, Col 18</span>
          <span>{t({ en: "English", ko: "한국어" } as any)}</span>
        </div>
      </div>
    </div>
  );
}

/** Top-level page. Owns + persists the language choice and provides context. */
export default function PortfolioPage() {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang("en"));
  const setLang = (l: Lang) => { storeLang(l); setLangState(l); };
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Inner />
    </LangContext.Provider>
  );
}
