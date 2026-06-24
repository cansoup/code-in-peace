// Design tokens for the "Editor" (Direction B) portfolio.
// All values are lifted verbatim from the HTML prototype.

export const colors = {
  // surfaces
  bg: "#14171c", // editor canvas
  sidebar: "#0f1216", // explorer / tab bar / status strip bg
  card: "#171b21", // project & activity cards
  border: "rgba(255,255,255,0.07)",
  borderSoft: "rgba(255,255,255,0.05)",
  borderHair: "rgba(255,255,255,0.06)",

  // text
  heading: "#e6ebf2",
  text: "#cdd3de",
  muted: "#8b94a3",
  dim: "#5b6472",
  gutter: "#3b414d", // line numbers

  // accent
  accent: "#5b9dff", // primary blue
  accentSoftBg: "rgba(91,157,255,0.08)",
  accentSoftBorder: "rgba(91,157,255,0.18)",

  // syntax highlighting (about.tsx code block)
  synComment: "#5c6370",
  synKeyword: "#c792ea",
  synProp: "#82aaff",
  synString: "#c3e88d",
  synPunct: "#7c8693",
  synNumber: "#f78c6c",
  synEquals: "#89ddff",
  synYellow: "#f0c674", // file icons / commit hashes
  synGreen: "#42b883", // .vue file icons

  // status bar
  statusBg: "#5b9dff",
  statusText: "#0a1020",
} as const;

// GitHub contribution heatmap — 5-step blue scale (level 0..4)
export const heatPalette = [
  "rgba(255,255,255,0.05)",
  "#0e3a6b",
  "#1a56a8",
  "#2f7ae0",
  "#5b9dff",
] as const;

export const font =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

export const radius = { sm: 4, md: 6, lg: 10 } as const;

// Load JetBrains Mono once (e.g. in index.html or a global stylesheet):
// <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
