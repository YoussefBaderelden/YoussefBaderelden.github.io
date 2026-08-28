export const profile = {
  name: "Youssef Bader El Den",
  first: "Youssef",
  role: "Flutter Mobile Developer",
  tagline:
    "Cross-platform apps that ship — live streaming, sports media, payments, and product.",
  city: "Cairo, Egypt",
  university: "Zagazig University — Faculty of Engineering",
  major: "Computer Engineering",
  year: "3rd year · Very Good",
  educationPeriod: "Oct 2022 – Aug 2027",
  summary:
    "Dedicated Flutter developer with apps live on the App Store and Google Play. I work at TKDS MENA as the sole mobile developer on production streaming products, and I also ship heavier realtime work — Agora, WebRTC, NDI, filters, and Windows — that a short CV never captured.",
  email: "yousefhasham512@gmail.com",
  phone: "+201146066036",
  phoneHref: "tel:+201146066036",
  github: "https://github.com/YoussefBaderelden",
  linkedin: "https://www.linkedin.com/in/yousef-bader-el-den",
  photo: "./me/youssef.jpg",
  languages: ["Arabic (Native)", "English (Intermediate)"],
};

export const stats = [
  { value: "10", label: "Live on iOS / Android" },
  { value: "20+", label: "Apps built" },
  { value: "4", label: "Platforms" },
  { value: "Nov ’25", label: "TKDS MENA" },
];

export const skills = {
  "Languages & frameworks": ["Flutter & Dart (Advanced)", "Dart", "Java", "OOP"],
  "Mobile & platforms": [
    "iOS",
    "Android",
    "Windows",
    "Web",
    "Android TV",
    "App Store",
    "Google Play",
  ],
  "Realtime & media": [
    "Agora RTC",
    "WebRTC",
    "NDI",
    "RTMP",
    "FFmpeg",
    "Socket.IO",
    "Nosmai filters",
    "Camera APIs",
    "Audio streaming",
  ],
  "Architecture": [
    "Clean Architecture",
    "MVVM",
    "Repository pattern",
    "Dependency Injection",
    "BLoC / Cubit",
    "Riverpod",
    "Provider",
    "GetX",
    "GetIt + Injectable",
  ],
  "Backend, payments & data": [
    "Firebase Auth",
    "Firestore",
    "Cloud Storage",
    "FCM",
    "REST APIs",
    "Dio / HTTP",
    "Payment gateways",
    "Subscriptions",
    "In-app purchases",
    "Hive",
    "Shared Preferences",
  ],
  "UI, tools & languages": [
    "Figma",
    "Responsive UI",
    "Dark / light themes",
    "Git & GitHub",
    "Postman",
    "Android Studio",
    "VS Code",
    "Arabic (Native)",
    "English (Intermediate)",
  ],
};

export const experience = [
  {
    role: "Flutter Mobile Developer",
    org: "TKDS MENA",
    period: "Nov 2025 – Present",
    place: "Remote · broadcasting & streaming",
    points: [
      "Sole mobile developer. Shipped 10 production apps live on Android and/or iOS, wired into the TKDS Media Core platform.",
      "Fizz Party — social live streaming with Fizzer profiles, live rooms, search, favourites, and dark theme. Live on the App Store and Google Play.",
      "TKDS Streamer — go live from phone or iPad. RTMP plus WebRTC and NDI local broadcast into OBS / vMix, camera switch, mic mute, immersive controls.",
      "NGN (National Golf Network) — live and on-demand golf: high school, collegiate, and amateur events, with subscription and payment flows. Live on both stores.",
      "TKDS Radio — internet radio with background playback. Live on Google Play; iOS in progress.",
      "Also built the wider media family on the same core (Sports Flix, Maadi Sports, Antlersn, Southwest Ohio), TKDS VAR on Windows / Android / iOS, Score Cue, and PlayTooWin (web).",
      "Firebase Auth, realtime sync, clean architecture, Cubit/BLoC, REST, Figma collaboration.",
    ],
  },
  {
    role: "Flutter Engineer",
    org: "BikMedia",
    period: "Product / contract",
    place: "iOS & Android live social",
    points: [
      "Live stack: Agora RTC, Nosmai beauty / effect filters, native Game Live fetcher, WebRTC filter pipeline.",
      "Performance: memory-leak cleanup, high-traffic live chat throttling, RepaintBoundary isolation so streams stay smooth on low-end devices.",
    ],
  },
  {
    role: "Flutter Developer Intern",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "Jul 2025 · 6 months",
    place: "Zagazig, Sharqia",
    points: [
      "Programming fundamentals with Java and OOP, then Flutter and mobile architecture on national-initiative projects.",
    ],
  },
  {
    role: "Flutter Developer Intern",
    org: "Route Academy",
    period: "Sep 2024 · 6 months",
    place: "Online",
    points: [
      "Advanced Flutter: Provider and Cubit, Firebase and cloud services, HTTP/REST, Clean Architecture on real project scenarios.",
    ],
  },
  {
    role: "Mobile Developer Intern",
    org: "Digital HUB (D-HUB)",
    period: "Jun 2024 · 1 month",
    place: "Al-Doqi, Cairo",
    points: [
      "Cross-platform mobile fundamentals and user-centred UI/UX.",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  blurb: string;
  story: string;
  tags: string[];
  platforms: string[];
  logo?: string;
  accent: string;
  featured?: boolean;
  status?: string;
  github?: string;
  appStore?: string;
  playStore?: string;
  liveNo?: number;
  liveOn?: ("Android" | "iOS")[];
  category: "live" | "sports" | "product" | "tools";
};

export const projects: Project[] = [
  {
    id: "fizz",
    name: "Fizz Party",
    blurb: "Social live streaming — Fizzer profiles, live rooms, search, favourites. Live on both stores.",
    story:
      "Production social live-streaming app for TKDS MENA. Fizzer profile pages, live stream viewing, discovery, search, favourites, dark theme, and realtime content. Shipped as the sole mobile developer. Live on the App Store and Google Play.",
    tags: ["Live streaming", "Firebase", "REST", "Dark theme", "Search"],
    platforms: ["iOS", "Android"],
    logo: "./apps/fizz-party.png",
    accent: "#ff4f8b",
    featured: true,
    liveNo: 1,
    liveOn: ["iOS", "Android"],
    category: "live",
    status: "Published · iOS & Android",
    appStore: "https://apps.apple.com/app/id6755402526",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.FizzAPP",
  },
  {
    id: "tkds-streamer",
    name: "TKDS Streamer",
    blurb: "Go live from phone or iPad — RTMP, WebRTC, and NDI into OBS / vMix.",
    story:
      "Mobile live-streaming broadcaster on the TKDS Media Core platform. Go live in seconds, front/back camera switch, mic mute, full-screen UI with auto-hiding controls. Under the hood: RTMP plus WebRTC and NDI© local broadcast so a phone becomes a field camera for OBS and vMix. Live on the App Store and Google Play.",
    tags: ["RTMP", "WebRTC", "NDI", "Camera", "Broadcast"],
    platforms: ["iOS", "Android"],
    logo: "./apps/tkds-streamer.png",
    accent: "#d32d33",
    featured: true,
    liveNo: 2,
    liveOn: ["iOS", "Android"],
    category: "live",
    appStore: "https://apps.apple.com/app/id6755495829",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.tkdsStreamer",
  },
  {
    id: "ngn",
    name: "National Golf Network - NGN",
    blurb: "Live and on-demand golf — high school, college, amateur. Live on both stores.",
    story:
      "Sports streaming app for NGN: live TV/radio, tournament coverage, analysis, interviews, and highlights. Subscription and payment flows for premium access. Built on TKDS Media Core. Live on the App Store and Google Play.",
    tags: ["Sports", "Video", "Subscriptions", "Payments", "Firebase"],
    platforms: ["iOS", "Android"],
    logo: "./apps/ngn.png",
    accent: "#1b8a5a",
    featured: true,
    liveNo: 3,
    liveOn: ["iOS", "Android"],
    category: "sports",
    appStore: "https://apps.apple.com/app/id6764359434",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.nationalgolfnetwork",
  },
  {
    id: "bikmedia",
    name: "BikMedia",
    blurb: "Social live at scale — Agora, Nosmai filters, Game Live fetcher, performance work.",
    story:
      "iOS and Android live social app. I built and hardened the live stack: Agora RTC, Nosmai beauty / effect filters, a native Game Live fetcher, and a WebRTC filter pipeline. Then a performance pass — leaked controllers, high-traffic room chat, RepaintBoundary around video — so low-end devices survive a busy stream.",
    tags: ["Agora", "Nosmai filters", "Game Live", "WebRTC", "GetX", "Socket.IO"],
    platforms: ["iOS", "Android"],
    logo: "./apps/bikmedia.png",
    accent: "#7c5cff",
    featured: true,
    liveNo: 5,
    liveOn: ["iOS", "Android"],
    category: "live",
    appStore: "https://apps.apple.com/app/id6756263985",
    playStore: "https://play.google.com/store/apps/details?id=com.bikmedianewapp.vr",
  },
  {
    id: "pasty",
    name: "Pasty",
    blurb: "Design your cake. Order sweets. Pay. Launching soon.",
    story:
      "Consumer app for designing cakes yourself — shapes, layers, frost shaders, plates — then buying cakes and sweets with maps, delivery QR, and local payment rails. Clean architecture with BLoC, customer + designer flavors, Arabic + English. Finishing for launch.",
    tags: ["Cake customizer", "Shaders", "BLoC", "Payments", "Maps", "Hive"],
    platforms: ["iOS", "Android"],
    logo: "./apps/pasty.png",
    accent: "#f2a7c3",
    featured: true,
    status: "Launching soon",
    category: "product",
  },
  {
    id: "radio",
    name: "TKDS Radio",
    blurb: "Internet radio with background playback. Live on Google Play; iOS in progress.",
    story:
      "Internet radio streaming from TKDS Media platforms. Seamless background playback and a minimal UI. Live on Google Play (com.tkds.RadioAPP); iOS release in progress.",
    tags: ["Audio", "Background playback", "Streaming"],
    platforms: ["Android", "iOS soon"],
    logo: "./apps/tkds-radio.png",
    accent: "#fb7185",
    liveNo: 6,
    liveOn: ["Android"],
    category: "live",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.RadioAPP",
    status: "Live · Android · iOS in progress",
  },
  {
    id: "tkds-core",
    name: "TKDS SPORTS",
    blurb: "White-label sports media engine — live as TKDS Sports on iOS and Android.",
    story:
      "Shared Flutter core: live video, radio, HTML content, QR, camera, push, custom Android video player. Ships live as TKDS Sports, and powers NGN, Sports Flix, Maadi Sports, Antlersn, and Southwest Ohio.",
    tags: ["Riverpod", "GoRouter", "Video", "FCM", "White-label"],
    platforms: ["iOS", "Android", "TV"],
    logo: "./apps/tkds-media-core.png",
    accent: "#e30613",
    liveNo: 4,
    liveOn: ["iOS", "Android"],
    category: "sports",
    appStore: "https://apps.apple.com/app/id6778073209",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.tkdssports",
    status: "Live · iOS & Android",
  },
  {
    id: "tkds-var",
    name: "TKDS VAR",
    blurb: "Video assistant referee toolkit — Windows Store, Android, and iOS.",
    story:
      "VAR review client with FFmpeg and media_kit. Ships on Windows via Microsoft Store (MSIX), plus Android and iOS. Frame-accurate playback for live sports operators.",
    tags: ["FFmpeg", "media_kit", "MSIX", "Windows"],
    platforms: ["Windows", "Android", "iOS"],
    logo: "./apps/tkds-var.png",
    accent: "#f5c542",
    category: "tools",
  },
  {
    id: "sportsflix",
    name: "Sports Flix -SF",
    blurb: "Sports streaming on Media Core — live on Google Play.",
    tags: ["Live video", "VOD", "Riverpod"],
    platforms: ["iOS", "Android"],
    logo: "./apps/sportsflix.png",
    accent: "#ff6b1a",
    story: "Sports Flix live and on-demand client — same player, auth, and push stack as the rest of Media Core. Live on Google Play.",
    liveNo: 9,
    liveOn: ["Android"],
    category: "sports",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.sportsfixlive",
    status: "Live · Android",
  },
  {
    id: "maadi",
    name: "Maadi Sports",
    blurb: "Club sports network for Maadi — video, radio, match days.",
    tags: ["Club media", "Video", "Radio"],
    platforms: ["iOS", "Android"],
    logo: "./apps/maadi-sports.png",
    accent: "#013f24",
    story: "Maadi Sports branded app for matches, highlights, and club audio/video. Live on Google Play.",
    liveNo: 7,
    liveOn: ["Android"],
    category: "sports",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.maadisports",
    status: "Live · Android",
  },
  {
    id: "antlersn",
    name: "ASN TV",
    blurb: "Antler Sports Network — live games and VOD on Google Play.",
    tags: ["Sports", "TV", "Video"],
    platforms: ["iOS", "Android", "TV"],
    logo: "./apps/antlersn.png",
    accent: "#c9a227",
    story: "Antlersn sports network — live on Google Play as ASN TV, including Android TV launcher assets on Media Core.",
    liveNo: 8,
    liveOn: ["Android"],
    category: "sports",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.antlersn",
    status: "Live · Android",
  },
  {
    id: "swo",
    name: "Southwest Ohio - SWOH",
    blurb: "Regional sports network — live on Google Play.",
    tags: ["Regional sports", "Live", "VOD"],
    platforms: ["iOS", "Android"],
    logo: "./apps/southwest-ohio.png",
    accent: "#3d6bb3",
    story: "Southwest Ohio sports media app on the same production player and content pipeline. Live on Google Play.",
    liveNo: 10,
    liveOn: ["Android"],
    category: "sports",
    playStore: "https://play.google.com/store/apps/details?id=com.tkds.southwestohio",
    status: "Live · Android",
  },
  {
    id: "playtoowin",
    name: "PlayTooWin",
    blurb: "Live bingo — web first.",
    tags: ["Bingo", "Live", "Riverpod"],
    platforms: ["Web"],
    logo: "./apps/playtoowin.png",
    accent: "#22c55e",
    story: "PlayTooWin live bingo experience, targeting web as the primary surface.",
    category: "product",
  },
  {
    id: "scorecue",
    name: "Score Cue",
    blurb: "Operator app for live sports scoring.",
    tags: ["Scoring", "Riverpod", "Ops"],
    platforms: ["Android", "iOS"],
    logo: "./apps/scorecue.png",
    accent: "#38bdf8",
    story: "Sideline / booth scoring client so operators can push live scores into the TKDS stack.",
    category: "tools",
  },
];

export const liveApps = projects
  .filter((p) => typeof p.liveNo === "number")
  .sort((a, b) => (a.liveNo ?? 0) - (b.liveNo ?? 0));

export const ticker = [
  "Flutter",
  "Dart",
  "Agora RTC",
  "WebRTC",
  "NDI",
  "RTMP",
  "FFmpeg",
  "Firebase",
  "BLoC",
  "Riverpod",
  "Payments",
  "App Store",
  "Google Play",
  "iOS",
  "Android",
  "Windows",
];
