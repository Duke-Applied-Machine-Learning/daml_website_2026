# YouTube sync — setup checklist

A GitHub Action checks the DAML YouTube channel every 3 hours and adds new AITP
lesson videos to the AITP site on its own. It needs a one-time setup before it
can run.

## To do

- [ ] **1. Get a YouTube API key** (free, about 5 minutes)
  - [ ] Go to [console.cloud.google.com](https://console.cloud.google.com) and
        create a project, for example "DAML website".
  - [ ] Under **APIs & Services → Library**, find **YouTube Data API v3** and
        click **Enable**.
  - [ ] Under **APIs & Services → Credentials**, click **Create credentials →
        API key** and copy the key.
  - [ ] Optional: edit the key and, under **API restrictions**, limit it to
        YouTube Data API v3.

- [ ] **2. Add the key to GitHub**
  - [ ] In the repo, go to **Settings → Secrets and variables → Actions → New
        repository secret**.
  - [ ] Name: `YOUTUBE_API_KEY`. Value: the key from step 1.

- [ ] **3. Push the sync files** if they aren't on GitHub yet:
      `.github/workflows/sync-youtube.yml`, `scripts/sync-youtube.mjs`,
      `src/data/aitp-videos.json` and `src/data/aitp.ts`.

- [ ] **4. Test it**
  - [ ] On the repo's **Actions** tab, open **Sync YouTube lessons** and click
        **Run workflow**.
  - [ ] It should finish green and print "No new lesson videos." (weeks 1–4 are
        already on the site). A red run usually means the secret is missing or
        the API isn't enabled; the log says which.

- [ ] **5. Connect hosting** (Vercel, Cloudflare Pages, etc.) so every push to
      `main` redeploys the AITP site. Without this, the sync commits new videos
      but the live site won't change.

## Good to know

- **Title your lesson uploads "AITP 2026 Lesson N: …"**, for example
  "AITP 2026 Lesson 5: Deep Learning". Lesson N goes on week N. Uploads with
  other titles are ignored.
- **The year comes from `aitpTerm`** in `src/data/aitp.ts`. Update it each new
  term, or the new term's videos won't be picked up.
- **Re-uploads:** if two uploads claim the same lesson, the newer one wins.
- **Adding a video by hand** still works: edit `src/data/aitp-videos.json`. The
  sync never removes entries.
- **The schedule pauses after 60 days without activity.** GitHub does this for
  quiet repos, which matters over summer break. Re-enable it on the Actions tab
  when the next term starts.
- **Running it locally:** `YOUTUBE_API_KEY=your-key node scripts/sync-youtube.mjs`
