// Renders the 1200×630 social share cards — the image a link shows when it's
// pasted into iMessage, Slack, LinkedIn, Discord — for both sites:
//
//   public/og.jpg        → dukedaml.com
//   aitp/public/og.jpg   → aitp.dukedaml.com
//
// Run `npm run og-images` after changing the copy below. It lays each card out
// as HTML in the site's own font and mark, screenshots it with headless Chrome,
// and saves a JPEG (JPEG rather than PNG: the glows band visibly when a PNG is
// compressed down to a sensible size).
//
// Needs Google Chrome. Set CHROME to its binary if it isn't in the usual place.

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");

const cards = [
  {
    out: "public/og.jpg",
    title: `Duke's largest<br><span class="g">AI/ML community</span>`,
    sub: "Training, research, and real client projects for 250+ members.",
    url: "dukedaml.com",
  },
  {
    out: "aitp/public/og.jpg",
    tag: "AITP",
    title: `The AI Training<br><span class="g">Program</span>`,
    sub: "10 weeks from ML fundamentals to transformers, generative models, and agents. Every lecture recorded.",
    url: "aitp.dukedaml.com",
  },
];

const chrome =
  process.env.CHROME ??
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((p) => existsSync(p));
if (!chrome) throw new Error("Chrome not found — set CHROME to its binary.");

const fileUrl = (p) => pathToFileURL(join(root, p)).href;
const font = fileUrl(
  "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
);
const mark = fileUrl("public/mark.png");

const page = ({ title, sub, url, tag }) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url("${font}") format("woff2"); font-weight: 100 900; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { font-family: Geist, sans-serif; background: #050d22; color: #fff; position: relative; -webkit-font-smoothing: antialiased; }
.aura { position: absolute; width: 900px; height: 620px; left: -160px; top: -300px; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(22,104,214,.75), transparent); filter: blur(40px); }
.aura2 { position: absolute; width: 620px; height: 460px; right: -160px; bottom: -260px; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(53,200,232,.35), transparent); filter: blur(40px); }
.dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.13) 1.2px, transparent 1.2px);
  background-size: 28px 28px; -webkit-mask-image: radial-gradient(90% 90% at 30% 30%, #000 20%, transparent 75%); }
.glyph { position: absolute; right: -40px; bottom: -70px; width: 520px; height: 470px; background: #fff; opacity: .06;
  -webkit-mask: url("${mark}") center / contain no-repeat; }
.wrap { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; }
.lockup { display: flex; align-items: center; gap: 16px; }
.mark { width: 52px; height: 48px; background: #fff; -webkit-mask: url("${mark}") center / contain no-repeat; }
.word { font-weight: 450; font-size: 22px; line-height: 1.25; letter-spacing: -.005em; }
.tag { margin-left: 4px; padding-left: 16px; border-left: 1px solid rgba(255,255,255,.25); font-size: 22px; font-weight: 450;
  color: rgba(255,255,255,.75); align-self: stretch; display: flex; align-items: center; }
h1 { margin-top: auto; font-weight: 600; font-size: 84px; line-height: 1.02; letter-spacing: -.045em; }
.g { background: linear-gradient(100deg, #9ecbff, #35c8e8); -webkit-background-clip: text; background-clip: text; color: transparent; padding-bottom: .04em; }
.sub { margin-top: 26px; max-width: 760px; font-size: 26px; line-height: 1.4; color: rgba(255,255,255,.72); letter-spacing: -.01em; }
.url { margin-top: 30px; font-size: 20px; font-weight: 500; color: rgba(255,255,255,.55); letter-spacing: .01em; }
</style></head><body>
<div class="aura"></div><div class="aura2"></div><div class="dots"></div><div class="glyph"></div>
<div class="wrap">
  <div class="lockup"><span class="mark"></span><span class="word">Duke Applied<br>Machine Learning</span>${tag ? `<span class="tag">${tag}</span>` : ""}</div>
  <h1>${title}</h1>
  <p class="sub">${sub}</p>
  <p class="url">${url}</p>
</div></body></html>`;

const tmp = mkdtempSync(join(tmpdir(), "og-"));
try {
  for (const card of cards) {
    const html = join(tmp, "card.html");
    const png = join(tmp, "card.png");
    writeFileSync(html, page(card));
    execFileSync(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      "--virtual-time-budget=3000",
      `--screenshot=${png}`,
      pathToFileURL(html).href,
    ], { stdio: "ignore" });
    const { size } = await sharp(png)
      .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(join(root, card.out));
    console.log(`${card.out}  ${Math.round(size / 1024)} KB`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
