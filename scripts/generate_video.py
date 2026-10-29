import os
import sys
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1080, 1920
FPS = 30
DURATION = 48.24
TOTAL_FRAMES = int(FPS * DURATION)

# Colors
BG_COLOR = (10, 14, 20)           # #0A0E14
TEAL = (74, 212, 194)             # #4AD4C2
TEAL_MUTED = (35, 110, 100)
LIVE_RED = (227, 6, 19)           # #E30613
TEXT_WHITE = (245, 248, 250)
TEXT_MUTED = (140, 160, 175)
CARD_BG = (16, 23, 34, 210)
BORDER_LINE = (35, 48, 65, 255)

font_bold = "C:/Windows/Fonts/segoeuib.ttf"
font_mono = "C:/Windows/Fonts/consola.ttf"
font_reg = "C:/Windows/Fonts/segoeui.ttf"

fonts = {
    "huge": ImageFont.truetype(font_bold, 86),
    "stat": ImageFont.truetype(font_bold, 130),
    "title": ImageFont.truetype(font_bold, 50),
    "subtitle": ImageFont.truetype(font_bold, 36),
    "body": ImageFont.truetype(font_bold, 28),
    "body_sm": ImageFont.truetype(font_bold, 26),
    "caption": ImageFont.truetype(font_bold, 32),
    "mono": ImageFont.truetype(font_mono, 22),
    "mono_sm": ImageFont.truetype(font_mono, 18),
    "mono_lg": ImageFont.truetype(font_mono, 26),
    "app": ImageFont.truetype(font_bold, 22),
    "app_sub": ImageFont.truetype(font_mono, 15),
    "badge": ImageFont.truetype(font_mono, 13),
}

def make_transparent(path):
    """Remove the connected white studio background from the 3D avatar."""
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()
    from collections import deque
    queue = deque()
    for x in range(w):
        queue.append((x, 0))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
    seen = set()
    while queue:
        x, y = queue.popleft()
        if (x, y) in seen:
            continue
        seen.add((x, y))
        r, g, b, a = px[x, y]
        if r > 232 and g > 232 and b > 232:
            px[x, y] = (r, g, b, 0)
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen:
                    queue.append((nx, ny))
    return img

def circle_avatar(img, size):
    img = img.resize((size, size), Image.Resampling.LANCZOS).convert("RGBA")
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out

def remove_white_bg(img):
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    from collections import deque
    queue = deque()
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
    seen = set()
    while queue:
        x, y = queue.popleft()
        if (x, y) in seen:
            continue
        seen.add((x, y))
        r, g, b, a = px[x, y]
        if r > 235 and g > 235 and b > 235:
            px[x, y] = (r, g, b, 0)
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen:
                    queue.append((nx, ny))
    return img

def prep_icon(img):
    img = remove_white_bg(img)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    img.thumbnail((110, 110), Image.Resampling.LANCZOS)
    return img

# Load assets
def load_assets():
    assets = {}
    if os.path.exists("public/me/youssef-avatar-3d.png"):
        assets["avatar"] = make_transparent("public/me/youssef-avatar-3d.png")
    if os.path.exists("public/me/youssef.jpg"):
        assets["photo"] = Image.open("public/me/youssef.jpg").convert("RGBA")
    
    apps = [
        ("fizz-party", "Fizz Party", "Live social · iOS/Android"),
        ("tkds-streamer", "TKDS Streamer", "RTMP · NDI · iOS/Android"),
        ("ngn", "NGN", "National Golf Network"),
        ("tkds-media-core", "TKDS Sports", "Sports media · iOS/Android"),
        ("bikmedia", "BikMedia", "Agora · filters · iOS/Android"),
        ("tkds-radio", "TKDS Radio", "Internet radio · Android"),
        ("tkds-var", "TKDS VAR", "Video review · Windows"),
        ("pasty", "Pasty", "Cake customizer · iOS/Android"),
        ("sportsflix", "Sports Flix", "Sports streaming · Android"),
        ("maadi-sports", "Maadi Sports", "Club sports · Android"),
        ("antlersn", "ASN TV", "Sports network · Android"),
        ("southwest-ohio", "Southwest Ohio", "Regional sports · Android"),
        ("playtoowin", "PlayTooWin", "Live bingo · Web"),
    ]
    assets["apps"] = []
    for slug, name, sub in apps:
        path = f"public/apps/{slug}.png"
        img = None
        if os.path.exists(path):
            img = prep_icon(Image.open(path).convert("RGBA"))
        assets["apps"].append({"name": name, "sub": sub, "img": img})
    return assets

# Precompute background grid
def create_base_bg():
    bg = Image.new("RGBA", (W, H), (10, 14, 20, 255))
    draw = ImageDraw.Draw(bg)
    grid_spacing = 60
    for x in range(0, W, grid_spacing):
        draw.line([(x, 0), (x, H)], fill=(20, 30, 42, 255), width=1)
    for y in range(0, H, grid_spacing):
        draw.line([(y, 0), (W, y)], fill=(20, 30, 42, 255), width=1)
    return bg

BASE_BG = create_base_bg()

# Draw HUD telemetry
def draw_hud(draw, t, frame_idx):
    # Top bar
    pulse = (math.sin(t * 8) + 1) * 0.5
    live_alpha = int(180 + pulse * 75)
    
    # Red Live Indicator
    draw.ellipse([50, 75, 74, 99], fill=(227, 6, 19, live_alpha))
    draw.text((88, 73), "LIVE BROADCAST", fill=TEXT_WHITE, font=fonts["mono"])
    draw.text((310, 73), "//  TKDS MENA CORE", fill=TEAL, font=fonts["mono"])

    # Timecode & Tech Telemetry
    mins = int(t // 60)
    secs = int(t % 60)
    frames = int((t % 1) * 30)
    tc = f"{mins:02d}:{secs:02d}:{frames:02d}"
    draw.text((W - 320, 73), f"REC ● {tc}", fill=(227, 6, 19), font=fonts["mono"])
    draw.text((W - 130, 73), "1080P", fill=TEXT_MUTED, font=fonts["mono"])

    # Divider line
    draw.line([(50, 120), (W - 50, 120)], fill=(35, 48, 65, 255), width=2)
    draw.line([(50, 120), (50 + int((t / DURATION) * (W - 100)), 120)], fill=TEAL, width=3)

    # Audio frequency visualization at bottom right of top bar
    for i in range(12):
        bx = 580 + i * 14
        bh = int(8 + 16 * math.sin(t * 12 + i * 0.8) ** 2)
        draw.line([(bx, 105), (bx, 105 - bh)], fill=TEAL if i < 9 else LIVE_RED, width=4)

# Draw Captions at bottom
def draw_caption(draw, text_plain, highlight_word, t):
    box_y = 1660
    draw.rounded_rectangle([60, box_y, W - 60, box_y + 150], radius=24, fill=(14, 20, 30, 235), outline=(40, 56, 75, 255), width=2)
    
    # Draw terminal prompt icon
    draw.text((95, box_y + 24), "SYS_SUBTITLE //", fill=TEAL, font=fonts["mono_sm"])

    # Word highlight parsing
    draw.text((95, box_y + 60), text_plain, fill=TEXT_WHITE, font=fonts["caption"])

def wrap_text(draw, text, font, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textlength(test, font=font) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines

# Scene 1: Hook (0.0 - 5.5s)
def render_scene_1(frame, draw, t, assets):
    # Floating avatar in center
    float_y = int(math.sin(t * 3) * 15)
    avatar = assets.get("avatar")
    if avatar:
        # Resize avatar into a clean circular portrait
        av_w, av_h = 750, 750
        scaled = circle_avatar(avatar, av_w)
        # Glow ring behind
        glow_r = int(320 + math.sin(t * 4) * 20)
        draw.ellipse([W//2 - glow_r, 680 + float_y - glow_r, W//2 + glow_r, 680 + float_y + glow_r], outline=(74, 212, 194, 60), width=4)
        draw.ellipse([W//2 - glow_r + 30, 680 + float_y - glow_r + 30, W//2 + glow_r - 30, 680 + float_y + glow_r - 30], outline=(74, 212, 194, 30), width=2)
        draw.ellipse([W//2 - av_w//2 - 4, 380 + float_y - 4, W//2 + av_w//2 + 4, 380 + float_y + av_h + 4], outline=TEAL, width=3)
        frame.paste(scaled, (W//2 - av_w//2, 380 + float_y), scaled)

    # Big typography hook
    draw.text((70, 180), "NOT A TUTORIAL PROFILE.", fill=TEXT_MUTED, font=fonts["subtitle"])
    draw.text((70, 235), "APPS THAT GO LIVE.", fill=TEAL, font=fonts["huge"])

    # Stat tag
    draw.rounded_rectangle([70, 1260, 480, 1340], radius=18, fill=(74, 212, 194, 25), outline=TEAL, width=2)
    draw.text((95, 1285), "● 13 PRODUCTION APPS", fill=TEXT_WHITE, font=fonts["mono_lg"])

    draw_caption(draw, "Most Flutter developers build apps.\nI build apps that go LIVE.", "LIVE", t)

# Scene 2: Identity & Role (5.5 - 13.5s)
def render_scene_2(frame, draw, t, assets):
    st = t - 5.5
    # Avatar upper center
    avatar = assets.get("avatar")
    if avatar:
        scaled = circle_avatar(avatar, 580)
        draw.ellipse([W//2 - 294, 206, W//2 + 294, 794], outline=TEAL, width=3)
        frame.paste(scaled, (W//2 - 290, 210), scaled)

    # Dossier Card
    card_y = 820
    draw.rounded_rectangle([60, card_y, W - 60, card_y + 740], radius=28, fill=(16, 24, 36, 235), outline=(40, 60, 80, 255), width=2)
    
    draw.text((100, card_y + 40), "ENGINEERING DOSSIER //", fill=TEAL, font=fonts["mono"])
    draw.text((100, card_y + 85), "Yousef Badr", fill=TEXT_WHITE, font=fonts["huge"])
    draw.text((100, card_y + 190), "MID-LEVEL FLUTTER ENGINEER", fill=TEAL, font=fonts["subtitle"])
    draw.text((100, card_y + 245), "Cairo, Egypt · TKDS MENA", fill=TEXT_MUTED, font=fonts["body"])

    draw.line([(100, card_y + 310), (W - 100, card_y + 310)], fill=(35, 50, 70), width=2)

    # Stats row in card
    draw.text((100, card_y + 340), "PRODUCTION SCOPE:", fill=TEXT_WHITE, font=fonts["mono_lg"])
    bullets = [
        "13 live products · iOS · Android · Windows · Web",
        "TKDS MENA · Nov '25 – Present · remote broadcast",
        "BikMedia · DEPI · Route Academy · Digital HUB",
        "Zagazig University · Computer Engineering · 3rd year",
        "Agora · WebRTC · NDI · RTMP · Firebase · payments",
    ]
    for i, line in enumerate(bullets):
        draw.text((100, card_y + 390 + i * 44), "• " + line, fill=TEXT_MUTED, font=fonts["body_sm"])

    # Shipped badge
    draw.rounded_rectangle([100, card_y + 610, 480, card_y + 690], radius=16, fill=(227, 6, 19, 35), outline=LIVE_RED, width=2)
    draw.text((130, card_y + 635), "● ACTIVE BROADCAST", fill=TEXT_WHITE, font=fonts["mono_lg"])

    draw_caption(draw, "I'm Yousef Badr, mid-level Flutter engineer in Cairo.\nAt TKDS MENA I own production mobile apps end to end.", "TKDS MENA", t)

# Scene 3: 13 Live Products & Broadcast Stack (13.5 - 23.5s)
def render_scene_3(frame, draw, t, assets):
    st = t - 13.5
    draw.text((70, 180), "PROVEN SCALE", fill=TEXT_MUTED, font=fonts["mono"])
    draw.text((70, 230), "13 LIVE PRODUCTS", fill=TEAL, font=fonts["huge"])

    # Platform pills
    platforms = ["iOS", "Android", "Windows", "Web"]
    px = 70
    for p in platforms:
        draw.rounded_rectangle([px, 340, px + 190, 410], radius=18, fill=(20, 30, 45, 230), outline=TEAL_MUTED, width=2)
        draw.text((px + 45, 360), p, fill=TEXT_WHITE, font=fonts["body"])
        px += 220

    # Tech Stack Cards
    stack = [
        ("AGORA RTC", "Sub-second multi-participant video & audio rooms", TEAL),
        ("WEBRTC", "Ultra-low latency real-time streaming transmission", (56, 189, 248)),
        ("LOCAL NDI", "Direct phone camera feed injected into OBS & vMix", (245, 197, 66)),
        ("RTMP / LIVE", "Direct broadcaster ingest & high-bitrate streaming", LIVE_RED),
    ]

    sy = 470
    for title, desc, col in stack:
        draw.rounded_rectangle([70, sy, W - 70, sy + 180], radius=22, fill=(16, 24, 36, 230), outline=(40, 58, 80), width=2)
        # Accent left strip
        draw.rounded_rectangle([70, sy, 85, sy + 180], radius=8, fill=col)
        draw.text((115, sy + 30), title, fill=col, font=fonts["title"])
        draw.text((115, sy + 95), desc, fill=TEXT_MUTED, font=fonts["body"])
        sy += 210

    # Shipped counter box
    draw.rounded_rectangle([70, 1340, W - 70, 1580], radius=24, fill=(12, 26, 32), outline=TEAL, width=2)
    draw.text((110, 1370), "REAL BROADCASTER PIPELINE", fill=TEAL, font=fonts["mono"])
    lines = wrap_text(
        draw,
        "Zero hobby demos — battle-tested code running in live TV & stadium matches.",
        fonts["body"],
        W - 220,
    )
    for i, line in enumerate(lines):
        draw.text((110, 1420 + i * 40), line, fill=TEXT_WHITE, font=fonts["body"])
    draw.text((110, 1518), "App Store · Google Play · Microsoft Store", fill=TEXT_MUTED, font=fonts["mono_sm"])

    draw_caption(draw, "13 live products on iOS, Android, Windows & web.\nAgora, WebRTC, NDI & RTMP — what real broadcasters use.", "broadcasters", t)

# Scene 4: App Showcase Grid (23.5 - 34.0s)
def render_scene_4(frame, draw, t, assets):
    st = t - 23.5
    draw.text((70, 180), "LIVE IN STORES", fill=TEXT_MUTED, font=fonts["mono"])
    draw.text((70, 230), "13 LIVE PRODUCTS", fill=TEAL, font=fonts["huge"])
    draw.text((70, 330), "20+ APPS BUILT · APP STORE · GOOGLE PLAY · MICROSOFT STORE", fill=TEXT_MUTED, font=fonts["mono_sm"])

    apps = assets.get("apps", [])
    cols = 3
    card_w, card_h = 308, 200
    gap_x, gap_y = 18, 18
    start_x, start_y = 60, 380
    for i, app_data in enumerate(apps[:13]):
        row = i // cols
        col = i % cols
        ax = start_x + col * (card_w + gap_x)
        ay = start_y + row * (card_h + gap_y)
        if i == 12:
            ax = start_x + (960 - card_w) // 2

        draw.rounded_rectangle([ax, ay, ax + card_w, ay + card_h], radius=20, fill=(16, 24, 36, 235), outline=(40, 60, 80), width=2)
        draw.rounded_rectangle([ax + 16, ay + 14, ax + 84, ay + 82], radius=14, fill=(22, 32, 44), outline=(40, 60, 80), width=1)
        if app_data.get("img"):
            icon = app_data["img"].copy()
            icon.thumbnail((64, 64), Image.Resampling.LANCZOS)
            frame.paste(icon, (ax + 18 + (64 - icon.width) // 2, ay + 16 + (64 - icon.height) // 2), icon)
        draw.text((ax + 18, ay + 92), app_data["name"], fill=TEXT_WHITE, font=fonts["app"])
        draw.text((ax + 18, ay + 124), app_data["sub"], fill=TEXT_MUTED, font=fonts["app_sub"])
        draw.rounded_rectangle([ax + 18, ay + 156, ax + 136, ay + 184], radius=10, fill=TEAL, outline=TEAL, width=1)
        draw.text((ax + 30, ay + 163), "● LIVE", fill=BG_COLOR, font=fonts["badge"])

    draw.rounded_rectangle([60, 1470, W - 60, 1550], radius=18, fill=(20, 30, 45, 230), outline=BORDER_LINE, width=2)
    draw.text((90, 1490), "REAL USERS · REAL STORES · REAL PAYMENTS", fill=TEXT_WHITE, font=fonts["mono_lg"])
    draw.text((90, 1520), "Also Score Cue — live scoring ops tool · Flutter · Agora · WebRTC · NDI", fill=TEXT_MUTED, font=fonts["mono_sm"])

    draw_caption(draw, "Fizz Party, TKDS Streamer, National Golf Network,\nBikMedia, Pasty. Real users, real stores, real payments.", "Real stores", t)

# Scene 5: Engineering Architecture (34.0 - 41.0s)
def render_scene_5(frame, draw, t, assets):
    st = t - 34.0
    draw.text((70, 180), "PRODUCTION CODE QUALITY", fill=TEXT_MUTED, font=fonts["mono"])
    draw.text((70, 230), "CLEAN ARCHITECTURE", fill=TEAL, font=fonts["huge"])

    items = [
        ("STATE MANAGEMENT", "BLoC · Cubit · Riverpod · GetX · Provider"),
        ("ARCHITECTURE", "Clean Architecture · MVVM · Repository · DI"),
        ("BACKEND", "Firebase Auth · Firestore · FCM · REST APIs"),
        ("MEDIA & MONETIZATION", "Agora · WebRTC · NDI · RTMP · payments"),
    ]

    iy = 360
    for cat, desc in items:
        draw.rounded_rectangle([70, iy, W - 70, iy + 165], radius=20, fill=(16, 24, 36, 230), outline=(40, 58, 80), width=2)
        draw.text((110, iy + 25), cat, fill=TEAL, font=fonts["title"])
        draw.text((110, iy + 85), desc, fill=TEXT_MUTED, font=fonts["body"])
        iy += 195

    # Big statement box
    draw.rounded_rectangle([70, 1180, W - 70, 1480], radius=26, fill=(40, 8, 14), outline=LIVE_RED, width=3)
    draw.text((120, 1225), "PRODUCTION FACT:", fill=LIVE_RED, font=fonts["mono_lg"])
    draw.text((120, 1280), "SHIPPED TO STORES.", fill=TEXT_WHITE, font=fonts["huge"])
    draw.text((120, 1380), "NOT TUTORIAL REPOSITORIES.", fill=TEXT_MUTED, font=fonts["subtitle"])
    draw.text((120, 1440), "13 live products · 20+ apps · 4 platforms", fill=TEXT_MUTED, font=fonts["mono_sm"])

    draw_caption(draw, "Clean architecture, BLoC and Riverpod, Firebase,\nsubscriptions & in-app purchases. Shipped code.", "Shipped code", t)

# Scene 6: CTA & End Card (41.0 - 48.24s)
def render_scene_6(frame, draw, t, assets):
    st = t - 41.0
    
    # Avatar with glowing halo
    avatar = assets.get("avatar")
    if avatar:
        scaled = circle_avatar(avatar, 480)
        draw.ellipse([W//2 - 244, 196, W//2 + 244, 684], outline=TEAL, width=3)
        frame.paste(scaled, (W//2 - 240, 200), scaled)

    draw.text((W//2 - 220, 700), "YOUSEF BADR", fill=TEXT_WHITE, font=fonts["huge"])
    draw.text((W//2 - 240, 800), "MID-LEVEL FLUTTER ENGINEER", fill=TEAL, font=fonts["subtitle"])

    # CTA Card
    draw.rounded_rectangle([70, 880, W - 70, 1420], radius=28, fill=(16, 24, 36, 245), outline=TEAL, width=2)
    draw.text((110, 930), "13 LIVE PRODUCTS · 20+ APPS · 4 PLATFORMS", fill=TEAL, font=fonts["mono"])
    draw.text((110, 980), "LET'S BUILD SOMETHING\nTHAT GOES LIVE.", fill=TEXT_WHITE, font=fonts["title"])

    draw.line([(110, 1120), (W - 110, 1120)], fill=(35, 50, 70), width=2)

    contacts = [
        ("WEB", "youssefbaderelden.github.io"),
        ("WHATSAPP", "+20 114 606 6036"),
        ("EMAIL", "yousefhasham512@gmail.com"),
        ("GITHUB", "github.com/YoussefBaderelden"),
        ("LINKEDIN", "linkedin.com/in/yousef-bader-el-den"),
    ]
    for i, (label, value) in enumerate(contacts):
        cy = 1145 + i * 44
        draw.text((110, cy), label, fill=TEAL, font=fonts["mono_sm"])
        draw.text((235, cy), value, fill=TEXT_WHITE, font=fonts["body_sm"])

    draw.text((110, 1370), "Arabic (native) · English (intermediate) · Cairo, Egypt", fill=TEXT_MUTED, font=fonts["mono_sm"])

    draw.rounded_rectangle([70, 1470, W - 70, 1570], radius=20, fill=(74, 212, 194, 25), outline=TEAL, width=2)
    footer = "● AVAILABLE FOR PRODUCTION WORK"
    footer_w = draw.textlength(footer, font=fonts["mono_lg"])
    draw.text(((W - footer_w) // 2, 1505), footer, fill=TEXT_WHITE, font=fonts["mono_lg"])

    draw_caption(draw, "Looking for a Flutter engineer who actually ships?\nLet's talk.", "Let's talk", t)

def main():
    print("Loading assets...")
    assets = load_assets()
    
    output_mp4 = "public/yousef-badr-showcase.mp4"
    audio_path = "public/voiceover-mixed.mp3"
    
    # FFmpeg process piping raw video from stdin
    cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{W}x{H}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-i", audio_path,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        output_mp4
    ]
    
    print(f"Launching FFmpeg: {output_mp4}")
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    
    print(f"Rendering {TOTAL_FRAMES} frames ({DURATION}s @ {FPS}fps)...")
    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        # Copy base background
        frame = BASE_BG.copy()
        draw = ImageDraw.Draw(frame)
        
        # Draw HUD
        draw_hud(draw, t, frame_idx)
        
        # Route to active scene
        if t < 5.5:
            render_scene_1(frame, draw, t, assets)
        elif t < 13.5:
            render_scene_2(frame, draw, t, assets)
        elif t < 23.5:
            render_scene_3(frame, draw, t, assets)
        elif t < 34.0:
            render_scene_4(frame, draw, t, assets)
        elif t < 41.0:
            render_scene_5(frame, draw, t, assets)
        else:
            render_scene_6(frame, draw, t, assets)
            
        # Write raw bytes to ffmpeg stdin
        rgb_bytes = frame.convert("RGB").tobytes()
        try:
            proc.stdin.write(rgb_bytes)
        except BrokenPipeError:
            print("FFmpeg stdin closed prematurely.")
            break
            
        if frame_idx % 150 == 0:
            percent = (frame_idx / TOTAL_FRAMES) * 100
            print(f"Progress: {frame_idx}/{TOTAL_FRAMES} frames ({percent:.1f}%) - Time: {t:.1f}s")
            
    proc.stdin.close()
    proc.wait()
    print("Video generation completed successfully!")
    print(f"Generated: {output_mp4}")

if __name__ == "__main__":
    main()
