// Pulls AITP lesson videos from the DAML YouTube channel into
// src/data/aitp-videos.json. Run by .github/workflows/sync-youtube.yml; to run
// it yourself: YOUTUBE_API_KEY=… node scripts/sync-youtube.mjs
//
// An upload counts as a lesson when its title reads "AITP <year> Lesson <n>…"
// and <year> matches aitpTerm in src/data/aitp.ts, so last year's recordings
// never land on this year's weeks. Lesson n goes on week n. If a week has
// more than one upload (a re-upload), the newest wins. Weeks the channel has
// no video for are left as they are, so a hand-added entry survives.

import { readFile, writeFile } from "node:fs/promises";

const CHANNEL_ID = "UCRg95vpHqJcCu9QohK-WywQ"; // @DukeAppliedMachineLearning
const VIDEOS_FILE = new URL("../src/data/aitp-videos.json", import.meta.url);
const SYLLABUS_FILE = new URL("../src/data/aitp.ts", import.meta.url);

const key = process.env.YOUTUBE_API_KEY;
if (!key) {
  console.error("YOUTUBE_API_KEY is not set.");
  process.exit(1);
}

const term = (await readFile(SYLLABUS_FILE, "utf8")).match(
  /aitpTerm\s*=\s*"[^"]*?(\d{4})"/,
);
if (!term) {
  console.error("Couldn't find the year in aitpTerm in src/data/aitp.ts.");
  process.exit(1);
}
const year = term[1];
const lessonTitle = new RegExp(`^\\s*AITP\\s+${year}\\s+Lesson\\s+(\\d+)\\b`, "i");

// Every channel's uploads sit in a playlist whose id is the channel id with
// "UC" swapped for "UU". Reading it costs 1 unit of the 10,000/day quota.
async function uploads() {
  const items = [];
  let pageToken = "";
  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.search = new URLSearchParams({
      part: "snippet",
      playlistId: "UU" + CHANNEL_ID.slice(2),
      maxResults: "50",
      key,
      ...(pageToken && { pageToken }),
    });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`YouTube API ${res.status}: ${await res.text()}`);
    const page = await res.json();
    items.push(...page.items);
    pageToken = page.nextPageToken ?? "";
  } while (pageToken);
  return items;
}

const videos = JSON.parse(await readFile(VIDEOS_FILE, "utf8"));
const before = JSON.stringify(videos);
const newest = {};

for (const { snippet } of await uploads()) {
  const match = snippet.title.match(lessonTitle);
  if (!match) continue;
  const week = String(Number(match[1]));
  const published = snippet.publishedAt;
  if (newest[week] && newest[week] > published) continue;
  newest[week] = published;
  videos[week] = { id: snippet.resourceId.videoId, title: snippet.title.trim() };
}

const sorted = Object.fromEntries(
  Object.entries(videos).sort(([a], [b]) => Number(a) - Number(b)),
);

const previous = JSON.parse(before);
const changed = Object.keys(sorted).filter(
  (week) => JSON.stringify(sorted[week]) !== JSON.stringify(previous[week]),
);

if (changed.length === 0) {
  console.log("No new lesson videos.");
} else {
  await writeFile(VIDEOS_FILE, JSON.stringify(sorted, null, 2) + "\n");
  console.log("Updated weeks:", changed.join(", "));
}
