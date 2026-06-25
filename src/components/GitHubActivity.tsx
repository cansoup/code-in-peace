import { useT } from "../i18n";
import { colors as c, heatPalette } from "../theme";
import { GITHUB_USERNAME } from "../data/portfolio";
import { useContributions, useRecentCommits } from "../data/contributions";

const CW = 12; // cell size
const GAP = 3;

interface Commit {
  hash: string;
  msg: string;
  repo: string;
  when: { en: string; ko: string };
}

// Illustrative recent commits — replace with real data (e.g. GET
// https://api.github.com/users/<user>/events/public, filter PushEvent).
const COMMITS: Commit[] = [
  { hash: "a1b2c3d", msg: "feat: add bilingual EN/KO toggle to portfolio", repo: "code-in-peace", when: { en: "2h ago", ko: "2시간 전" } },
  { hash: "9f4e210", msg: "refactor: extract contribution heatmap", repo: "code-in-peace", when: { en: "1d ago", ko: "1일 전" } },
  { hash: "7c1a88b", msg: "fix: payslip session token expiry edge case", repo: "hiworks", when: { en: "3d ago", ko: "3일 전" } },
  { hash: "2d9b04f", msg: "docs: storybook usage for Button variants", repo: "hiworks-design-system", when: { en: "5d ago", ko: "5일 전" } },
  { hash: "b6e7c12", msg: "chore: bump vite to 5.x", repo: "code-in-peace", when: { en: "1w ago", ko: "1주 전" } },
];

const stat = (fig: string, label: string) => (
  <div>
    <span style={{ color: c.accent, fontSize: 21, fontWeight: 700 }}>{fig}</span>{" "}
    <span style={{ color: c.muted, fontSize: 11 }}>{label}</span>
  </div>
);

// A single shimmering placeholder block used to build the loading skeleton.
const Bone = ({ w, h, r = 4, style }: { w: number | string; h: number; r?: number; style?: React.CSSProperties }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: c.borderHair,
      animation: "ghActivityPulse 1.4s ease-in-out infinite",
      ...style,
    }}
  />
);

/** Skeleton frame shown while live GitHub data is loading (no random data). */
function ActivitySkeleton() {
  return (
    <>
      {/* Stats row */}
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap", margin: "15px 0 18px" }}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Bone w={52} h={21} />
            <Bone w={72} h={10} />
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div style={{ overflowX: "hidden", paddingBottom: 4 }}>
        <div style={{ display: "flex", gap: GAP }}>
          {Array.from({ length: 30 }, (_, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
              {Array.from({ length: 7 }, (_, di) => (
                <Bone key={di} w={CW} h={CW} r={2} style={{ animationDelay: `${(wi + di) * 40}ms` }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Recent commit rows */}
      <div style={{ borderTop: `1px solid ${c.borderHair}`, marginTop: 16, paddingTop: 14 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "6px 0" }}>
            <Bone w={56} h={11} />
            <Bone w={`${50 - i * 4}%`} h={11} />
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * GitHub activity card: contribution heatmap, streak stats, recent commits.
 * Pass `fetchUrl` to load real contribution data (see data/contributions.ts).
 */
export function GitHubActivity({ fetchUrl }: { fetchUrl?: string }) {
  const t = useT();
  const { data, loading: contribLoading } = useContributions(GITHUB_USERNAME, fetchUrl);
  // Go live for the commit log whenever live contribution data is requested.
  const { commits: liveCommits, loading: commitsLoading } = useRecentCommits(GITHUB_USERNAME, !!fetchUrl);
  const commits: Commit[] = liveCommits ?? COMMITS;
  const usingSample = data.isSample || !liveCommits;
  // While either live fetch is in flight, show a skeleton instead of random
  // sample data so nothing misleading flashes on first load.
  const loading = contribLoading || commitsLoading;

  return (
    <>
      <div style={{ fontSize: 11, letterSpacing: "0.14em", color: c.dim, textTransform: "uppercase", margin: "40px 0 12px" }}>
        // {t({ en: "GitHub Activity", ko: "GitHub 활동" } as any)}
      </div>

      <div style={{ border: `1px solid ${c.border}`, borderRadius: 10, background: c.card, padding: "18px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, color: c.heading, fontSize: 13 }}>
            <span style={{ color: c.accent }}>⎇</span>github.com/{GITHUB_USERNAME}
          </div>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: c.accent, textDecoration: "none" }}>
            {t({ en: "View profile", ko: "프로필 보기" } as any)} →
          </a>
        </div>

        {loading ? <ActivitySkeleton /> : <>
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", margin: "15px 0 18px" }}>
          {stat(data.total.toLocaleString(), t({ en: "contributions", ko: "기여" } as any))}
          {stat(`${data.longestStreak}d`, t({ en: "longest streak", ko: "최장 연속" } as any))}
          {stat(`${data.currentStreak}d`, t({ en: "current streak", ko: "현재 연속" } as any))}
        </div>

        {/* Heatmap */}
        <div style={{ overflowX: "auto", paddingBottom: 4 }}>
          <div style={{ minWidth: data.weeks.length * (CW + GAP) }}>
            <div style={{ display: "flex", gap: GAP, marginBottom: 6 }}>
              {data.months.map((m, i) => (
                <div key={i} style={{ width: m.weeks * (CW + GAP) - GAP, fontSize: 10, color: c.dim, flexShrink: 0 }}>
                  {m.weeks >= 2 ? m.label : ""}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: GAP }}>
              {data.weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                  {week.map((day, di) => (
                    <div key={di} title={`${day.count} commits`} style={{ width: CW, height: CW, borderRadius: 2, background: heatPalette[day.level] }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", marginTop: 8, color: c.dim, fontSize: 10 }}>
          {t({ en: "Less", ko: "적음" } as any)}
          {heatPalette.map((bg, i) => (
            <span key={i} style={{ width: 11, height: 11, borderRadius: 2, background: bg, display: "inline-block" }} />
          ))}
          {t({ en: "More", ko: "많음" } as any)}
        </div>

        {/* Recent commits */}
        <div style={{ borderTop: `1px solid ${c.borderHair}`, marginTop: 16, paddingTop: 14 }}>
          <div style={{ color: c.synComment, fontSize: 11, marginBottom: 8 }}>$ git log --oneline --since="1 week"</div>
          {commits.map((cm, i) => (
            <div key={`${cm.hash}-${i}`} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "5px 0", fontSize: 12, flexWrap: "wrap" }}>
              <span style={{ color: c.synYellow }}>{cm.hash}</span>
              <span style={{ color: c.text, flex: 1, minWidth: 160 }}>{cm.msg}</span>
              <span style={{ color: c.accent, fontSize: 11 }}>{cm.repo}</span>
              <span style={{ color: c.dim, fontSize: 11, whiteSpace: "nowrap" }}>{t(cm.when)}</span>
            </div>
          ))}
        </div>

        {usingSample && (
          <div style={{ color: c.dim, fontSize: 10, marginTop: 12 }}>
            {t({ en: "// Illustrative data — wire to the GitHub API on deploy", ko: "// 예시 데이터 — 배포 시 GitHub API와 연동" } as any)}
          </div>
        )}
        </>}
      </div>
    </>
  );
}
