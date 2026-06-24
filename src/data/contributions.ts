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

// ---------------------------------------------------------------------------
// Recent commits (real data)
// ---------------------------------------------------------------------------

export interface RecentCommit {
  hash: string;
  msg: string;
  repo: string;
  when: { en: string; ko: string };
}

/** Format an ISO timestamp as a bilingual relative-time string. */
function relativeTime(iso: string): { en: string; ko: string } {
  const diffSec = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  const min = Math.floor(diffSec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const week = Math.floor(day / 7);
  if (week >= 1) return { en: `${week}w ago`, ko: `${week}주 전` };
  if (day >= 1) return { en: `${day}d ago`, ko: `${day}일 전` };
  if (hour >= 1) return { en: `${hour}h ago`, ko: `${hour}시간 전` };
  if (min >= 1) return { en: `${min}m ago`, ko: `${min}분 전` };
  return { en: "just now", ko: "방금 전" };
}

/**
 * Returns the user's most recent public push commits, newest first, or `null`
 * while loading / on error (so the caller can fall back to sample data).
 * Uses GitHub's public events API (no token; 60 req/hr per IP, CORS-enabled).
 */
export function useRecentCommits(username: string, enabled = true, max = 5): RecentCommit[] | null {
  const [commits, setCommits] = useState<RecentCommit[] | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
        const events = await res.json();
        if (!Array.isArray(events)) return;
        const out: RecentCommit[] = [];
        for (const ev of events) {
          if (ev.type !== "PushEvent") continue;
          const repo: string = (ev.repo?.name ?? "").split("/").pop() ?? "";
          const pushed: { sha?: string; message?: string }[] = ev.payload?.commits ?? [];
          // The last entry in a push payload is the newest commit.
          for (let i = pushed.length - 1; i >= 0 && out.length < max; i--) {
            const cm = pushed[i];
            if (!cm?.sha) continue;
            out.push({
              hash: cm.sha.slice(0, 7),
              msg: (cm.message ?? "").split("\n")[0],
              repo,
              when: relativeTime(ev.created_at),
            });
          }
          if (out.length >= max) break;
        }
        if (alive && out.length) setCommits(out);
      } catch {
        /* keep null → caller falls back to sample */
      }
    })();
    return () => { alive = false; };
  }, [username, enabled, max]);

  return commits;
}
