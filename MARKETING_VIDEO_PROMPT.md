# Yousef Badr — AI Marketing Video Prompt Pack

Source of truth: portfolio (`src/data.ts`, `src/components/Hero.tsx`, `src/index.css`) and photos in `public/me/`.

Brand look: dark tech-noir, teal `#4AD4C2`, live red `#E30613`, HUD / glitch / broadcast style.
Core hook: **"Not a junior profile — 13 live products."**

**Ready-to-record 60-second showreel:** open `public/promo.html` (or `/promo.html` on the live site). It includes all 13 apps, the full stack, experience, education, and contact details, with narration, music, and captions. Recording steps are in `VIDEO_SCRIPT.md`.

**Ready-made vertical MP4:** `public/yousef-badr-showcase.mp4` — 1080×1920, 30 fps, 48.24 s, 3D avatar + voiceover + music + captions + all 13 apps. Re-render with `python scripts/generate_video.py`. It is a showreel, not a lip-synced talking head; use the master prompt below for that.

---

## 1) MASTER PROMPT — Avatar video (HeyGen / Synthesia / D-ID)

Paste into the avatar tool and upload `public/me/youssef.jpg` as the avatar source.

> Create a 45-second vertical 9:16 marketing video (also render 16:9). Presenter: Yousef Badr, Egyptian man, late 20s, short curly dark hair, black rectangular glasses, light beard, navy suit, white shirt, navy tie — use the uploaded photo for face identity. Background: dark studio, deep charcoal `#0A0E14`, thin tech grid, soft teal rim light `#4AD4C2`, one small pulsing red LIVE dot `#E30613`, subtle glass HUD panels with faint code and streaming-signal lines. Tone: confident, warm, mid-tempo, Egyptian-accented English, natural hand gestures, direct eye contact, slight smile. Camera: medium shot, 35mm, shallow depth of field. Add auto captions in bold white with teal keywords. No background music louder than the voice — use a low cinematic tech pulse. End card: "Yousef Badr — Flutter Engineer" + "youssefbaderelden.github.io" + App Store / Google Play / Microsoft Store icons.

---

## 2) SCRIPT (45s)

| Time | Spoken line | On-screen text |
|---|---|---|
| 0:00–0:04 | "Most Flutter developers build apps. I build apps that go **live**." | LIVE • 13 PRODUCTS |
| 0:04–0:12 | "I'm Yousef Badr, a mid-level Flutter engineer in Cairo. At TKDS MENA I own production mobile apps end to end." | MID-LEVEL FLUTTER ENGINEER · CAIRO |
| 0:12–0:22 | "Thirteen live products on iOS, Android, Windows and web. Live streaming with Agora, WebRTC, NDI and RTMP — the stack real broadcasters use." | 13 LIVE · 4 PLATFORMS |
| 0:22–0:31 | "Fizz Party. TKDS Streamer. National Golf Network. BikMedia. Pasty. Real users, real stores, real payments." | App logos grid |
| 0:31–0:38 | "Clean architecture, BLoC and Riverpod, Firebase, subscriptions and in-app purchases. Shipped — not tutorial work." | SHIPPED, NOT TUTORIAL |
| 0:38–0:45 | "Looking for a Flutter engineer who actually ships? Let's talk." | youssefbaderelden.github.io |

**30s cut:** keep lines 1, 2, 3 (trimmed), 5, 6.

**Arabic hook option (first 3s):** "أغلب مطوري Flutter بيعملوا تطبيقات. أنا بعمل تطبيقات بتشتغل لايف."

---

## 3) B-ROLL PROMPTS — Sora / Veo / Runway / Kling

Style block (append to every shot):

> Cinematic tech-noir, deep charcoal `#0A0E14`, teal `#4AD4C2` accent light, broadcast red `#E30613` live indicator, glass HUD panels, thin grid, subtle film grain and scanlines, 35mm lens, shallow depth of field, 24fps, realistic, no text artifacts, no watermark.

1. **Hook:** "Extreme close-up of a smartphone screen going LIVE, red pulsing dot, teal signal rings expanding, dark room, reflections on glasses."
2. **Establish:** "Cairo skyline at blue hour from a dark modern apartment, laptop glow, teal rim light, slow push-in."
3. **Scale:** "Thirteen glowing mobile app icons floating in a dark 3D grid, teal holographic connections between them, camera orbit."
4. **Broadcast:** "Phone on a tripod streaming to a broadcast monitor showing OBS/vMix multi-view, NDI signal lines, red tally light, operator's hands."
5. **Sports:** "Live sports control room, VAR replay timeline on a large screen, multiple camera angles, teal UI, dramatic lighting."
6. **Product:** "Close-up of a cake customization app on a phone — shapes, layers, colors — warm pastry shop bokeh behind."
7. **Payments:** "Payment success animation on a phone, teal checkmark, subtle particle burst, dark UI."
8. **CTA:** "Confident Egyptian developer with glasses and navy suit in dark studio, teal rim light, arms crossed, slow push-in, direct eye contact."

**Negative prompt:** `cartoon, anime, distorted hands, extra fingers, warped face, text gibberish, logos, watermark, oversaturated, low resolution`

---

## 4) Marketing copy

**Thumbnail text:** `13 LIVE APPS` / `NOT A JUNIOR PROFILE`

**Caption:**

> I don't build demo apps. I ship live products.
> 13 apps live on the App Store, Google Play and Microsoft Store — live streaming, sports media, payments, VAR.
> Flutter · Agora · WebRTC · NDI · RTMP · Firebase · BLoC · Riverpod
> Portfolio → youssefbaderelden.github.io
> #Flutter #FlutterDeveloper #MobileDevelopment #LiveStreaming #Cairo #Egypt #Hiring #AppDevelopment

**Workflow:** HeyGen/D-ID for the talking head (real photo), Sora/Veo for shots 1–7, edit in CapCut, keep the avatar in a corner overlay during b-roll, end on the portfolio URL.
