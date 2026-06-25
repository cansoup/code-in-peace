import { useLang, type Lang } from "../i18n";
import { colors as c } from "../theme";

const btn = (active: boolean): React.CSSProperties => ({
  cursor: "pointer",
  border: "none",
  fontFamily: "inherit",
  fontSize: 11,
  fontWeight: 600,
  padding: "6px 11px",
  borderRadius: 6,
  whiteSpace: "nowrap",
  transition: "all .15s",
  color: active ? c.statusText : c.muted,
  background: active ? c.accent : "transparent",
});

/** EN / KO segmented toggle. */
export function LangToggle() {
  const { lang, setLang } = useLang();
  const opts: Lang[] = ["en", "ko"];
  return (
    <div style={{ display: "flex", gap: 3, background: c.hover, padding: 4, borderRadius: 9 }}>
      {opts.map((o) => (
        <button key={o} onClick={() => setLang(o)} style={btn(lang === o)}>
          {o.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
