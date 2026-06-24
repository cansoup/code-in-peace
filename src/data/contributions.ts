// GitHub contribution data.
//
// GitHub's official REST API does NOT expose the contribution calendar.
// Two practical options to get REAL data:
//
//   1) GraphQL API (needs a token):
//      POST https://api.github.com/graphql
//      query($login:String!){ user(login:$login){
//        contributionsCollection{ contributionCalendar{
//          totalContributions
//          weeks{ contributionDays{ date contributionCount } }
//        }}}}
//      Header: Authorization: bearer <PAT with read:user>
//      ⚠ Never ship a token to the client — proxy this through a serverless
//        function / your backend and call that endpoint from the app.
//
//   2) A public proxy (no token), e.g. github-contributions-api.jogruber.de:
//      GET https://github-contributions-api.jogruber.de/v4/<username>?y=last
//      → { total: {...}, contributions: [{ date, count, level }] }
//
// Until that's wired, useContributions() returns deterministic sample data so
// the UI renders identically to the design prototype.

import { useEffect, useState } from "react";

export interface ContribDay {
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContribData {
  weeks: ContribDay[][]; // 53 weeks × 7 days
  total: number;
  longestStreak: number;
  currentStreak: number;
  months: { label: string; weeks: number }[];
  isSample: boolean;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const levelOf = (c: number): ContribDay["level"] =>
  c === 0 ? 0 : c <= 2 ? 1 : c <= 4 ? 2 : c <= 6 ? 3 : 4;

/** Build ContribData (streaks, month labels) from a flat list of daily counts. */
function build(counts: number[], endDate = new Date()): Omit<ContribData, "isSample"> {
  const WEEKS = 53;
  const weeks: ContribDay[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const days: ContribDay[] = [];
    for (let d = 0; d < 7; d++) {
      const c = counts[w * 7 + d] ?? 0;
      days.push({ count: c, level: levelOf(c) });
    }
    weeks.push(days);
  }

  let longestStreak = 0, run = 0, currentStreak = 0;
  for (const c of counts) { if (c > 0) { run++; if (run > longestStreak) longestStreak = run; } else run = 0; }
  for (let i = counts.length - 1; i >= 0; i--) { if (counts[i] > 0) currentStreak++; else break; }

  const start = new Date(endDate);
  start.setDate(start.getDate() - (WEEKS - 1) * 7 - endDate.getDay());
  const months: { label: string; weeks: number }[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const dt = new Date(start);
    dt.setDate(dt.getDate() + w * 7);
    const last = months[months.length - 1];
    const label = MONTHS[dt.getMonth()];
    if (!last || last.label !== label) months.push({ label, weeks: 1 });
    else last.weeks++;
  }

  return { weeks, total: counts.reduce((a, b) => a + b, 0), longestStreak, currentStreak, months };
}

/** Deterministic pseudo-random sample (matches the prototype, seed 1337). */
function sampleCounts(): number[] {
  let seed = 1337;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const counts: number[] = [];
  for (let w = 0; w < 53; w++) {
    for (let d = 0; d < 7; d++) {
      const r = rnd();
      const weekend = d === 0 || d === 6;
      let c = Math.floor(Math.pow(r, weekend ? 2.6 : 1.6) * 9);
      if (r < 0.14) c = 0;
      counts.push(c);
    }
  }
  return counts;
}

export const sampleContributions = (): ContribData => ({
  ...build(sampleCounts(), new Date(2026, 5, 23)),
  isSample: true,
});

/**
 * Returns contribution data. Pass a `fetchUrl` (option 2 above) to load real
 * data; otherwise you get the deterministic sample. On any fetch error it
 * silently falls back to the sample so the section always renders.
 */
export function useContributions(username: string, fetchUrl?: string): ContribData {
  const [data, setData] = useState<ContribData>(sampleContributions);

  useEffect(() => {
    if (!fetchUrl) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch(fetchUrl);
        const json = await res.json();
        // Shape for github-contributions-api.jogruber.de v4:
        const days: { count: number }[] = json.contributions ?? [];
        const counts = days.map((d) => d.count);
        if (alive && counts.length) setData({ ...build(counts), isSample: false });
      } catch {
        /* keep sample */
      }
    })();
    return () => { alive = false; };
  }, [username, fetchUrl]);

  return data;
}
