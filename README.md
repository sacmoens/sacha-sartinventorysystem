# SAIS — on-device app

This is a private, offline version of SAIS. All your artworks, photos, collections,
and admin PIN are stored locally in this browser's storage (IndexedDB) — nothing is
sent anywhere, and it works with no signal at all once installed. It does **not**
share data with the version running in Claude chat; think of this as its own,
separate gallery living on your phone.

## One-time setup: put the files online

Phones need these files served over `https://` (not opened as local files) for the
"install as an app" step to work properly. The easiest free option:

1. Go to https://github.com, and create a free account if you don't have one.
2. Create a new repository (any name, e.g. `sais-app`) and set it to Public.
3. Upload all the files in this folder (`index.html`, `manifest.json`, `sw.js`,
   `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`) using "Add file → Upload files".
4. In the repo, go to **Settings → Pages**, set "Branch" to `main` (or `master`)
   and folder to `/ (root)`, then Save.
5. GitHub gives you a URL like `https://yourname.github.io/sais-app/` — open that on
   your phone once you're online.

(If you'd rather not use GitHub, any static host works the same way — Netlify,
Cloudflare Pages, your own web server, etc.)

## Installing it on your phone

**iPhone (Safari):** open the URL above → tap the Share icon → **Add to Home Screen**.
It'll appear as its own app icon and open full-screen, no browser bar.

**Android (Chrome):** open the URL → tap the ⋮ menu → **Install app** (or
**Add to Home Screen**). Same result — a proper app icon and window.

## After that

Open it from the home screen icon like any other app. The first load needs signal
(to fetch the page and cache it); every time after that it works fully offline.
Your data stays on that one device — there's no sync, no login, no cloud backup.
If you ever clear that browser's site data or uninstall/reinstall, the gallery is
gone, so it's worth using the built-in **Price list → Print / Save as PDF** feature
occasionally as a backup of your catalog.
