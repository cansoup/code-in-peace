// Design tokens for the "Editor" (Direction B) portfolio.
// All values are lifted verbatim from the HTML prototype.

export const colors = {
  // surfaces — warm cream / orange-tinted editor theme
  bg: "#faf4ec", // editor canvas
  sidebar: "#f4ebdf", // explorer / tab bar / status strip bg
  card: "#fdfaf5", // project & activity cards
  border: "rgba(0,0,0,0.10)",
  borderSoft: "rgba(0,0,0,0.06)",
  borderHair: "rgba(0,0,0,0.07)",

  // text
  heading: "#1f2328",
  text: "#2b2f36",
  muted: "#6b7280",
  dim: "#9aa0a6",
  gutter: "#aeb4ba", // line numbers

  // accent — warm orange to match the theme + contribution heatmap
  accent: "#c0762f", // primary orange
  accentSoftBg: "rgba(192,118,47,0.10)",
  accentSoftBorder: "rgba(192,118,47,0.22)",

  // syntax highlighting (about.tsx code block)
  synComment: "#8a948c",
  synKeyword: "#bf7434", // import / export / const / type …
  synProp: "#6f42c1",
  synString: "#3f8f2f",
  synPunct: "#57606a",
  synNumber: "#b5632a",
  synEquals: "#1f7a8c",
  synYellow: "#9a7d1a", // file icons / commit hashes
  synGreen: "#3aa876", // .vue file icons

  // status bar
  statusBg: "#c0762f",
  statusText: "#faf4ec",

  // interaction overlays (hover / pressed) — dark wash for the light theme
  hover: "rgba(0,0,0,0.05)",
  hoverStrong: "rgba(0,0,0,0.08)",
} as const;

// GitHub contribution heatmap — 5-step orange scale (level 0..4)
export const heatPalette = [
  "rgba(0,0,0,0.06)",
  "#fbd6a0",
  "#f0a64a",
  "#d97f2c",
  "#a85a18",
] as const;

export const font =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

export const radius = { sm: 4, md: 6, lg: 10 } as const;

// Load JetBrains Mono once (e.g. in index.html or a global stylesheet):
// <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
