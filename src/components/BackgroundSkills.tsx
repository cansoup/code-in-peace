import { useT } from "../i18n";
import { colors as c } from "../theme";
import { experience, education, certificates, skills, links } from "../data/portfolio";

const label: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.14em",
  color: c.dim,
  textTransform: "uppercase",
  marginBottom: 12,
};

const row: React.CSSProperties = { padding: "7px 0", borderTop: `1px solid ${c.borderSoft}` };
const rowTop: React.CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8 };

/** Background: experience + education + certificates. */
export function Background() {
  const t = useT();
  return (
    <div>
      <div style={label}>// {t({ en: "Background", ko: "이력" })}</div>

      {experience.map((e, i) => (
        <div key={`x${i}`} style={row}>
          <div style={rowTop}>
            <span style={{ color: c.heading }}>{t(e.role)}</span>
            <span style={{ color: c.dim, fontSize: 11 }}>{e.period}</span>
          </div>
          <div style={{ color: c.synProp, fontSize: 12 }}>{e.org}</div>
        </div>
      ))}

      {education.map((e, i) => (
        <div key={`e${i}`} style={row}>
          <div style={rowTop}>
            <span style={{ color: c.text, fontSize: 12 }}>{t(e.title)}</span>
            <span style={{ color: c.dim, fontSize: 11, whiteSpace: "nowrap" }}>{e.period}</span>
          </div>
          <div style={{ color: c.synPunct, fontSize: 11 }}>{e.org}</div>
        </div>
      ))}

      {certificates.map((cert, i) => (
        <div key={`c${i}`} style={row}>
          <div style={rowTop}>
            <span style={{ color: c.text, fontSize: 12 }}>{cert.title}</span>
            <span style={{ color: c.dim, fontSize: 11, whiteSpace: "nowrap" }}>{cert.period}</span>
          </div>
          <div style={{ color: c.synPunct, fontSize: 11 }}>{cert.org}</div>
        </div>
      ))}
    </div>
  );
}

/** Skills grouped by category, as bordered chips. */
export function Skills() {
  const t = useT();
  return (
    <div>
      <div style={label}>// {t({ en: "Skills", ko: "기술 스택" })}</div>
      {skills.map((s, i) => (
        <div key={i} style={row}>
          <div style={{ color: "#6b7585", fontSize: 11, marginBottom: 5 }}>{t(s.cat)}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {s.items.map((it) => (
              <span key={it} style={{ fontSize: 11, color: c.text, border: `1px solid rgba(255,255,255,0.1)`, padding: "2px 8px", borderRadius: 4 }}>
                {it}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Contact CTA + link buttons. */
export function ContactBar() {
  const t = useT();
  return (
    <div style={{ marginTop: 40, borderTop: `1px solid ${c.border}`, paddingTop: 22 }}>
      <div style={{ color: c.heading, fontSize: 18, fontWeight: 600, marginBottom: 14 }}>
        {t({ en: "Let's talk", ko: "함께 이야기해요" } as any)}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {links.map((lnk) => (
          <a
            key={lnk.label}
            href={lnk.href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              gap: 8,
              alignItems: "center",
              border: `1px solid rgba(255,255,255,0.12)`,
              borderRadius: 6,
              padding: "8px 13px",
              fontSize: 13,
              color: c.text,
              textDecoration: "none",
              transition: "all .15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = c.text; }}
          >
            {lnk.label} <span style={{ color: c.dim }}>{lnk.handle}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
