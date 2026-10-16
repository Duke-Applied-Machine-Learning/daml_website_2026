# Duke Applied Machine Learning — website

A rebuild of the DAML site in [Astro](https://astro.build). Same content and
routes as the previous Next.js app, redesigned in a modern product/startup
register — deliberately its own thing rather than a sibling of
[dukeaibusiness.com](https://www.dukeaibusiness.com).

Astro was chosen over Next because every page here is static: the site ships as
plain HTML with **no framework runtime**, and the only JavaScript on a page is
~1.5 KB of inline script (header settle, mobile menu, scroll reveals, the team
tabs, and the AITP site's click-to-play lessons). The component model is still
there for authoring.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve dist/ locally
npm run check    # type-check .astro and .ts
```

`dist/` is a folder of static files — deployable to Vercel, Netlify, Cloudflare
Pages, or GitHub Pages with no adapter or server.

## The AITP site (`aitp/`)

A second, standalone site for the AI Training Program, meant for
**aitp.dukedaml.com**. It has no `package.json` of its own; it runs from this
repo's root and reuses the main site's stylesheet, layout, nav, footer, and
data through the `@/` alias, so the two stay one design.

```bash
npm run dev:aitp     # http://localhost:4322 — runs alongside the main site on 4321
npm run build:aitp   # → aitp/dist/
npm run check:aitp
```

**The syllabus** lives in `src/data/aitp.ts`, which feeds both this site and
the main site's `/recruitment` page. Each week can carry 0–3 optional `readings`
(title, source, description, url), which show as "Optional reading" on the AITP syllabus
only. **Lesson videos** live in
`src/data/aitp-videos.json`, keyed by week. A GitHub Action fills that in from
the YouTube channel every 3 hours, for uploads titled "AITP <year> Lesson N: …"
(setup steps in [YOUTUBE-SYNC-SETUP.md](YOUTUBE-SYNC-SETUP.md)). To add one by
hand, add `"N": { "id", "title" }` to the file (the id is the part after
`watch?v=`). The hero's latest-lecture player and the lesson grid
both update from it.

**Deploying:** create a second project on your host (Vercel, Netlify, etc.)
from this same repo, with build command `npm run build:aitp` and output
directory `aitp/dist`, then point the `aitp` subdomain at it.

## Layout

```
src/
  data/         content and configuration — edit these, not the markup
    site.ts       org name, email, join-form URL, social links, nav links
    team.ts       exec, outreach, marketing: name, team, role, major, year, headshot
    projects.ts   every project: title, blurb, term, team, links, screenshot key
    companies.ts  alumni employers (homepage rail) and past project partners
                  (logo wall on home + /partner)
    images.ts     maps the data files' string keys onto optimised images
  assets/       photographs; Astro converts these to sized WebP at build time
  components/   Nav, Hero, PageHero, SectionHead, Cta, ProjectCard, TeamGrid,
                Footer
  layouts/
    Base.astro    <head>, nav, CTA plate + footer, reveal observer
  pages/        one file per route
  styles/
    global.css    the entire design system — tokens at the top
public/         served verbatim: favicon.png, mark.png (the δαμλ glyph)
```

### Routes

| Route            | Page                                    |
| ---------------- | --------------------------------------- |
| `/`              | Home                                    |
| `/mission`       | Mission                                 |
| `/recruitment`   | AI Training Program                      |
| `/projects`      | Projects                                |
| `/team`          | The team                                |
| `/partner`       | Partner With Us                         |
| `/404`           | Not found                               |

The old site's `/students` and `/partnerWithUs` redirect to `/team` and
`/partner`, so existing links and indexed pages keep working. Hosts that read
redirect config serve a real 301: `vercel.json` (Vercel), `netlify.toml`
(Netlify) and `public/_redirects` (Cloudflare Pages). Delete the ones for hosts
you don't use. On any other host, the `redirects` block in `astro.config.mjs`
still forwards visitors with a fallback page.

Both sites also publish a `sitemap-index.xml` (via `@astrojs/sitemap`) and a
`robots.txt` pointing to it.

## Editing content

Most changes are a data file, not markup.

**Add a team member** — add a row to `src/data/team.ts` with its `team`
(`"Exec"`, `"Outreach"` or `"Marketing"` — each is a tab on `/team`), and drop the
headshot in `src/assets/headshots/` named `First_Last.jpg`. The `photo` field
is that filename. Leave `photo` off and the card falls back to `blank.jpg`;
`major` and `year` are optional too.

**Add a project** — add an entry to `src/data/projects.ts`. `shot` is a filename
inside `src/assets/project_images/`; omit it and the card falls back to the DAML
glyph on a tinted panel, which keeps a mixed grid evenly weighted. `tier:
"featured"` is what promotes a project onto the homepage.

**Add a company logo** — drop a transparent PNG in
`src/assets/companies/alumni/` or `src/assets/companies/partners/` and add a
row to `src/data/companies.ts`. Logos are auto-sized to equal visual area, so
a wide wordmark and a square mark sit evenly.

**Change the social share image** — the 1200×630 card shown when a link is
pasted into iMessage, Slack, LinkedIn, etc. Each site has its own:
`public/og.jpg` and `aitp/public/og.jpg`. Edit the copy at the top of
`scripts/make-og-images.mjs` and run `npm run og-images` (needs Google Chrome).

**Change the join form, contact address, or socials** — `src/data/site.ts`, in
one place. `navLinks` there also drives the header, mobile menu, footer, and
404 page at once.

## Design notes

The register is a product site, not an editorial one: bold tight display type,
rounded surfaces on soft elevation, and a single gradient carrying the brand
from Duke navy through a signal blue to cyan.

- **Type is one face: Geist.** Display runs semibold with tight negative
  tracking; body and UI run at text tracking. Buttons are pills, surfaces are
  hairline-bordered with soft, low shadows.
- **Labels are badges, not eyebrows.** Every section opens with a pill
  carrying a gradient dot — a control, not a caption. Numbered items get a
  rounded `chip` for the same reason.
- **One phrase per headline runs in the gradient** (`<span class="mark">`).
  The stops differ by ground on purpose: cyan measures under 2:1 on white and
  cannot carry text there, so the light ramp stops at the signal blue (5.4:1)
  and only dark grounds get cyan.
- **The δαμλ mark** is painted with `currentColor` through a CSS mask rather
  than shipped as two coloured PNGs, so it crosses white → ink with the
  wordmark beside it as one lockup. It reappears oversized and at 7% opacity
  behind the CTA plate.
- **Layout avoids the row-of-N.** The homepage's "what we do" is a bento grid
  (two wide cards over three narrow), the syllabus is a stack of cards rather
  than a table.
- **The page closes on a gradient plate**, not a dark slab — the CTA is a
  rounded panel that sits above a light footer.

The header is a full-width glass bar pinned to the top. On the homepage its ground and its type
both settle as you scroll away from the dark hero (two scroll-linked custom
properties, with the type crossover confined to a narrow smoothstepped band so
the ambiguous mid-colour never becomes a resting state). Pages that open on a
light hero pass `solidNav` and skip the script entirely.

All colours, type, radii, shadows, and spacing are custom properties at the top
of `src/styles/global.css`.

## Not carried over

Two routes from the old site were left behind:

- `/leadership` — superseded by `/team`, and its data had gone stale
  (it listed people who are no longer on the executive team).
- `/portfolio` — a stub behind a "site under development" banner, holding one
  embedded iframe.

Neither was linked from the old navigation. The old app is still in `../DAML`
if anything needs recovering.
