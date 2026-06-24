import { useT } from "../i18n";
import { colors as c, font } from "../theme";
import { profile } from "../data/portfolio";

/**
 * The `about.tsx` code block — a faux source file with syntax highlighting and
 * a gutter of line numbers. Purely presentational.
 */
export function AboutCode() {
  const t = useT();
  const S = {
    cm: { color: c.synComment } as React.CSSProperties,
    kw: { color: c.synKeyword } as React.CSSProperties,
    pr: { color: c.synProp } as React.CSSProperties,
    st: { color: c.synString } as React.CSSProperties,
    pu: { color: c.synPunct } as React.CSSProperties,
    nu: { color: c.synNumber } as React.CSSProperties,
    eq: { color: c.synEquals } as React.CSSProperties,
  };
  const lines = 14;

  return (
    <div style={{ display: "flex", lineHeight: 1.75, fontFamily: font, fontSize: 13 }}>
      <div
        style={{
          color: c.gutter,
          textAlign: "right",
          paddingRight: 16,
          userSelect: "none",
          borderRight: `1px solid ${c.borderSoft}`,
          minWidth: 34,
        }}
      >
        {Array.from({ length: lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div style={{ paddingLeft: 18, flex: 1, minWidth: 0, overflowX: "auto" }}>
        <div><span style={S.cm}>/**</span></div>
        <div><span style={S.cm}> * {profile.name} — {t(profile.role)}</span></div>
        <div><span style={S.cm}> * 5+ years · enterprise web · design ∩ engineering</span></div>
        <div><span style={S.cm}> */</span></div>
        <div><span style={S.kw}>const</span> <span style={S.pr}>minha</span> <span style={S.eq}>=</span> <span style={S.pu}>{"{"}</span></div>
        <div>{"  "}<span style={S.pr}>role</span><span style={S.pu}>:</span> <span style={S.st}>"{t(profile.role)}"</span><span style={S.pu}>,</span></div>
        <div>{"  "}<span style={S.pr}>based</span><span style={S.pu}>:</span> <span style={S.st}>"{t(profile.based)}"</span><span style={S.pu}>,</span></div>
        <div>{"  "}<span style={S.pr}>focus</span><span style={S.pu}>:</span> <span style={S.pu}>[</span><span style={S.st}>"design systems"</span>, <span style={S.st}>"DX"</span>, <span style={S.st}>"performance"</span><span style={S.pu}>]</span><span style={S.pu}>,</span></div>
        <div>{"  "}<span style={S.pr}>stack</span><span style={S.pu}>:</span> <span style={S.pu}>[</span><span style={S.st}>"React"</span>, <span style={S.st}>"Next.js"</span>, <span style={S.st}>"Vue"</span>, <span style={S.st}>"TypeScript"</span><span style={S.pu}>]</span><span style={S.pu}>,</span></div>
        <div>{"  "}<span style={S.pr}>studying</span><span style={S.pu}>:</span> <span style={S.st}>"M.IT @ UTS Sydney — data analytics"</span><span style={S.pu}>,</span></div>
        <div>{"  "}<span style={S.pr}>available</span><span style={S.pu}>:</span> <span style={S.nu}>true</span><span style={S.pu}>,</span></div>
        <div><span style={S.pu}>{"}"}</span></div>
        <div>&nbsp;</div>
        <div><span style={S.kw}>export</span> <span style={S.kw}>default</span> <span style={S.pr}>minha</span></div>
      </div>
    </div>
  );
}
