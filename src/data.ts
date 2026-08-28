export const profile = {
  name: "Youssef Bader El Den",
  first: "Youssef",
  role: "Flutter Engineer",
  tagline: "Live streaming, sports media, and product apps — built for the real world.",
  city: "Cairo, Egypt",
  university: "Zagazig University",
  major: "Electronics & Communication Engineering",
  year: "Final year",
  email: "yousefhasham512@gmail.com",
  phone: "+201146066036",
  phoneHref: "tel:+201146066036",
  github: "https://github.com/YoussefBaderelden",
  linkedin: "https://www.linkedin.com/in/yousef-bader-el-den",
  photo: "./me/youssef.jpg",
};

export const stats = [
  { value: "20+", label: "Shipped apps" },
  { value: "4", label: "Platforms" },
  { value: "2+", label: "Years building" },
  { value: "Live", label: "Agora · WebRTC · NDI" },
];

export const skills = {
  platforms: ["Flutter", "Dart", "iOS", "Android", "Windows", "Web", "Android TV"],
  realtime: ["Agora RTC", "WebRTC", "NDI", "RTMP", "Socket.IO", "FFmpeg"],
  architecture: ["Clean Architecture", "BLoC / Cubit", "Riverpod", "GetX", "GetIt + Injectable"],
  product: ["Firebase", "Dio", "Hive", "Secure Storage", "Maps", "Payments", "FCM"],
};

export const experience = [
  {
    role: "Flutter Engineer",
    org: "TKDS Media",
    period: "Present",
    place: "Sports broadcast & media",
    points: [
      "Building white-label sports media apps (TKDS Media Core, National Golf Network, Sports Flix, Maadi Sports, Antlersn, Southwest Ohio) for iOS, Android, and TV.",
      "Shipping TKDS Streamer with RTMP, WebRTC, and NDI local broadcast for OBS / vMix workflows.",
      "Delivering TKDS VAR across Windows (Microsoft Store), Android, and iOS with FFmpeg video pipelines.",
    ],
  },
  {
    role: "Flutter Engineer — BikMedia",
    org: "BikMedia",
    period: "Contract / product",
    place: "iOS & Android live social",
    points: [
      "Owned live-stream performance: Agora capture, Nosmai beauty filters, and a native Game Live / WebRTC filter bridge.",
      "Fixed memory leaks across dozens of screens, capped high-traffic live chat, and isolated video repaints for low-end devices.",
    ],
  },
  {
    role: "Mobile Application Developer",
    org: "Route",
    period: "Training & delivery",
    place: "Cairo",
    points: [
      "Built production-style Flutter apps with Provider, Cubit, Firebase, and clean architecture.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "Internship",
    place: "Egypt",
    points: [
      "Shipped multiple complete Flutter apps covering state management, APIs, and Firebase.",
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
  category: "live" | "sports" | "product" | "tools";
};

export const projects: Project[] = [
  {
    id: "bikmedia",
    name: "BikMedia",
    blurb: "Social live streaming at scale — filters, PK rooms, reels, and Agora performance work.",
    story:
      "iOS and Android live social app. I built and hardened the live stack: Agora RTC, Nosmai beauty / effect filters, a native Game Live fetcher, and a WebRTC filter pipeline. I also ran a performance pass — disposing leaked controllers, throttling high-traffic room chat, and wrapping video layers in RepaintBoundary so low-end devices stay smooth during streams.",
    tags: ["Agora", "Nosmai filters", "Game Live", "WebRTC", "GetX", "Socket.IO"],
    platforms: ["iOS", "Android"],
    logo: "./apps/bikmedia.png",
    accent: "#7c5cff",
    featured: true,
    category: "live",
  },
  {
    id: "pasty",
    name: "Pasty",
    blurb: "Design your cake. Order sweets. Pay. Launching soon.",
    story:
      "Consumer app for designing cakes yourself — shapes, layers, frost shaders, plates — then buying cakes and sweets with maps, delivery QR, and local payment rails. Clean architecture with BLoC, dual flavors for customer and designer, Arabic + English. Currently finishing for launch.",
    tags: ["Cake customizer", "Shaders", "BLoC", "Payments", "Maps", "Hive"],
    platforms: ["iOS", "Android"],
    logo: "./apps/pasty.png",
    accent: "#f2a7c3",
    featured: true,
    status: "Launching soon",
    category: "product",
  },
  {
    id: "tkds-core",
    name: "TKDS Media Core",
    blurb: "White-label sports media engine powering a family of live sports apps.",
    story:
      "Shared Flutter core for sports networks: live video, radio, HTML content, QR, camera, push, and a custom Android video player. Same engine, different brands — TKDS Sports, National Golf Network, Sports Flix, Maadi Sports, Antlersn, and Southwest Ohio.",
    tags: ["Riverpod", "GoRouter", "Video", "FCM", "White-label"],
    platforms: ["iOS", "Android", "TV"],
    logo: "./apps/tkds-media-core.png",
    accent: "#e30613",
    featured: true,
    category: "sports",
  },
  {
    id: "tkds-streamer",
    name: "TKDS Streamer",
    blurb: "Pro broadcast app: RTMP, WebRTC, and NDI to OBS / vMix on the local network.",
    story:
      "Official TKDS streaming tool. Operators pick RTMP, low-latency WebRTC, or NDI© local broadcast so a phone or tablet becomes a field camera for OBS, vMix, and the rest of the truck.",
    tags: ["WebRTC", "NDI", "RTMP", "Broadcast"],
    platforms: ["iOS", "Android"],
    logo: "./apps/tkds-streamer.png",
    accent: "#d32d33",
    featured: true,
    category: "live",
  },
  {
    id: "tkds-var",
    name: "TKDS VAR",
    blurb: "Video assistant referee toolkit — desktop first, mobile too.",
    story:
      "VAR review client with FFmpeg and media_kit. Ships on Windows via Microsoft Store (MSIX), plus Android and iOS. Built for operators who need frame-accurate playback in a live sports workflow.",
    tags: ["FFmpeg", "media_kit", "MSIX", "Windows"],
    platforms: ["Windows", "Android", "iOS"],
    logo: "./apps/tkds-var.png",
    accent: "#f5c542",
    featured: true,
    category: "tools",
  },
  {
    id: "ngn",
    name: "National Golf Network",
    blurb: "Golf media network — live coverage, VOD, and club content.",
    tags: ["Sports media", "Riverpod", "Video"],
    platforms: ["iOS", "Android"],
    logo: "./apps/ngn.png",
    accent: "#1b8a5a",
    story:
      "Branded sports media app for National Golf Network, sitting on the TKDS media core: live streams, on-demand, and network content.",
    category: "sports",
  },
  {
    id: "sportsflix",
    name: "Sports Flix",
    blurb: "Sports streaming product on the TKDS media stack.",
    tags: ["Live video", "VOD", "Riverpod"],
    platforms: ["iOS", "Android"],
    logo: "./apps/sportsflix.png",
    accent: "#ff6b1a",
    story: "Sports Flix live and on-demand client, sharing the TKDS Media Core player, auth, and push stack.",
    category: "sports",
  },
  {
    id: "maadi",
    name: "Maadi Sports",
    blurb: "Club sports network for Maadi — video, radio, and match days.",
    tags: ["Club media", "Video", "Radio"],
    platforms: ["iOS", "Android"],
    logo: "./apps/maadi-sports.png",
    accent: "#013f24",
    story: "Maadi Sports branded app for matches, highlights, and club audio/video.",
    category: "sports",
  },
  {
    id: "antlersn",
    name: "Antlersn",
    blurb: "Sports media brand with TV launcher support.",
    tags: ["Sports", "TV", "Video"],
    platforms: ["iOS", "Android", "TV"],
    logo: "./apps/antlersn.png",
    accent: "#c9a227",
    story: "Antlersn sports network client, including Android TV launcher assets on the same media core.",
    category: "sports",
  },
  {
    id: "swo",
    name: "Southwest Ohio",
    blurb: "Regional sports network app for Southwest Ohio.",
    tags: ["Regional sports", "Live", "VOD"],
    platforms: ["iOS", "Android"],
    logo: "./apps/southwest-ohio.png",
    accent: "#3d6bb3",
    story: "Southwest Ohio sports media app — same production-grade player and content pipeline as the rest of the TKDS family.",
    category: "sports",
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
    accent: "#38bdf8",
    story: "Sideline / booth scoring client so operators can push live scores into the TKDS sports stack.",
    category: "tools",
  },
  {
    id: "golf",
    name: "Golf Scoring",
    blurb: "Live golf scoring with BLoC and a clean API layer.",
    tags: ["Golf", "BLoC", "Dio"],
    platforms: ["Android", "iOS"],
    accent: "#4ade80",
    story: "Scoring companion for golf events — holes, players, and live leaderboard data.",
    category: "sports",
  },
  {
    id: "radio",
    name: "TKDS Radio Streamer",
    blurb: "Background radio streaming with audio_service.",
    tags: ["Radio", "audio_service", "BLoC"],
    platforms: ["Android", "iOS"],
    accent: "#fb7185",
    story: "Dedicated radio streamer with background playback for TKDS audio channels.",
    category: "live",
  },
  {
    id: "evently",
    name: "Evently",
    blurb: "Event planning with Firebase, maps, and localization.",
    tags: ["Firebase", "Maps", "Provider"],
    platforms: ["Android", "iOS"],
    accent: "#a78bfa",
    github: "https://github.com/YoussefBaderelden/evently",
    story: "Cross-platform event planner — auth, Firestore, Google Maps, and multilingual UI.",
    category: "product",
  },
  {
    id: "news",
    name: "News App",
    blurb: "Headlines with BLoC, Hive cache, and offline-first UX.",
    tags: ["BLoC", "Hive", "Clean Architecture"],
    platforms: ["Android", "iOS"],
    accent: "#60a5fa",
    github: "https://github.com/YoussefBaderelden/news",
    story: "News client with BLoC, GetIt, connectivity handling, and Hive for offline reading.",
    category: "product",
  },
  {
    id: "golden",
    name: "Golden Pill",
    blurb: "Medicine reminders with local notifications.",
    tags: ["Health", "Notifications"],
    platforms: ["Android", "iOS"],
    accent: "#fbbf24",
    github: "https://github.com/YoussefBaderelden/golden_pill",
    story: "Medication reminder app with scheduled local notifications and simple daily tracking.",
    category: "product",
  },
];

export const ticker = [
  "Flutter",
  "Agora RTC",
  "WebRTC",
  "NDI",
  "RTMP",
  "FFmpeg",
  "Riverpod",
  "BLoC",
  "Firebase",
  "iOS",
  "Android",
  "Windows",
  "Sports media",
  "Live filters",
];
