import { useT } from "../i18n";
import { colors as c } from "../theme";
import { metrics, projects, projectGroups, otherWork } from "../data/portfolio";

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
              background: c.accentSoftBg,
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

/** Small "WIP" tag for placeholder projects awaiting real content. */
function WipBadge() {
  return (
    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: c.synNumber, border: `1px solid ${c.synNumber}`, borderRadius: 3, padding: "1px 5px", textTransform: "uppercase" }}>
      WIP
    </span>
  );
}

/** Selected-work overview shown on about.tsx: cards grouped by cluster
 *  (Hiworks / School). Clicking a card opens that project's editor tab. */
export function ProjectList({ onOpen }: { onOpen?: (file: string) => void }) {
  const t = useT();
  return (
    <>
      <div style={{ ...sectionLabel, margin: "40px 0 4px" }}>// {t({ en: "Selected Work", ko: "대표 작업" })}</div>
      {projectGroups.map((g) => {
        const items = projects.filter((p) => p.group === g.id);
        if (!items.length) return null;
        return (
          <div key={g.id} style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, margin: "18px 0 10px", color: c.muted, fontSize: 12, fontWeight: 600 }}>
              <span style={{ color: c.dim }}>▾</span>
              {t(g.label)}
              <span style={{ color: c.dim, fontWeight: 400 }}>· {items.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((p) => (
                <div
                  key={p.file}
                  onClick={() => onOpen?.(p.file)}
                  style={{
                    border: `1px solid ${c.border}`,
                    borderRadius: 10,
                    padding: "15px 18px",
                    background: c.card,
                    cursor: onOpen ? "pointer" : "default",
                    transition: "all .16s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8, color: c.heading, fontSize: 15, fontWeight: 600 }}>
                      {t(p.title)}
                      {p.wip && <WipBadge />}
                    </span>
                    <span style={{ color: c.dim, fontSize: 11, letterSpacing: "0.08em" }}>{t(p.ctx)}</span>
                  </div>
                  <div style={{ color: c.muted, margin: "8px 0 11px", fontSize: 13, lineHeight: 1.6, maxWidth: 640 }}>{t(p.blurb)}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.stack.slice(0, 4).map((s) => (
                        <span key={s} style={{ fontSize: 11, color: c.synProp, background: c.accentSoftBg, padding: "2px 8px", borderRadius: 4 }}>
                          {s}
                        </span>
                      ))}
                    </div>
                    <span style={{ color: c.accent, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{t(p.metric)} →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

/** `other.md` — a compact list of minor / maintenance work, no detail page. */
export function OtherWork() {
  const t = useT();
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ ...sectionLabel, color: c.synComment, marginBottom: 6 }}># {t({ en: "Other Work", ko: "기타 작업" })}</div>
      <div style={{ color: c.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 22 }}>
        {t({ en: "Smaller projects and ongoing maintenance — listed briefly.", ko: "비중이 작은 프로젝트와 상시 유지보수 작업을 간략히 정리했습니다." })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {otherWork.map((w, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline", borderLeft: `2px solid ${c.accentSoftBorder}`, paddingLeft: 14 }}>
            <span style={{ color: c.synPunct, fontSize: 12, flexShrink: 0 }}>-</span>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <span style={{ color: c.heading, fontSize: 14, fontWeight: 600 }}>{t(w.title)}</span>
                <span style={{ color: c.dim, fontSize: 11 }}>{t(w.ctx)}</span>
              </div>
              <div style={{ color: c.muted, fontSize: 13, lineHeight: 1.6, marginTop: 3 }}>{t(w.note)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A labeled section in the project detail view, rendered as a `// comment`. */
function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ ...sectionLabel, color: c.muted, marginBottom: 12 }}>// {label}</div>
      {children}
    </div>
  );
}

/** Bulleted list with an accent marker. Items are pre-resolved strings. */
function BulletList({ items, marker = "▹", color = c.accent }: { items: string[]; marker?: string; color?: string }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.7, color: c.text }}>
          <span style={{ color, flexShrink: 0 }}>{marker}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Browser/preview-style frame for a project's hero image. Renders the image
 *  when `src` is set; otherwise a themed placeholder so the layout is complete
 *  before real screenshots land. Keep files in public/images/. */
function PreviewFrame({ src, title, label }: { src?: string; title: string; label?: string }) {
  const t = useT();
  const dots = ["#ec6a5e", "#f4bf4f", "#61c554"];
  return (
    <div style={{ border: `1px solid ${c.border}`, borderRadius: 10, overflow: "hidden", background: c.card }}>
      {/* Title bar — mac dots + a fake address pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: c.sidebar, borderBottom: `1px solid ${c.borderHair}` }}>
        <div style={{ display: "flex", gap: 6 }}>
          {dots.map((d) => (
            <span key={d} style={{ width: 10, height: 10, borderRadius: "50%", background: d, display: "inline-block" }} />
          ))}
        </div>
        {label && (
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <span style={{ maxWidth: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", background: c.bg, border: `1px solid ${c.borderHair}`, borderRadius: 5, padding: "2px 12px", color: c.dim, fontSize: 11 }}>
              {label}
            </span>
          </div>
        )}
      </div>
      {/* Body — 16:9 preview area */}
      <div style={{ aspectRatio: "16 / 9", background: `linear-gradient(135deg, ${c.accentSoftBg}, ${c.card})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {src ? (
          <img src={src} alt={title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ textAlign: "center", padding: 20 }}>
            <div style={{ fontSize: 30, color: c.accentSoftBorder, marginBottom: 8 }}>▦</div>
            <div style={{ color: c.muted, fontSize: 13, fontWeight: 600 }}>{title}</div>
            <div style={{ color: c.dim, fontSize: 11, marginTop: 4 }}>{t({ en: "// preview image coming soon", ko: "// 미리보기 이미지 추가 예정" })}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Full detail view for a single project (opened as its own editor tab). */
export function ProjectDetail({ file }: { file: string }) {
  const t = useT();
  const p = projects.find((x) => x.file === file);
  if (!p) return null;
  const d = p.detail;

  const meta: { label: string; value: string }[] = [];
  if (d?.period) meta.push({ label: t({ en: "Duration", ko: "소요기간" }), value: t(d.period) });
  if (d?.role) meta.push({ label: t({ en: "Role", ko: "역할" }), value: t(d.role) });
  if (d?.team) meta.push({ label: t({ en: "Team", ko: "팀 구성" }), value: t(d.team) });

  return (
    <div style={{ maxWidth: 760 }}>
      {/* Header — context, title, overview */}
      <div style={{ ...sectionLabel, color: c.synComment, marginBottom: 12 }}>// {t(p.ctx)}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ color: c.heading, fontSize: 24, fontWeight: 700 }}>{t(p.title)}</span>
        {p.wip && <WipBadge />}
      </div>
      <div style={{ color: c.text, fontSize: 14, lineHeight: 1.8, marginBottom: 22 }}>{t(d?.overview ?? p.blurb)}</div>

      {/* Hero preview — real screenshot when available, placeholder otherwise */}
      <div style={{ marginBottom: 28 }}>
        <PreviewFrame
          src={p.cover}
          title={t(p.title)}
          label={p.link ? p.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.file}
        />
      </div>

      {/* Project overview — at-a-glance meta (duration / role / team) */}
      {meta.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: c.border, border: `1px solid ${c.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 28 }}>
          {meta.map((m) => (
            <div key={m.label} style={{ background: c.card, padding: "11px 14px" }}>
              <div style={{ color: c.dim, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{m.label}</div>
              <div style={{ color: c.text, fontSize: 13 }}>{m.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <DetailBlock label={t({ en: "Tech Stack", ko: "기술 스택" })}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.stack.map((s) => (
            <span key={s} style={{ fontSize: 12, color: c.synProp, background: c.accentSoftBg, border: `1px solid ${c.accentSoftBorder}`, padding: "4px 10px", borderRadius: 4 }}>
              {s}
            </span>
          ))}
        </div>
      </DetailBlock>

      {/* Key features */}
      {d?.features?.length ? (
        <DetailBlock label={t({ en: "Key Features", ko: "핵심 기능" })}>
          <BulletList items={d.features.map(t)} />
        </DetailBlock>
      ) : null}

      {/* Frontend system design */}
      {d?.architecture?.length ? (
        <DetailBlock label={t({ en: "Frontend System Design", ko: "프론트엔드 시스템 설계" })}>
          <BulletList items={d.architecture.map(t)} />
        </DetailBlock>
      ) : null}

      {/* Notable points — troubleshooting (problem → solution) */}
      {d?.challenges?.length ? (
        <DetailBlock label={t({ en: "Notable Points", ko: "특이사항" })}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {d.challenges.map((ch, i) => (
              <div key={i} style={{ border: `1px solid ${c.border}`, borderRadius: 8, background: c.card, padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 9, marginBottom: 9 }}>
                  <span style={{ color: c.synNumber, fontSize: 11, fontWeight: 700, minWidth: 56, flexShrink: 0 }}>{t({ en: "Problem", ko: "문제" })}</span>
                  <span style={{ color: c.text, fontSize: 13, lineHeight: 1.65 }}>{t(ch.problem)}</span>
                </div>
                <div style={{ display: "flex", gap: 9 }}>
                  <span style={{ color: c.accent, fontSize: 11, fontWeight: 700, minWidth: 56, flexShrink: 0 }}>{t({ en: "Solution", ko: "해결" })}</span>
                  <span style={{ color: c.text, fontSize: 13, lineHeight: 1.65 }}>{t(ch.solution)}</span>
                </div>
              </div>
            ))}
          </div>
        </DetailBlock>
      ) : null}

      {/* What I learned */}
      {d?.learnings?.length ? (
        <DetailBlock label={t({ en: "What I Learned", ko: "배운 점" })}>
          <BulletList items={d.learnings.map(t)} marker="✦" color={c.synYellow} />
        </DetailBlock>
      ) : null}

      {/* Outcomes */}
      {d?.outcomes?.length ? (
        <DetailBlock label={t({ en: "Outcomes", ko: "성과" })}>
          <BulletList items={d.outcomes.map(t)} marker="✓" />
        </DetailBlock>
      ) : null}

      {/* Footer — headline metric + visit link */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", borderTop: `1px solid ${c.border}`, paddingTop: 18 }}>
        <span style={{ color: c.accent, fontSize: 13, fontWeight: 700 }}>★ {t(p.metric)}</span>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 12, color: c.accent, textDecoration: "none", border: `1px solid ${c.accentSoftBorder}`, borderRadius: 6, padding: "7px 13px", transition: "all .15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.background = c.accentSoftBg; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.accentSoftBorder; e.currentTarget.style.background = "transparent"; }}
          >
            {t({ en: "Visit project", ko: "프로젝트 보기" })} →
          </a>
        )}
      </div>
    </div>
  );
}
