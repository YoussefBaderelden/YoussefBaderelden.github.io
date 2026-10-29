# Yousef Badr — 60-Second Showreel

A real, playable 60-second promo lives at `public/promo.html`. It is a 1920×1080 animated showreel with narration, music, captions, and every portfolio detail. Record it with OBS or Windows Game Bar and you have an MP4 ready for LinkedIn, GitHub, and your site.

Deployed URL after your next push: **https://youssefbaderelden.github.io/promo.html**

**Also ready now:** `public/yousef-badr-showcase.mp4` — native vertical 1080×1920, 30 fps, 48.24 s, H.264/AAC, with the 3D avatar, voiceover, music, captions, and all 13 apps. No recording needed. It is a showreel, not a lip-synced talking head; use HeyGen/D-ID with `public/me/youssef.jpg` if you want a talking avatar.

### Ready-made MP4 timeline (48 s, 9:16)

| Time | Scene |
|---|---|
| 0:00–0:05 | Hook — “Not a tutorial profile. Apps that go LIVE.” |
| 0:05–0:13 | Identity — Yousef Badr, Cairo, TKDS MENA, education, experience, stack |
| 0:13–0:23 | 13 live products, 4 platforms, Agora / WebRTC / NDI / RTMP |
| 0:23–0:34 | All 13 app cards + Score Cue + App Store / Google Play / Microsoft Store |
| 0:34–0:41 | Production code quality — BLoC, Riverpod, clean architecture, Firebase, payments |
| 0:41–0:48 | CTA — web, WhatsApp, email, GitHub, LinkedIn, portfolio URL |

Re-render it any time with `python scripts/generate_video.py` (uses `public/voiceover-mixed.mp3`).

---

## 1) Watch it

- Double-click `public/promo.html`, or run `npm run dev` and open `/promo.html`.
- Click **Play showreel**. Sound on. Use **Fullscreen**.
- Controls: Pause · Replay · Voice On/Off · Music On/Off · Fullscreen.
- Keyboard: `Space` play/pause · `R` replay · `F` fullscreen.

Preview any frame without playing: `promo.html?t=26&clean=1` (time in seconds, `clean=1` hides the top bar).

---

## 2) Record it (1080p, 60 seconds)

1. Open the page in Chrome or Edge.
2. Start OBS (or Windows Game Bar: `Win + G`) — **1920×1080, 60 fps**, record the browser window.
3. Click **Play showreel**, then **do not move the mouse** (controls and cursor hide after 2.2 seconds).
4. Stop recording at **1:00**, when the progress bar is full and the contact card is on screen.
5. Export H.264 MP4, 1080p, 60 fps.

Tip: record in fullscreen for the cleanest frame. The top bar keeps your name and scene number; the controls fade out.

---

## 3) The exact 60-second timeline (HTML promo, 16:9)

| Time | Scene | On screen | Narration / caption |
|---|---|---|---|
| 0:00–0:05 | Hook | “Most devs build demos. I ship LIVE products.” + live dot | Most Flutter developers build demos. I ship live products. |
| 0:05–0:12 | Who | 3D avatar, YOUSEF BADR, Cairo, TKDS MENA, Zagazig | I'm Yousef Badr — mid-level Flutter engineer in Cairo. At TKDS MENA I own production apps end to end. |
| 0:12–0:20 | Numbers | 13 live products · 20+ apps · 4 platforms · Nov '25 | 13 live products. 20+ apps built. 4 platforms: iOS, Android, Windows, web. |
| 0:20–0:32 | The work | All 13 app logos, store platforms | Fizz Party · TKDS Streamer · NGN · BikMedia · Pasty · TKDS Radio · TKDS Sports · TKDS VAR — real users, real stores, real payments. |
| 0:32–0:40 | The stack | Flutter, Agora, WebRTC, NDI, RTMP, FFmpeg, Firebase, BLoC, Riverpod, payments | Agora · WebRTC · NDI · RTMP · FFmpeg · Firebase · BLoC · Riverpod · Clean Architecture. |
| 0:40–0:47 | Track record | TKDS MENA, BikMedia, DEPI, Route, D-HUB + Zagazig University | Zagazig University computer engineering → broadcast tools for sports networks and live platforms. |
| 0:47–0:53 | Proof | “SHIPPED, NOT TUTORIAL WORK.” + App Store / Google Play / Microsoft Store | Published on the App Store, Google Play, and Microsoft Store. Shipped, not tutorial work. |
| 0:53–1:00 | Contact | Avatar, email, phone, GitHub, LinkedIn, portfolio URL | Looking for a Flutter engineer who ships? Let's talk. youssefbaderelden.github.io |

---

## 4) All portfolio details included

- **Identity:** Yousef Badr, mid-level Flutter engineer, Cairo, Egypt.
- **Current role:** TKDS MENA, Nov 2025 – Present, remote, broadcasting & streaming.
- **Stats:** 13 live products, 20+ apps built, 4 platforms (iOS · Android · Windows · Web), Android TV.
- **Live apps:** Fizz Party, TKDS Streamer, NGN (National Golf Network), TKDS Sports, BikMedia, TKDS Radio, TKDS VAR, Pasty, Sports Flix, Maadi Sports, ASN TV, Southwest Ohio, PlayTooWin.
- **Ops tool:** Score Cue.
- **Stores:** App Store, Google Play, Microsoft Store.
- **Stack:** Flutter & Dart, Clean Architecture, BLoC/Cubit, Riverpod, Agora RTC, WebRTC, NDI, RTMP, FFmpeg, Socket.IO, Firebase, REST, payments, subscriptions, in-app purchases, FCM, Hive, Git/GitHub, Figma.
- **Experience:** TKDS MENA, BikMedia, DEPI, Route Academy, Digital HUB.
- **Education:** Zagazig University, Faculty of Engineering, Computer Engineering, 3rd year, Very Good, Oct 2022 – Aug 2027.
- **Languages:** Arabic (native), English (intermediate).
- **Contact:** yousefhasham512@gmail.com · +20 114 606 6036 · github.com/YoussefBaderelden · linkedin.com/in/yousef-bader-el-den · youssefbaderelden.github.io.

---

## 5) Voice: built-in vs your own

The page uses the browser's built-in text-to-speech so it works offline with no API keys. It is a placeholder, not your real voice.

**Option A — your own voice (best):**
1. Click **Voice Off** in the top bar.
2. Record yourself reading the narration table above (or use ElevenLabs with your cloned voice).
3. Add the voiceover in CapCut / Premiere / DaVinci and keep the music low under it.

**Option B — AI avatar (HeyGen / D-ID / Synthesia):**
1. Upload `public/me/youssef.jpg` as the avatar source.
2. Use the master prompt and 45-second script in `MARKETING_VIDEO_PROMPT.md`.
3. Put the avatar in a corner during the b-roll, or use it as a full-screen talking head.

---

## 6) Vertical version (Reels / TikTok / Shorts)

A native 9:16 MP4 is already rendered: `public/yousef-badr-showcase.mp4` (1080×1920, 48 s). Use it directly for Reels, TikTok, Shorts, and LinkedIn vertical. To re-render after editing content, run `python scripts/generate_video.py`.

The 60-second HTML showreel is natively 16:9. For a 9:16 recording of that version, record 16:9 and reframe in CapCut, or ask me to add a native 9:16 layout (`?format=vertical`).

---

## 7) Post copy

> I don't build demo apps. I ship live products.
> 13 apps live on the App Store, Google Play and Microsoft Store — live streaming, sports media, payments, VAR.
> Flutter · Agora · WebRTC · NDI · RTMP · Firebase · BLoC · Riverpod
> Portfolio → youssefbaderelden.github.io
> #Flutter #FlutterDeveloper #MobileDevelopment #LiveStreaming #Cairo #Egypt #Hiring #AppDevelopment
