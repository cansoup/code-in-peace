import { useLang, type Lang } from "../i18n";

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
  color: active ? "#0a0c0e" : "#9aa4ad",
  background: active ? "#eaefeb" : "transparent",
});

/** EN / KO segmented toggle. */
export function LangToggle() {
  const { lang, setLang } = useLang();
  const opts: Lang[] = ["en", "ko"];
  return (
    <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.05)", padding: 4, borderRadius: 9 }}>
      {opts.map((o) => (
        <button key={o} onClick={() => setLang(o)} style={btn(lang === o)}>
          {o.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
