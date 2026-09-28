# SAIS — on-device app

This is a private, offline version of SAIS. All your artworks, photos, collections,
artist profiles, and admin PIN are stored locally in this browser's storage
(IndexedDB) — nothing is sent anywhere, and it works with no signal at all once
installed. It does **not** share data with the version running in Claude chat;
think of this as its own, separate gallery living on your phone.

## Before you publish: edit apply.html

`apply.html` is the mobile submission form artists fill out on their own phone.
Open it in a text editor and find the `CONFIG` block near the top of the
`<script>` section:

```js
const CONFIG = {
  orgName: "Sacha's Wunderkammer",
  orgEmail: "hello@sachaswunderkammer.com",   // <-- your real inbox
  commissionPct: 40,                           // <-- your commission %
  deliveryInfo: "arranged directly with you after you submit",
  collectionDays: 14
};
```

Update `orgEmail` and `commissionPct` (and the other lines if you like) before
sharing the link with anyone — these are baked into the agreement text artists
read and sign.

## One-time setup: put the files online

Phones need these files served over `https://` (not opened as local files) for
"install as an app" and the share sheet to work properly. The easiest free option:

1. Go to https://github.com, and create a free account if you don't have one.
2. Create a new repository (any name, e.g. `sais-app`) and set it to Public.
3. Upload all the files in this folder (`index.html`, `apply.html`, `gallery.html`,
   `manifest.json`, `gallery-manifest.json`, `sw.js`, `gallery-sw.js`,
   `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`) using
   "Add file → Upload files".
4. In the repo, go to **Settings → Pages**, set "Branch" to `main` (or `master`)
   and folder to `/ (root)`, then Save.
5. GitHub gives you a URL like `https://yourname.github.io/sais-app/` — open that
   on your phone once you're online.

(If you'd rather not use GitHub, any static host works the same way — Netlify,
Cloudflare Pages, your own web server, etc.)

## Installing the main app on your phone

**iPhone (Safari):** open the URL above → tap the Share icon → **Add to Home Screen**.
It'll appear as its own app icon and open full-screen, no browser bar.

**Android (Chrome):** open the URL → tap the ⋮ menu → **Install app** (or
**Add to Home Screen**). Same result — a proper app icon and window.

## Sending artists the submission form

Once hosted, the form lives at `.../apply.html` (e.g.
`https://yourname.github.io/sais-app/apply.html`). Inside the app, unlock admin
mode and open **Artists** — there's a "Copy" button there with this exact link
ready to send. Artists open it on their own phone, fill in their details and
artworks, sign, and tap Send — it opens their phone's native share sheet
(Mail, WhatsApp, Messages, whatever they have) with a small file attached.

To bring a submission into your app: open **Artists → Import submission…** and
pick the file they sent you. It creates their artist profile and drafts their
artworks, ready for you to review, add photos to, and publish. The raw
submission (including their signature) is also kept as an attached document on
whichever collection you file it under.

## What's new in this round

- **Manage menu** — Collections, Artists, Backup, and Publish now live behind
  one "Manage" button instead of crowding the header. "+ Add artwork" is the
  one obvious action.
- **Remember this device** — checked by default when you enter your PIN, so
  you won't be asked for it every time you reopen the app on your own phone.
  Turn it off any time from Manage → "Forget this device."
- **Updates apply automatically now** — you still need to re-upload changed
  files, but the app itself no longer needs the old close-and-reopen-twice
  trick; it reloads itself once when a new version is ready.
- **Share this artwork** — in any artwork's detail view, this generates a
  clean image card (photo, title, artist, specifics, price or status) sized
  for sharing, and opens your phone's native share sheet — WhatsApp, Mail,
  Messages, whatever you've got. Available in both the admin app and the
  public gallery.

- **Download Artlogic file (.xlsx)** — in Price List, next to Print/Save as PDF.
  Exports whichever artworks are currently shown (respecting the collection and
  sold/not-for-sale filters) into a spreadsheet shaped exactly like Artlogic's
  own bulk-import template, ready to upload there. Only artist, title, year,
  dimensions, and price are filled in — every other column in Artlogic's
  template is left blank for you to fill in there if needed. This needs an
  internet connection at the moment you export (it loads a small library to
  build the file) — offline, you'll get a clear message instead of a broken file.

## The agreement builder

`contract.html` is a separate, general-purpose tool — it's not tied to your
gallery specifically, and doesn't touch any of your app's data. Anyone can open
it, fill in both parties' names, set the sales split (artist / gallery / an
optional third share for a pool or venue fee), delivery and collection terms,
and sign with a finger-drawn signature, then use **Print / Save as PDF** to get
a document both sides can keep. The Artists panel has a Copy-link button for it,
same as the submission form link. It's a plain template, not legal advice —
that disclaimer is printed on the document itself too.

## Letting visitors browse on their own phones

There are now two separate pages once you host this folder:

- **`index.html`** — your private admin app, exactly as before.
- **`gallery.html`** — a public, read-only page anyone can open on their own phone.
  No login, no admin data. It shows titles, artists, years, materials, dimensions,
  prices, and photos — never artist contact details, bios, attached documents, or
  anything from your private tools.

Nothing syncs automatically. You edit privately, and when you're ready for
visitors to see the update, you tap **Publish** (in the admin strip). That copies
a snapshot of your current collections and artworks to a file called
`catalog.json`, which `gallery.html` reads. Until you publish again, visitors keep
seeing whatever was last published — there's no live connection to your phone.

### One-time setup for Publish

Publishing writes that snapshot file into the same GitHub repository you're
already hosting this app on, so it needs a personal access token:

1. Go to https://github.com/settings/tokens/new while signed into the same
   GitHub account.
2. Give it any name, set an expiration you're comfortable with, and check the
   **repo** permission box (just that one).
3. Generate it, and copy the token (it's only shown once).
4. In the app, unlock admin mode → **Publish** → paste your GitHub username, the
   repository name (e.g. `sais-app`), and the token → Save.
5. Tap **Publish now**. The first publish creates `catalog.json` in your repo
   automatically — nothing else to configure.

The token is stored only on your device, the same as everything else in this app.

### Sharing the gallery link

Once you've published at least once, the Publish panel shows a direct link —
something like `https://yourname.github.io/sais-app/gallery.html` — with a Copy
button. Visitors can open it in any browser, browse or swipe through the
collections, and even add it to their own home screen the same way you did with
the main app.



## After that

Open the app from the home screen icon like any other app. The first load needs
signal (to fetch the page and cache it); every time after that it works fully
offline. Your data stays on that one device — there's no sync, no login, no cloud
backup. If you ever clear that browser's site data or uninstall/reinstall, the
gallery is gone, so use the built-in **Backup** feature (in the admin strip)
regularly, and keep the exported file somewhere safe.
