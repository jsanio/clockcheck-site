# clockcheck.app

The public website for ClockCheck: a home page, Support, Privacy Policy and a 404 page. Plain HTML and one stylesheet, served by GitHub Pages. Built the same way as [artkeeper.app](https://github.com/jsanio/artkeeper-site).

No analytics, no cookies, no tracking and no third-party requests: the fonts (Figtree and Instrument Serif) are self-hosted in `assets/fonts/` under the SIL Open Font License. The privacy policy promises no tracking, so keep it that way.

There is no Terms of Use page on purpose: the app uses Apple's standard licence agreement (https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

## Files

| Path | What it is |
| --- | --- |
| `index.html`, `support/`, `privacy/`, `404.html` | The built pages (committed, served as they are) |
| `assets/site.css` | The one stylesheet. All colours and font families are custom properties at the top; they match `src/theme.ts` in the app repo |
| `assets/fonts/` | Self-hosted woff2 fonts (Latin subset) and their licences |
| `favicon-32.png`, `apple-touch-icon.png`, `assets/icon-*.png` | Resized from the app icon (`assets/icon.png` in the app repo) |
| `images/screens/` | The six app screens for the home page carousel, each in a light (`01.png`) and a dark (`01-dark.png`) version, 720px-wide PNGs |
| `CNAME` | `clockcheck.app`, for GitHub Pages |
| `_src/` | Page content. `_src/legal/privacy.html` holds the Privacy Policy |
| `build.py` | Wraps `_src/` pages in the shared header and footer (Python 3, standard library only) |
| `_config.yml` | Keeps `README.md` and `build.py` off the public site (`_src/` is skipped because it starts with `_`) |

## Editing

1. Change a page in `_src/` (or the stylesheet).
2. Run `python3 build.py`.
3. Preview, then commit.

**Look:** Saffron Studio, unchanged from the app (ivory and navy, one saffron hero, Instrument Serif for headlines, the watch dial as the motif). If the app's palette changes, change the tokens at the top of `assets/site.css` to match.

**Legal text:** never edit the Privacy Policy by hand in the built page. Replace `_src/legal/privacy.html` with the newly approved file and run `python3 build.py`. The build copies the `<body>` exactly.

**Light and dark:** the whole site follows the device's setting (`prefers-color-scheme`), with no manual switch, and it also follows Increase Contrast. The carousel does too: each screen is a `<picture>` whose dark `<source>` loads when the device is in dark mode, so a dark-mode visitor sees dark app screens. It swaps live if the setting changes while the page is open. Contrast was measured on 2026-11-02 for all four combinations (light, dark, and each with Increase Contrast); every text and icon pair meets WCAG AA.

**App screens on the home page:** `images/screens/01.png` to `06.png` (light) and `01-dark.png` to `06-dark.png` (dark) are shown in a swipeable carousel, each inside an iPhone frame drawn in CSS (bezel, Dynamic Island and side buttons; `.phone` in `assets/site.css`). The frame is flat, in two tokens (`--device`, `--device-edge`), so it works in light and dark. To change a screen, replace both its PNGs (light and dark), update its alt text (keep it free of "light" or "dark", since either may show) and caption in `_src/home.html` (the `screens:start` comment explains), and run `python3 build.py`. The build refuses a `TODO` alt or a missing dark image, and leaves the whole section out if no images exist. The previous/next buttons are the only script on the site (they only appear with a mouse; touch and trackpad scroll and snap on their own).

How the current six were made (2026-11-02): iPhone 15 Pro simulator on iOS 27 running the app (`premium` branch, build 1.1.0 (10)), status bar set to 9:41 with `xcrun simctl status_bar <device> override --time 9:41 --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularBars 4`, developer tools turned off, each screen captured in both appearances (`xcrun simctl ui <device> appearance light` / `dark`) with `xcrun simctl io <device> screenshot`, then resized to 720px wide (the simulator's capture has no Dynamic Island, so the frame draws it). The Check and Result screens are the app's real screens; the Result is a genuine ClockCheck reading from one of Jason's Explorer recordings (−5.1 s/day, 28,800 bph, 159/160 ticks; recording 4 in the 2026-10-22 timegrapher session). The Watch Box screens use **sample watches and checks** seeded into the simulator's `watch-box.db`, and the page says so under the carousel. Redo them whenever the app's look changes; the App Store screenshots (task T6 in the app repo's `docs/LAUNCH-PLAN.md`) can use the same captures.

## Open items after launch

- **The Privacy Policy went live as drafted on 2026-11-05**, on Jason's go-ahead to launch the site. It came from the app repo's `docs/launch/legal/privacy-policy.md`, with the bracketed notes resolved for the beta period (TestFlight builds are in use). Jason still reviews the final wording at J10 in the launch plan; when the text changes, replace `_src/legal/privacy.html`, update its "Last updated" date, and rebuild.
- **Claims to confirm** (same list as `docs/launch/app-store-listing.md` in the app repo): "never saved or uploaded" is only true once the testing tools are off (`DIAGNOSTICS_ENABLED`, task T7); "try it with one watch for free" (`FREE_WATCH_LIMIT = 1`); $1 / $10 prices; mechanical watches only; no accuracy claims beyond what the app says.

## Before the public App Store launch (task T7)

1. In `_src/legal/privacy.html`, delete the **Test versions only** section and the TestFlight sentence under **Apple**, once the testing tools are off and no test builds ship.
2. In `_src/home.html`, replace the "Coming soon" badge with Apple's official badge linking to the App Store page (the `TODO(launch)` comment has the steps).
3. Add the App Store screenshots (above).
4. In the app repo, set `LINKS.privacy` in `src/links.ts` to `https://clockcheck.app/privacy`.

## Preview locally

```bash
cd /Users/jason/Documents/Claude/clockcheck-site
python3 -m http.server 8001
```

Open http://localhost:8001. (Python's server doesn't show `404.html` for missing pages; open http://localhost:8001/404.html to see it. GitHub Pages uses it automatically.)

## Publishing on GitHub Pages

Same steps that worked for artkeeper.app (domain verified, HTTPS enforced). GitHub recommends verifying the domain **first**, and adding it to the repository **before** pointing DNS at GitHub, so nobody else can claim it.

1. **Verify the domain** (account-wide, once). On GitHub: profile picture > **Settings** > **Pages** > **Add a domain** > `clockcheck.app` > **Add domain**. GitHub shows a TXT record; add it at Spaceship (below), wait for it to resolve, then click **Verify**. Keep that TXT record for good.
2. **Create a public repository** `jsanio/clockcheck-site`, add it as this folder's remote and push `main`. (GitHub Pages on a free account needs a public repo.)
3. **Turn on Pages.** Repository > **Settings** > **Pages** > "Build and deployment" > **Source: Deploy from a branch** > branch **main**, folder **/(root)** > **Save**.
4. **Custom domain.** Same page, under "Custom domain": enter `clockcheck.app` > **Save**. (The `CNAME` file in this folder already says `clockcheck.app`.)
5. **Add the DNS records** at Spaceship (below).
6. **Enforce HTTPS.** Back on the Pages settings, tick **Enforce HTTPS** once it's available (up to 24 hours after DNS is set).
7. Check https://clockcheck.app, https://www.clockcheck.app (redirects to the apex), /privacy and /support.

## DNS records at Spaceship

Spaceship > Domains > clockcheck.app > **Advanced DNS**. First remove any parking or default `A`, `AAAA` or `CNAME` records on `@` and `www` that point elsewhere. **Leave any MX or email TXT records alone**: they carry hello@clockcheck.app (Spaceship's email forwarding).

| Type | Host | Value | Notes |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | |
| A | `@` | `185.199.109.153` | |
| A | `@` | `185.199.110.153` | |
| A | `@` | `185.199.111.153` | |
| AAAA | `@` | `2606:50c0:8000::153` | |
| AAAA | `@` | `2606:50c0:8001::153` | |
| AAAA | `@` | `2606:50c0:8002::153` | |
| AAAA | `@` | `2606:50c0:8003::153` | |
| CNAME | `www` | `jsanio.github.io` | The account's Pages domain, no repository name |
