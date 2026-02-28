import { USERS } from "@/features/post/api/mock-data";
import type { SpaceEvent } from "../types";

export const SPACE_EVENTS: SpaceEvent[] = [
  // Dev Indonesia
  {
    id: "ev1",
    space_id: "devid",
    title: "Workshop: Intro to Next.js App Router",
    description:
      "Next.js App Router udah jadi standar baru di ekosistem React — tapi migrasi dari Pages Router bisa bikin pusing.\n\nDi workshop ini, Budi Santoso (ex-Vercel contributor) bakal ngebimbing kamu step-by-step:\n\n• Setup project dari scratch dengan App Router\n• Server Components vs Client Components — kapan pakai yang mana\n• Data fetching pattern baru (no more getServerSideProps!)\n• Nested layouts, loading states, dan error boundaries\n• Live coding: bikin mini project bareng\n\nCocok buat yang udah familiar sama React tapi belum pernah nyentuh App Router. Bawa laptop, siap ngoding!",
    banner_url:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    created_by: USERS.budi,
    schedule: { date: "2026-03-01", time: "19:00", timezone: "WIB" },
    location: { type: "online", platform: "Google Meet" },
    cta: { type: "register", label: "Daftar Sekarang" },
    attendees_count: 124,
    max_attendees: 200,
    status: "upcoming",
    created_at: "2026-01-20",
  },
  {
    id: "ev2",
    space_id: "devid",
    title: "Meetup: Frontend vs Backend — Debat Seru",
    description:
      'Perang abadi dunia tech: Frontend vs Backend — siapa yang lebih susah?\n\nKali ini kita settle it once and for all (atau minimal ketawa bareng). Format acara:\n\n🔴 Tim Frontend: Rina Wulandari & Dinda Ayu\n🔵 Tim Backend: Agus Prasetyo & Mega Putri\n\n• Round 1: "CSS itu programming language" — debat terbuka\n• Round 2: Live challenge — bikin fitur dalam 15 menit\n• Round 3: Audience vote & roasting session\n\nAda doorprize mechanical keyboard buat penonton paling seru! Snack & kopi disediakan. Dateng aja, gratis.',
    banner_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    created_by: USERS.rina,
    schedule: { date: "2026-03-15", time: "14:00", timezone: "WIB" },
    location: {
      type: "offline",
      venue: "GoWork Fatmawati",
      address: "Jl. RS Fatmawati No.1, Jakarta",
    },
    cta: { type: "register", label: "Daftar Gratis" },
    attendees_count: 67,
    max_attendees: 100,
    status: "upcoming",
    created_at: "2026-02-01",
  },
  {
    id: "ev3",
    space_id: "devid",
    title: "Workshop: Docker untuk Developer Pemula",
    description:
      "Workshop hands-on dari nol sampai deploy! Agus Prasetyo (ex-Tokopedia DevOps) ngebimbing kamu lewatin semua step:\n\n• Install Docker & Docker Compose\n• Bikin Dockerfile pertama kamu\n• Multi-container setup dengan docker-compose\n• Volume, networking, dan environment variables\n• Deploy ke cloud (AWS/GCP) live\n\n189 developer udah ikutan dan rating-nya 4.8/5. Rekaman tersedia buat yang mau review ulang.",
    banner_url:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
    created_by: USERS.agus,
    schedule: { date: "2025-12-10", time: "19:00", timezone: "WIB" },
    location: { type: "online", platform: "Zoom" },
    cta: { type: "url", label: "Lihat Rekaman", url: "#" },
    attendees_count: 189,
    status: "past",
    created_at: "2025-11-15",
  },
  // Startup Indonesia
  {
    id: "ev4",
    space_id: "startupid",
    title: "Pitch Night Vol. 7 — Demo Day Startup Lokal",
    description:
      "Pitch Night is back! Vol. 7 kali ini menghadirkan 5 startup early-stage terbaik yang siap demo produk mereka di depan panel investor.\n\n🎤 Lineup Pitchers:\n• FoodBridge — marketplace makanan rumahan\n• ParkEasy — smart parking solution\n• StudyBuddy — AI tutoring untuk SMA\n• GreenBox — subscription zero-waste groceries\n• MedQuick — telemedicine untuk daerah rural\n\n👨‍⚖️ Panel Judges:\n• 2 partner dari VC ternama Indonesia\n• 1 angel investor & serial entrepreneur\n\nNetworking session setelah pitching. Pizza & beer provided. Bisa hadir offline di Block71 atau nonton via YouTube Live.",
    banner_url:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    created_by: USERS.andi,
    schedule: { date: "2026-02-28", time: "18:30", timezone: "WIB" },
    location: {
      type: "hybrid",
      venue: "Block71 Jakarta",
      platform: "YouTube Live",
      address: "Jl. Kemang Raya No.71",
    },
    cta: { type: "register", label: "Daftar Sekarang" },
    attendees_count: 210,
    max_attendees: 300,
    status: "upcoming",
    created_at: "2026-02-01",
  },
  {
    id: "ev5",
    space_id: "startupid",
    title: "Fireside Chat: Cara Dapetin Funding Seri A",
    description:
      "Raising Seri A di Indonesia itu beda banget sama di Silicon Valley. Prosesnya bisa 6-12 bulan dan penuh drama.\n\nDi fireside chat ini, Ryan Hughes (3x founder) ngobrol sama 2 founder yang baru aja close Seri A mereka:\n\n• Gimana nyiapin data room yang investor suka\n• Berapa kali ditolak sebelum akhirnya close\n• Term sheet red flags yang harus diwaspadai\n• Hubungan founder-VC setelah funding masuk\n• Q&A terbuka — tanya apa aja\n\nFormat santai via Twitter Spaces. Set reminder biar ga lupa!",
    banner_url:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop",
    created_by: USERS.ryan,
    schedule: { date: "2026-04-05", time: "19:00", timezone: "WIB" },
    location: { type: "online", platform: "Twitter Spaces" },
    cta: { type: "register", label: "Set Reminder" },
    attendees_count: 89,
    status: "upcoming",
    created_at: "2026-02-10",
  },
  {
    id: "ev6",
    space_id: "startupid",
    title: "Startup Weekend Jakarta 2025",
    description:
      "54 jam. Satu tim. Satu ide. Satu produk.\n\nStartup Weekend Jakarta 2025 adalah kompetisi hackathon-meets-startup yang udah jalan di 150+ kota di seluruh dunia. Formatnya:\n\n🗓️ Jumat malam: Pitch ide, bentuk tim\n🗓️ Sabtu full day: Build, build, build\n🗓️ Minggu sore: Final pitch di depan juri\n\nYang kamu dapet:\n• Mentorship dari founder & investor berpengalaman\n• Networking dengan 150+ builder & hustler\n• Hadiah total Rp 50 juta untuk 3 tim terbaik\n• Makan 3x sehari + unlimited kopi\n\n156 orang udah ikutan. Cek recap dan foto-foto event-nya!",
    banner_url:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    created_by: USERS.andi,
    schedule: { date: "2025-11-22", time: "09:00", timezone: "WIB" },
    location: {
      type: "offline",
      venue: "Fishermen Labs",
      address: "Jl. Panglima Polim V No.25",
    },
    cta: { type: "url", label: "Lihat Recap", url: "#" },
    attendees_count: 156,
    status: "past",
    created_at: "2025-10-01",
  },
  // Kuliner Nusantara
  {
    id: "ev7",
    space_id: "kuliner",
    title: "Festival Rendang vs Gudeg — Grand Finale",
    description:
      "Setelah 6 bulan polling, debat, dan perang di comment section — akhirnya kita settle this: Rendang vs Gudeg, GRAND FINALE! 🔥\n\nFormat event:\n• 5 chef dari Padang vs 5 chef dari Jogja\n• Blind tasting oleh 50 juri (yaitu kalian!)\n• Live cooking demonstration\n• Booth makan sepuasnya dari kedua tim\n\nYang disediakan:\n• Rendang: 5 varian (rendang daging, paru, telur, jengkol, nangka)\n• Gudeg: 5 varian (gudeg basah, kering, manggar, gori, mercon)\n• Minuman tradisional gratis\n\nTiket terbatas 500 orang. Dateng lapar ya!",
    banner_url:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=400&fit=crop",
    created_by: USERS.siti,
    schedule: { date: "2026-03-22", time: "11:00", timezone: "WIB" },
    location: {
      type: "offline",
      venue: "Senayan Park Food Hall",
      address: "Jl. Asia Afrika, Senayan",
    },
    cta: { type: "register", label: "Pesan Tiket" },
    attendees_count: 342,
    max_attendees: 500,
    status: "upcoming",
    created_at: "2026-01-15",
  },
  {
    id: "ev8",
    space_id: "kuliner",
    title: "Kelas Masak: Nasi Goreng Kampung Authentic",
    description:
      "Nasi goreng kampung tuh keliatan gampang, tapi bikin yang beneran enak? Beda cerita.\n\nChef Mega Putri (15 tahun pengalaman di dapur tradisional) bakal ngajarin kamu rahasia di balik nasi goreng kampung yang autentik:\n\n• Pemilihan nasi — kenapa nasi sisa semalam itu penting\n• Bumbu rahasia — komposisi kecap, terasi, dan cabai yang pas\n• Teknik wok hei — api besar, gerak cepat\n• Plating ala warung vs fine dining\n\nFormat hybrid: ikut masak langsung di studio ATAU nonton via Zoom sambil praktek di rumah. Bahan-bahan disiapin sendiri ya (list dikirim setelah daftar).",
    banner_url:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=400&fit=crop",
    created_by: USERS.mega,
    schedule: { date: "2026-04-10", time: "10:00", timezone: "WIB" },
    location: {
      type: "hybrid",
      venue: "ABC Cooking Studio",
      platform: "Zoom",
      address: "Grand Indonesia, Lt. 3",
    },
    cta: { type: "register", label: "Daftar" },
    attendees_count: 45,
    max_attendees: 80,
    status: "upcoming",
    created_at: "2026-02-05",
  },
  {
    id: "ev9",
    space_id: "kuliner",
    title: "Street Food Tour: Pecenongan Malam",
    description:
      "Pecenongan setelah jam 7 malam itu surganya street food Jakarta. Kita jalan bareng menyusuri jalan legendaris ini!\n\nRute malam itu:\n🥘 Stop 1: Martabak Pecenongan 78 — the OG\n🍢 Stop 2: Sate Kambing Muda Haji Udin\n🍜 Stop 3: Kwetiau Sapi Akang\n🍨 Stop 4: Es Krim Ragusa (kalau masih muat)\n\nTotal walking distance ~1.5 km. Harga makanan bayar sendiri (estimasi Rp 80-120rb untuk semua stop). Kita sediain air mineral dan guide lokal yang tau semua hidden gems. 28 orang ikut dan pada bilang ini food tour terbaik yang pernah mereka ikutin!",
    banner_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    created_by: USERS.fajar,
    schedule: { date: "2025-12-20", time: "19:00", timezone: "WIB" },
    location: {
      type: "offline",
      venue: "Meeting Point: Masjid Istiqlal",
      address: "Jl. Pecenongan, Jakarta Pusat",
    },
    cta: { type: "url", label: "Lihat Dokumentasi", url: "#" },
    attendees_count: 28,
    status: "past",
    created_at: "2025-12-01",
  },
  // Jakarta Vibes
  {
    id: "ev10",
    space_id: "jakartavibes",
    title: "Jakarta Night Run: Bundaran HI Edition",
    description:
      "Jakarta Night Run is back — edisi Bundaran HI! Lari malam di jantung kota Jakarta tanpa macet, tanpa polusi (ya, bisa).\n\n🏃 Kategori:\n• Fun Run 5K — cocok buat pemula\n• Challenge 10K — buat yang mau push limit\n\n🎁 Yang kamu dapet:\n• Race bib & timing chip\n• Kaos finisher eksklusif\n• Medal untuk 10K finisher\n• Goodie bag dari sponsor\n• Air mineral & pisang di finish line\n\n📍 Rute: Bundaran HI → Jl. Sudirman → Semanggi → balik via Jl. Thamrin\n\nStart jam 8 malam, kumpul jam 7 untuk warm-up bareng. Kuota 1000 runner — first come first served!",
    banner_url:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=400&fit=crop",
    created_by: USERS.jake,
    schedule: { date: "2026-03-08", time: "20:00", timezone: "WIB" },
    location: {
      type: "offline",
      venue: "Bundaran HI",
      address: "Jl. MH Thamrin, Jakarta Pusat",
    },
    cta: { type: "register", label: "Daftar Run" },
    attendees_count: 478,
    max_attendees: 1000,
    status: "upcoming",
    created_at: "2026-01-28",
  },
  {
    id: "ev11",
    space_id: "jakartavibes",
    title: "Konser Indie: Sounds of South Jakarta",
    description:
      "Satu malam, 6 band indie terbaik dari Jakarta Selatan. Free entry, no ticket needed.\n\n🎸 Lineup:\n• The Panturas — surf rock yang bikin pengen ke pantai\n• Elephant Kind — dream pop vibes\n• Reality Club — indie rock yang udah go international\n• Feast — post-punk energi tinggi\n• Banda Neira — folk yang bikin mellow\n• + 1 secret guest\n\nDoors open jam 7, musik mulai jam 7:30. Venue outdoor, bawa jaket kalau ujan. Food trucks available di area venue. 312 orang hadir dan vibes-nya luar biasa!",
    banner_url:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    created_by: USERS.chloe,
    schedule: { date: "2025-10-15", time: "19:30", timezone: "WIB" },
    location: {
      type: "offline",
      venue: "Rossi Musik Fatmawati",
      address: "Jl. RS Fatmawati No.20",
    },
    cta: { type: "url", label: "Lihat Highlights", url: "#" },
    attendees_count: 312,
    status: "past",
    created_at: "2025-09-20",
  },
  {
    id: "ev12",
    space_id: "jakartavibes",
    title: "Rooftop Movie Night: Kota Jakarta dari Atas",
    description:
      'Nonton bareng di rooftop lantai 56 dengan pemandangan skyline Jakarta? Yes please.\n\n🎬 Film: "Jakarta Magrib" — dokumenter tentang kehidupan Jakarta dari sudut pandang 5 warga biasa yang berbeda latar belakang. Durasi 90 menit.\n\n🍿 Yang included:\n• Welcome drink (mocktail/cocktail)\n• Popcorn & snack platter\n• Bean bag seating\n• Sunset viewing dari jam 6-7\n\nDress code: smart casual (ini rooftop bar, bukan bioskop). Kuota terbatas 120 orang karena space rooftop. Reservasi wajib, no walk-in.',
    banner_url:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
    created_by: USERS.dinda,
    schedule: { date: "2026-02-22", time: "18:00", timezone: "WIB" },
    location: {
      type: "offline",
      venue: "SKYE Bar & Restaurant",
      address: "BCA Tower Lt. 56, SCBD",
    },
    cta: { type: "register", label: "Reservasi" },
    attendees_count: 86,
    max_attendees: 120,
    status: "upcoming",
    created_at: "2026-01-10",
  },
  // Curhat Zone
  {
    id: "ev13",
    space_id: "curhatzone",
    title: "Support Circle: Overthinking Club ☕",
    description:
      "Kamu yang otaknya ga bisa diem, yang replay percakapan 3 tahun lalu jam 2 pagi, yang mikirin 47 skenario worst case sebelum tidur — this is for you.\n\nOverthinking Club adalah support circle bulanan dimana kita ngobrol jujur tentang anxiety, self-doubt, dan semua pikiran yang bikin capek.\n\nFormat:\n• Ice breaking ringan (10 min)\n• Sharing session — cerita bebas, ga ada yang judge (40 min)\n• Guided breathing exercise bareng (10 min)\n• Open discussion & tips dari sesama member (30 min)\n\nRules:\n• Apa yang diceritain di circle, stays di circle\n• Kamera boleh off\n• Boleh cuma dengerin, ga harus cerita\n\nMax 50 orang biar intimate. Facilitator: Nina Park (certified mindfulness practitioner).",
    banner_url:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=400&fit=crop",
    created_by: USERS.nina,
    schedule: { date: "2026-03-05", time: "20:00", timezone: "WIB" },
    location: { type: "online", platform: "Discord Voice" },
    cta: { type: "register", label: "Gabung Circle" },
    attendees_count: 34,
    max_attendees: 50,
    status: "upcoming",
    created_at: "2026-02-10",
  },
  {
    id: "ev14",
    space_id: "curhatzone",
    title: "Journaling Workshop: Tulis Biar Lega",
    description:
      'Kadang yang kita butuhkan bukan therapist mahal — cukup selembar kertas dan pena.\n\nJournaling workshop ini dirancang buat kamu yang:\n• Pengen mulai journaling tapi ga tau harus nulis apa\n• Udah coba tapi ga konsisten\n• Mau pakai journaling sebagai tools self-healing\n\nApa yang bakal kita lakuin:\n📝 Session 1: "Morning Pages" technique — nulis bebas tanpa filter\n📝 Session 2: Gratitude journaling — reframe perspektif\n📝 Session 3: "Unsent letter" exercise — letting go\n📝 Session 4: Bikin journaling routine yang sustainable\n\nFacilitator: Priya Sharma (journaling practitioner, 5+ tahun). Format hybrid — bisa dateng ke cafe atau join via Zoom. Bawa buku tulis & pena favorit kamu!',
    banner_url:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    created_by: USERS.priya,
    schedule: { date: "2026-04-12", time: "16:00", timezone: "WIB" },
    location: {
      type: "hybrid",
      venue: "Kopi Tuku Cipete",
      platform: "Zoom",
      address: "Jl. Cipete Raya No.55",
    },
    cta: { type: "register", label: "Daftar Workshop" },
    attendees_count: 22,
    max_attendees: 40,
    status: "upcoming",
    created_at: "2026-02-12",
  },
  {
    id: "ev15",
    space_id: "curhatzone",
    title: "Sharing Session: Quarter-Life Crisis Survivors",
    description:
      'Umur 23-28 itu phase yang aneh banget. Temen udah nikah, kamu masih bingung passion. Temen udah punya rumah, kamu masih ngontrak. It\'s okay.\n\nDi sharing session ini, 4 speakers yang udah "survive" quarter-life crisis bakal cerita pengalaman mereka:\n\n🗣️ Speaker 1: "Gue resign dari corporate buat jadi freelancer — dan hampir bangkrut"\n🗣️ Speaker 2: "Quarter-life crisis gue berujung di terapi, dan itu keputusan terbaik"\n🗣️ Speaker 3: "Gue pindah kota di umur 26, sendirian, ga kenal siapa-siapa"\n🗣️ Speaker 4: "Comparison is the thief of joy — gimana gue berhenti bandingin diri"\n\nBukan motivasi kosong. Ini cerita real dari orang real. 67 orang udah nonton dan banyak yang bilang "I needed this." Rekaman available!',
    banner_url:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
    created_by: USERS.kai,
    schedule: { date: "2025-11-30", time: "19:00", timezone: "WIB" },
    location: { type: "online", platform: "Google Meet" },
    cta: { type: "url", label: "Lihat Rekaman", url: "#" },
    attendees_count: 67,
    status: "past",
    created_at: "2025-11-01",
  },
];
