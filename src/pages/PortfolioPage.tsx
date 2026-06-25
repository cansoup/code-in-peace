import { useState, useRef, type MouseEvent } from "react";
import { LangContext, useT, type Lang, readStoredLang, storeLang } from "../i18n";
import { colors as c, font } from "../theme";
import { GITHUB_USERNAME } from "../data/portfolio";

// --- Resizable sidebar width (persisted, like an IDE) --------------------
const WIDTH_KEY = "pf_sidebar_w";
const DEFAULT_WIDTH = 228;
const MIN_WIDTH = 160;
const MAX_WIDTH = 300;

function readStoredWidth(): number {
  try {
    const v = Number(localStorage.getItem(WIDTH_KEY));
    if (v >= MIN_WIDTH && v <= MAX_WIDTH) return v;
  } catch {}
  return DEFAULT_WIDTH;
}
function storeWidth(w: number) {
  try {
    localStorage.setItem(WIDTH_KEY, String(w));
  } catch {}
}
import { LangToggle } from "../components/LangToggle";
import { AboutCode } from "../components/AboutCode";
import { ImpactGrid, ProjectDetail } from "../components/Sections";
import { GitHubActivity } from "../components/GitHubActivity";
import { Background, Skills, ContactBar } from "../components/BackgroundSkills";

const GH_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

// --- File explorer tree --------------------------------------------------
interface FileLeaf {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  indent: number;
}
interface FolderNode {
  id: string;
  name: string;
  indent: number;
  children: FileLeaf[];
}
type TreeItem = ({ kind: "file" } & FileLeaf) | ({ kind: "folder" } & FolderNode);

const TREE: TreeItem[] = [
  { kind: "file", id: "about.tsx", name: "about.tsx", icon: "{ }", iconColor: c.accent, indent: 26 },
  { kind: "file", id: "skills.json", name: "skills.json", icon: "{ }", iconColor: c.synYellow, indent: 26 },
  {
    kind: "folder",
    id: "projects",
    name: "projects",
    indent: 16,
    children: [
      { id: "payroll-access.vue", name: "payroll-access.vue", icon: "V", iconColor: c.synGreen, indent: 40 },
      { id: "payroll-mgmt.vue", name: "payroll-mgmt.vue", icon: "V", iconColor: c.synGreen, indent: 40 },
      { id: "design-system.tsx", name: "design-system.tsx", icon: "⬡", iconColor: c.accent, indent: 40 },
    ],
  },
  { kind: "file", id: "experience.md", name: "experience.md", icon: "M↓", iconColor: c.synPunct, indent: 26 },
  { kind: "file", id: "contact.ts", name: "contact.ts", icon: "{ }", iconColor: c.accent, indent: 26 },
];

// Flat lookup (id → leaf) for rendering tabs and the status bar.
const FILE_META: Record<string, FileLeaf> = {};
for (const item of TREE) {
  if (item.kind === "file") FILE_META[item.id] = item;
  else item.children.forEach((ch) => (FILE_META[ch.id] = ch));
}

const DEFAULT_TAB = "about.tsx";

/** Resolve a file id to its editor content. */
function FileContent({ id }: { id: string }) {
  switch (id) {
    case "about.tsx":
      return (
        <>
          <AboutCode />
          <ImpactGrid />
          <GitHubActivity fetchUrl={GH_URL} />
        </>
      );
    case "skills.json":
      return <Skills />;
    case "experience.md":
      return <Background />;
    case "contact.ts":
      return <ContactBar />;
    case "payroll-access.vue":
      return <ProjectDetail index={0} />;
    case "payroll-mgmt.vue":
      return <ProjectDetail index={1} />;
    case "design-system.tsx":
      return <ProjectDetail index={2} />;
    default:
      return null;
  }
}

function Inner() {
  const t = useT();
  const [openTabs, setOpenTabs] = useState<string[]>([DEFAULT_TAB]);
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_TAB);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ projects: true });
  const [sidebarWidth, setSidebarWidth] = useState<number>(readStoredWidth);
  const draggingRef = useRef(false);
  const widthRef = useRef(sidebarWidth);

  const startResize = (e: MouseEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const onMove = (ev: globalThis.MouseEvent) => {
      if (!draggingRef.current) return;
      const w = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, ev.clientX));
      widthRef.current = w;
      setSidebarWidth(w);
    };
    const onUp = () => {
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      storeWidth(widthRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const openFile = (id: string) => {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveTab(id);
  };

  const closeTab = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenTabs((prev) => {
      const idx = prev.indexOf(id);
      const next = prev.filter((t) => t !== id);
      if (id === activeTab) setActiveTab(next[idx - 1] ?? next[idx] ?? "");
      return next;
    });
  };

  const toggleFolder = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  // --- Drag-to-reorder open tabs ---
  const dragTabRef = useRef<string | null>(null);
  const [draggingTab, setDraggingTab] = useState<string | null>(null);

  const reorderTabs = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    setOpenTabs((prev) => {
      const next = [...prev];
      const from = next.indexOf(fromId);
      const to = next.indexOf(toId);
      if (from === -1 || to === -1) return prev;
      next.splice(from, 1);
      next.splice(to, 0, fromId);
      return next;
    });
  };

  const fileRow = (leaf: FileLeaf) => {
    const active = leaf.id === activeTab;
    return (
      <div
        key={leaf.id}
        onClick={() => openFile(leaf.id)}
        style={{
          padding: `5px 16px 5px ${leaf.indent}px`,
          color: active ? c.heading : c.muted,
          background: active ? c.accentSoftBg : "transparent",
          borderLeft: active ? `2px solid ${c.accent}` : "2px solid transparent",
          display: "flex",
          gap: 8,
          alignItems: "center",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = c.hover; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
      >
        <span style={{ color: leaf.iconColor, flexShrink: 0 }}>{leaf.icon}</span>
        <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{leaf.name}</span>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: c.bg, color: c.text, fontSize: 13, display: "flex", fontFamily: font }}>
      {/* Explorer sidebar — always visible */}
      <aside
        style={{
          width: sidebarWidth,
          flexShrink: 0,
          background: c.sidebar,
          borderRight: `1px solid ${c.borderHair}`,
          padding: "14px 0 40px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "0 16px 10px", color: c.dim, letterSpacing: "0.14em", fontSize: 10 }}>EXPLORER</div>
        <div style={{ padding: "5px 16px", color: c.muted, fontWeight: 600, fontSize: 12 }}>▾ MINHA-KIM</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 12 }}>
          {TREE.map((item) => {
            if (item.kind === "file") return fileRow(item);
            const open = !!expanded[item.id];
            return (
              <div key={item.id}>
                <div
                  onClick={() => toggleFolder(item.id)}
                  style={{ padding: `5px 16px 5px ${item.indent}px`, color: c.muted, display: "flex", gap: 8, alignItems: "center", overflow: "hidden", cursor: "pointer", userSelect: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = c.hover)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ color: c.muted, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
                  <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</span>
                </div>
                {open && item.children.map((ch) => fileRow(ch))}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Drag handle — resize the sidebar like an IDE */}
      <div
        onMouseDown={startResize}
        title="Drag to resize"
        style={{ width: 6, flexShrink: 0, cursor: "col-resize", background: "transparent", transition: "background .12s" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = c.accent)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      />

      {/* Editor pane */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Tab bar — one tab per open file */}
        <div style={{ display: "flex", justifyContent: "space-between", background: c.sidebar, borderBottom: `1px solid ${c.borderHair}`, fontSize: 12, position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", overflowX: "auto" }}>
            {openTabs.map((id) => {
              const m = FILE_META[id];
              if (!m) return null;
              const active = id === activeTab;
              return (
                <div
                  key={id}
                  onClick={() => setActiveTab(id)}
                  draggable
                  onDragStart={() => { dragTabRef.current = id; setDraggingTab(id); }}
                  onDragEnter={() => { const from = dragTabRef.current; if (from && from !== id) reorderTabs(from, id); }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); dragTabRef.current = null; setDraggingTab(null); }}
                  onDragEnd={() => { dragTabRef.current = null; setDraggingTab(null); }}
                  style={{
                    padding: "9px 10px 9px 16px",
                    background: active ? c.bg : "transparent",
                    borderTop: active ? `2px solid ${c.accent}` : "2px solid transparent",
                    borderRight: `1px solid ${c.borderHair}`,
                    opacity: draggingTab === id ? 0.4 : 1,
                    color: active ? c.heading : c.dim,
                    display: "flex",
                    gap: 9,
                    alignItems: "center",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ color: m.iconColor }}>{m.icon}</span>
                  {m.name}
                  <span
                    onClick={(e) => closeTab(e, id)}
                    title="Close"
                    style={{ color: c.dim, marginLeft: 2, padding: "0 3px", borderRadius: 3 }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = c.hoverStrong; e.currentTarget.style.color = c.heading; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = c.dim; }}
                  >
                    ×
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ padding: "6px 10px", flexShrink: 0 }}>
            <LangToggle />
          </div>
        </div>

        {/* Editor body — content of the active tab */}
        <div style={{ flex: 1, padding: "26px 30px 80px" }}>
          {activeTab ? (
            <FileContent id={activeTab} />
          ) : (
            <div style={{ color: c.dim, fontSize: 13, marginTop: 40 }}>
              {t({ en: "// No file open — pick one from the explorer.", ko: "// 열린 파일이 없습니다 — 탐색기에서 선택하세요." })}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div style={{ position: "sticky", bottom: 0, height: 26, background: c.statusBg, color: c.statusText, display: "flex", alignItems: "center", gap: 16, padding: "0 14px", fontSize: 11, fontWeight: 600, zIndex: 100 }}>
          <span>⎇ main*</span>
          <span>UTF-8</span>
          <span>TSX React</span>
          <span style={{ marginLeft: "auto" }}>{activeTab ? FILE_META[activeTab]?.name : "—"}</span>
          <span>{t({ en: "English", ko: "한국어" })}</span>
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
