import { useT } from "../i18n";
import { colors as c } from "../theme";
import { metrics, projects } from "../data/portfolio";

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.14em",
  color: c.dim,
  textTransform: "uppercase",
};

/** Impact stat cards. */
export function ImpactGrid() {
  const t = useT();
  return (
    <>
      <div style={{ ...sectionLabel, color: c.synComment, margin: "40px 0 12px" }}>
        // {t({ en: "rendered preview", ko: "렌더링 미리보기" } as any)} ↓
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              border: `1px solid ${c.accentSoftBorder}`,
              borderRadius: 8,
              padding: 16,
              background: "rgba(91,157,255,0.04)",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700, color: c.accent }}>{m.fig}</div>
            <div style={{ fontSize: 11, color: c.muted, marginTop: 5, lineHeight: 1.4 }}>{t(m.label)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Selected-work project cards with hover lift. */
export function ProjectList() {
  const t = useT();
  return (
    <>
      <div style={{ ...sectionLabel, margin: "36px 0 12px" }}>// {t({ en: "Selected Work", ko: "대표 작업" } as any)}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.link || undefined}
            target={p.link ? "_blank" : undefined}
            rel="noreferrer"
            style={{
              display: "block",
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              padding: "18px 20px",
              background: c.card,
              color: "inherit",
              textDecoration: "none",
              transition: "all .16s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(91,157,255,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = c.border;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <span style={{ color: c.heading, fontSize: 16, fontWeight: 600 }}>{t(p.title)}</span>
              <span style={{ color: c.dim, fontSize: 11, letterSpacing: "0.08em" }}>{t(p.ctx)}</span>
            </div>
            <div style={{ color: c.muted, margin: "9px 0 12px", fontSize: 13, maxWidth: 640 }}>{t(p.blurb)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.stack.map((s) => (
                  <span key={s} style={{ fontSize: 11, color: c.synProp, background: c.accentSoftBg, padding: "2px 8px", borderRadius: 4 }}>
                    {s}
                  </span>
                ))}
              </div>
              <span style={{ color: c.accent, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{t(p.metric)} →</span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
