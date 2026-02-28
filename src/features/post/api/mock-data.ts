import { SPACES } from "@/features/space/api/mock-data";
import type { User } from "@/types/database";
import type { Post, PostComment, UserProfile } from "../types";

// ── Users ──────────────────────────────────────────────────────────────────

export const USERS: Record<string, User> = {
  sarah: {
    id: "u1",
    username: "sarahcodes",
    full_name: "Sarah Chen",
    avatar_url: "https://i.pravatar.cc/150?u=sarah",
    created_at: "",
    verified: true,
  },
  marcus: {
    id: "u2",
    username: "marcusj",
    full_name: "Marcus Johnson",
    avatar_url: "https://i.pravatar.cc/150?u=marcus",
    created_at: "",
    verified: false,
  },
  elena: {
    id: "u3",
    username: "elena.dev",
    full_name: "Elena Rodriguez",
    avatar_url: "https://i.pravatar.cc/150?u=elena",
    created_at: "",
    verified: true,
  },
  jake: {
    id: "u4",
    username: "jakethesnake",
    full_name: "Jake Williams",
    avatar_url: "https://i.pravatar.cc/150?u=jake",
    created_at: "",
    verified: false,
  },
  priya: {
    id: "u5",
    username: "priya.design",
    full_name: "Priya Sharma",
    avatar_url: "https://i.pravatar.cc/150?u=priya",
    created_at: "",
    verified: true,
  },
  tom: {
    id: "u6",
    username: "tombuilds",
    full_name: "Tom Baker",
    avatar_url: "https://i.pravatar.cc/150?u=tom",
    created_at: "",
    verified: false,
  },
  nina: {
    id: "u7",
    username: "ninawrites",
    full_name: "Nina Park",
    avatar_url: "https://i.pravatar.cc/150?u=nina",
    created_at: "",
    verified: true,
  },
  alex: {
    id: "u8",
    username: "alexfromtech",
    full_name: "Alex Kim",
    avatar_url: "https://i.pravatar.cc/150?u=alex",
    created_at: "",
    verified: false,
  },
  david: {
    id: "u9",
    username: "davidux",
    full_name: "David Okonkwo",
    avatar_url: "https://i.pravatar.cc/150?u=david",
    created_at: "",
    verified: true,
  },
  mia: {
    id: "u10",
    username: "miathemaker",
    full_name: "Mia Torres",
    avatar_url: "https://i.pravatar.cc/150?u=mia",
    created_at: "",
    verified: false,
  },
  ryan: {
    id: "u11",
    username: "ryanstartup",
    full_name: "Ryan Hughes",
    avatar_url: "https://i.pravatar.cc/150?u=ryan",
    created_at: "",
    verified: false,
  },
  chloe: {
    id: "u12",
    username: "chloecreates",
    full_name: "Chloe Adams",
    avatar_url: "https://i.pravatar.cc/150?u=chloe",
    created_at: "",
    verified: true,
  },
  kai: {
    id: "u13",
    username: "kaidev",
    full_name: "Kai Nakamura",
    avatar_url: "https://i.pravatar.cc/150?u=kai",
    created_at: "",
    verified: false,
  },
  zara: {
    id: "u14",
    username: "zaraml",
    full_name: "Zara Ahmed",
    avatar_url: "https://i.pravatar.cc/150?u=zara",
    created_at: "",
    verified: true,
  },
  liam: {
    id: "u15",
    username: "liambuilds",
    full_name: "Liam O'Brien",
    avatar_url: "https://i.pravatar.cc/150?u=liam",
    created_at: "",
    verified: false,
  },
  budi: {
    id: "u16",
    username: "budikoding",
    full_name: "Budi Santoso",
    avatar_url: "https://i.pravatar.cc/150?u=budi",
    created_at: "",
    verified: true,
  },
  rina: {
    id: "u17",
    username: "rinadev_",
    full_name: "Rina Wulandari",
    avatar_url: "https://i.pravatar.cc/150?u=rina",
    created_at: "",
    verified: false,
  },
  agus: {
    id: "u18",
    username: "agus.backend",
    full_name: "Agus Prasetyo",
    avatar_url: "https://i.pravatar.cc/150?u=agus",
    created_at: "",
    verified: false,
  },
  dinda: {
    id: "u19",
    username: "dinda.ui",
    full_name: "Dinda Ayu",
    avatar_url: "https://i.pravatar.cc/150?u=dinda",
    created_at: "",
    verified: true,
  },
  fajar: {
    id: "u20",
    username: "fajar_ngoding",
    full_name: "Fajar Ramadhan",
    avatar_url: "https://i.pravatar.cc/150?u=fajar",
    created_at: "",
    verified: false,
  },
  siti: {
    id: "u21",
    username: "sitiux",
    full_name: "Siti Nurhaliza",
    avatar_url: "https://i.pravatar.cc/150?u=siti",
    created_at: "",
    verified: false,
  },
  andi: {
    id: "u22",
    username: "andistartupin",
    full_name: "Andi Wijaya",
    avatar_url: "https://i.pravatar.cc/150?u=andi",
    created_at: "",
    verified: true,
  },
  mega: {
    id: "u23",
    username: "megacloud",
    full_name: "Mega Putri",
    avatar_url: "https://i.pravatar.cc/150?u=mega",
    created_at: "",
    verified: false,
  },
};

// ── User Profiles (extended data) ──────────────────────────────────────────

export const SUGGESTED_USERS: UserProfile[] = [
  {
    user: USERS.elena,
    bio: "Engineering lead @TechCorp. Writing about distributed systems & leadership.",
    followers_count: 48200,
    following_count: 312,
    mutual_follower: "sarahcodes",
  },
  {
    user: USERS.priya,
    bio: "Design systems architect. Previously @Figma. Opinions are my own.",
    followers_count: 31500,
    following_count: 287,
    mutual_follower: "davidux",
  },
  {
    user: USERS.nina,
    bio: 'Tech writer & storyteller. Author of "Ship It" newsletter.',
    followers_count: 22800,
    following_count: 198,
    mutual_follower: "chloecreates",
  },
  {
    user: USERS.zara,
    bio: "ML Engineer @DeepMind. Math nerd. Building the future one tensor at a time.",
    followers_count: 67400,
    following_count: 145,
    mutual_follower: "kaidev",
  },
  {
    user: USERS.david,
    bio: "UX Director. 15 years designing products people actually use.",
    followers_count: 54100,
    following_count: 423,
    mutual_follower: "priya.design",
  },
];

export const USER_PROFILES: Record<string, UserProfile> = {
  u1: {
    user: USERS.sarah,
    bio: "Staff engineer @Vercel. Clean code skeptic. Building tools for developers.",
    followers_count: 52300,
    following_count: 234,
  },
  u2: {
    user: USERS.marcus,
    bio: "Indie hacker building in public. Day 200+ of shipping every day.",
    followers_count: 8900,
    following_count: 567,
  },
  u3: {
    user: USERS.elena,
    bio: "Engineering lead @TechCorp. Writing about distributed systems & leadership.",
    followers_count: 48200,
    following_count: 312,
  },
  u4: {
    user: USERS.jake,
    bio: "Frontend dev who still fights CSS. Recovering jQuery addict.",
    followers_count: 15600,
    following_count: 890,
  },
  u5: {
    user: USERS.priya,
    bio: "Design systems architect. Previously @Figma. Opinions are my own.",
    followers_count: 31500,
    following_count: 287,
  },
  u6: {
    user: USERS.tom,
    bio: "Apple enthusiast. Reviewing gear nobody asked me to review.",
    followers_count: 12300,
    following_count: 445,
  },
  u7: {
    user: USERS.nina,
    bio: 'Tech writer & storyteller. Author of "Ship It" newsletter.',
    followers_count: 22800,
    following_count: 198,
  },
  u8: {
    user: USERS.alex,
    bio: "Full-stack dev & dad. My kid roasts my career for fun.",
    followers_count: 89400,
    following_count: 156,
  },
  u9: {
    user: USERS.david,
    bio: "UX Director. 15 years designing products people actually use.",
    followers_count: 54100,
    following_count: 423,
  },
  u10: {
    user: USERS.mia,
    bio: "Maker of things. Breaker of prod. Fixer of bugs (eventually).",
    followers_count: 34700,
    following_count: 312,
  },
  u11: {
    user: USERS.ryan,
    bio: "3x founder. Writing about startups, async work & escaping meeting hell.",
    followers_count: 41200,
    following_count: 278,
  },
  u12: {
    user: USERS.chloe,
    bio: "Product designer @Stripe. Simplifying the complex.",
    followers_count: 28900,
    following_count: 345,
  },
  u13: {
    user: USERS.kai,
    bio: "Junior dev leveling up. Documenting the journey.",
    followers_count: 6700,
    following_count: 1230,
  },
  u14: {
    user: USERS.zara,
    bio: "ML Engineer @DeepMind. Math nerd. Building the future one tensor at a time.",
    followers_count: 67400,
    following_count: 145,
  },
  u15: {
    user: USERS.liam,
    bio: "TypeScript evangelist. Autocomplete is all you need.",
    followers_count: 19800,
    following_count: 567,
  },
  u16: {
    user: USERS.budi,
    bio: "Senior dev yang masih suka lupa semicolon. Backend enthusiast. Kopi > segalanya.",
    followers_count: 34500,
    following_count: 412,
  },
  u17: {
    user: USERS.rina,
    bio: "Frontend dev. React simp. Kalau CSS-nya berantakan, itu fitur bukan bug.",
    followers_count: 18200,
    following_count: 678,
  },
  u18: {
    user: USERS.agus,
    bio: "Backend engineer @Tokopedia alumni. Sekarang freelance sambil ngopi.",
    followers_count: 12400,
    following_count: 345,
  },
  u19: {
    user: USERS.dinda,
    bio: "UI/UX Designer. Figma warrior. Pixel perfect or nothing.",
    followers_count: 27800,
    following_count: 234,
  },
  u20: {
    user: USERS.fajar,
    bio: "Self-taught developer. Belajar ngoding dari YouTube & StackOverflow.",
    followers_count: 8900,
    following_count: 1200,
  },
  u21: {
    user: USERS.siti,
    bio: "UX Researcher. Nanya-nanya user buat hidup. Introvert yang kerjaannya ngobrol.",
    followers_count: 15600,
    following_count: 456,
  },
  u22: {
    user: USERS.andi,
    bio: "3x startup founder. 2x gagal. Yang ke-3 masih ongoing, doain aja.",
    followers_count: 45200,
    following_count: 289,
  },
  u23: {
    user: USERS.mega,
    bio: "DevOps engineer. Kalo server down jam 3 pagi, pasti gue yang ditelepon.",
    followers_count: 11200,
    following_count: 567,
  },
};

// ── Following & Saved Feed IDs ───────────────────────────────────────────

export const FOLLOWING_POST_IDS = [
  "t2",
  "t5",
  "t7",
  "t8",
  "t13",
  "t16",
  "t18",
  "t22",
  "t26",
  "t28",
  "t34",
  "t35",
  "t37",
];
export const SAVED_POST_IDS = [
  "t3",
  "t4",
  "t7",
  "t12",
  "t15",
  "t19",
  "t24",
  "t25",
  "t29",
  "t36",
  "t38",
];

// ── Helpers ────────────────────────────────────────────────────────────────

function ago(minutes: number) {
  return new Date(Date.now() - 1000 * 60 * minutes).toISOString();
}

// ── Posts ──────────────────────────────────────────────────────────────────

export const MOCK_POSTS: Post[] = [
  {
    id: "t1",
    content:
      'Gue cuma mau bilang: influencer yang jualan skincare tapi muka-nya aja full filter, itu namanya PENIPUAN. Bukan endorsement.\n\nKemarin ada yang promote serum "hasilnya 3 hari glowing" tapi video before-after-nya beda lighting, beda kamera, beda angle. Lu kira kita buta?\n\nYang lebih parah: pas ditanya ingredient-nya apa, dia jawab "pokoknya bagus deh." POKOKNYA BAGUS. Ini skincare apa iman?',
    user_id: "u10",
    user: USERS.mia,
    created_at: ago(12),
    likes_count: 34800,
    comments_count: 4200,
    reposts_count: 8900,
    views_count: 890000,
    repliers_avatars: [
      USERS.dinda.avatar_url,
      USERS.siti.avatar_url,
      USERS.rina.avatar_url,
    ],
    space: SPACES[0],
  },
  {
    id: "t2",
    content:
      "KRL jam 7 pagi itu bukan transportasi. Itu survival game.\n\nLu harus:\n- Sprint dari parkiran\n- Sikut-sikutan masuk gerbong\n- Berdiri 45 menit dengan satu tangan pegangan, satu tangan pegang HP\n- Tahan napas pas ada bapak-bapak yang belum mandi\n- Pura-pura tidur biar ga disuruh kasih kursi\n\nDan ini SETIAP HARI. Gaji UMR tapi cardio-nya udah level atlet olimpiade.",
    user_id: "u4",
    user: USERS.jake,
    created_at: ago(25),
    likes_count: 52300,
    comments_count: 6700,
    reposts_count: 14000,
    views_count: 1340000,
    repliers_avatars: [
      USERS.agus.avatar_url,
      USERS.fajar.avatar_url,
      USERS.mega.avatar_url,
    ],
    space: SPACES[1],
  },
  {
    id: "t3",
    content:
      'Baru aja nonton debat capres. Dua-duanya bilang "kami akan memberantas korupsi."\n\nBro kalian literally diusung sama partai yang ketua-nya masuk penjara. Lu mau berantas siapa? Diri sendiri?\n\n🤡🤡🤡',
    user_id: "u11",
    user: USERS.ryan,
    created_at: ago(48),
    likes_count: 89200,
    comments_count: 12400,
    reposts_count: 23000,
    views_count: 3400000,
    repliers_avatars: [
      USERS.andi.avatar_url,
      USERS.budi.avatar_url,
      USERS.mega.avatar_url,
    ],
    space: SPACES[2],
  },
  {
    id: "t4",
    content:
      'Rendang itu BUKAN makanan kering. Rendang itu makanan basah yang dimasak lama sampai kering. Kalau dari awal udah kering, itu namanya DENDENG.\n\nGue capek debat ini tiap tahun. Ini udah ada di UNESCO. Minangkabau udah ngomong. Kenapa masih ada yang nanya?\n\nDan jangan mulai soal "nasi goreng pakai kecap atau engga" karena gue BELUM SIAP untuk perang itu.',
    image_urls: [
      "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=500&auto=format&fit=crop",
    ],
    user_id: "u6",
    user: USERS.tom,
    created_at: ago(65),
    likes_count: 67400,
    comments_count: 8900,
    reposts_count: 15600,
    views_count: 2100000,
    repliers_avatars: [
      USERS.agus.avatar_url,
      USERS.siti.avatar_url,
      USERS.dinda.avatar_url,
    ],
    space: SPACES[3],
  },
  {
    id: "t5",
    content:
      'Anak gue kelas 3 SD tadi nanya: "Pa, kenapa Pa kerja terus? Kan ada ChatGPT."\n\nGue: "..."\nAnak gue: "Temen aku bikin PR pake ChatGPT loh, dapet 100."\nGue: "..."\nBini gue: "Jawab tuh."\n\n6 tahun kuliah IT. 10 tahun karir. Kalah sama anak kelas 3 SD yang bisa prompt engineering.',
    user_id: "u8",
    user: USERS.alex,
    created_at: ago(90),
    likes_count: 78400,
    comments_count: 9200,
    reposts_count: 21000,
    views_count: 2800000,
    repliers_avatars: [
      USERS.budi.avatar_url,
      USERS.rina.avatar_url,
      USERS.fajar.avatar_url,
    ],
    space: SPACES[4],
  },
  {
    id: "t6",
    content:
      'THREAD: kenapa artis Indonesia kalau udah kena cancel malah makin terkenal?\n\n1. Minggu 1: skandal keluar\n2. Minggu 2: nangis di podcast\n3. Minggu 3: "aku mau hiatus dulu"\n4. Minggu 4: upload foto liburan di Bali\n5. Bulan 2: comeback dengan single baru\n6. Bulan 3: follower naik 2x lipat\n\nKesimpulan: cancel culture di Indonesia itu basically marketing strategy gratis.',
    user_id: "u3",
    user: USERS.elena,
    created_at: ago(130),
    likes_count: 45600,
    comments_count: 7800,
    reposts_count: 12000,
    views_count: 1900000,
    repliers_avatars: [
      USERS.mia.avatar_url,
      USERS.nina.avatar_url,
      USERS.dinda.avatar_url,
    ],
    space: SPACES[0],
  },
  {
    id: "t7",
    content:
      'Update dari tukang nasi goreng depan kos:\n\nBeliau sekarang terima QRIS.\nAda menu baru: "Nasgor Sigma" (nasi goreng tanpa nasi, isinya telur doang).\nTagline-nya: "Grindset dimulai dari perut."\n\nGue tanya kenapa namanya Sigma, dia jawab: "Ga tau mas, anak-anak pada mesen sambil bilang sigma sigma. Ya udah saya pake aja."\n\nKing.',
    user_id: "u2",
    user: USERS.marcus,
    created_at: ago(170),
    likes_count: 92100,
    comments_count: 11200,
    reposts_count: 28000,
    views_count: 4200000,
    repliers_avatars: [
      USERS.fajar.avatar_url,
      USERS.agus.avatar_url,
      USERS.jake.avatar_url,
    ],
    space: SPACES[1],
  },
  {
    id: "t8",
    content:
      'Orang Indo kalo ngobrol di grup WA kantor:\n\n"Noted with thanks" = gue ga baca\n"Siap, akan segera di-follow up" = gue lupa besok\n"Menarik, bisa di-discuss lebih lanjut" = ide lo jelek tapi gue ga mau bilang\n"Saya align dengan pendapat Pak/Bu" = gue ga punya pendapat\n"Let me check dulu ya" = gue ga tau dan ga mau ngaku\n\nGue udah kerja 8 tahun dan bahasa korporat Indo ini lebih susah dari bahasa Jepang.',
    user_id: "u9",
    user: USERS.david,
    created_at: ago(210),
    likes_count: 56700,
    comments_count: 7200,
    reposts_count: 13400,
    views_count: 1700000,
    repliers_avatars: [
      USERS.siti.avatar_url,
      USERS.andi.avatar_url,
      USERS.mega.avatar_url,
    ],
    space: SPACES[6],
  },
  {
    id: "t9",
    content:
      'Ke dokter.\n\nDokter: "Mas kurang tidur ya?"\nGue: "Iya dok, kerja sampe malem terus."\nDokter: "Harus istirahat yang cukup, jangan begadang."\nGue: "Siap dok."\n\nMalemnya gue scroll TikTok sampe jam 3.\n\nBesoknya ke dokter lagi.\n\n♻️ infinite loop',
    user_id: "u13",
    user: USERS.kai,
    created_at: ago(280),
    likes_count: 41200,
    comments_count: 5100,
    reposts_count: 9800,
    views_count: 824000,
    repliers_avatars: [
      USERS.fajar.avatar_url,
      USERS.rina.avatar_url,
      USERS.alex.avatar_url,
    ],
    space: SPACES[6],
  },
  {
    id: "t10",
    content:
      'Kos-kosan Jakarta 2.5jt/bulan:\n\n- Kamar 2x3 meter\n- Kamar mandi sharing ber-10\n- WiFi "up to 100mbps" (realita: buffering YouTube 360p)\n- "Furnished" = kasur tipis + lemari mau roboh\n- Parkiran "luas" = muat 3 motor kalo saling tindih\n- "Strategis dekat MRT" = 2km jalan kaki lewat gang sempit\n\nTapi kalo lo complain, yang punya bilang: "Ya namanya juga Jakarta, Mas."\n\nYa memang, namanya juga penderitaan.',
    user_id: "u20",
    user: USERS.fajar,
    created_at: ago(340),
    likes_count: 63400,
    comments_count: 8100,
    reposts_count: 16000,
    views_count: 2100000,
    repliers_avatars: [
      USERS.agus.avatar_url,
      USERS.kai.avatar_url,
      USERS.mega.avatar_url,
    ],
    space: SPACES[1],
  },
  {
    id: "t11",
    content:
      'Controversial take: podcast Indonesia itu 90% isinya cuma ngegosip tapi dikasih label "deep conversation" atau "raw and unfiltered."\n\nLu berdua duduk 2 jam ngomongin mantan masing-masing terus bilang ini "healing content." Bro itu bukan healing, itu terapi yang harusnya lo bayar ke psikolog.\n\nPodcast yang beneran bagus di Indo bisa dihitung pake jari. Satu tangan. Yang kelingkingnya patah.',
    user_id: "u14",
    user: USERS.zara,
    created_at: ago(400),
    likes_count: 38900,
    comments_count: 6700,
    reposts_count: 8900,
    views_count: 1560000,
    repliers_avatars: [
      USERS.elena.avatar_url,
      USERS.nina.avatar_url,
      USERS.mia.avatar_url,
    ],
    space: SPACES[0],
  },
  {
    id: "t12",
    content:
      'Kakak gue nikahan budget 200jt. Makanannya enak. Dekorasinya bagus. Semua senang.\n\nTemen gue nikahan budget 800jt. Makanannya sama aja. Tapi ada photo booth, drone, hologram pengantin masuk, dan ice sculpture bentuk angsa.\n\nPas gue tanya worth it ga, dia bilang: "Ga sih, tapi ibu mertua yang mau."\n\nKesimpulan: nikahan itu bukan buat yang nikah. Nikahan itu buat ibu mertua dan Instagram.',
    user_id: "u12",
    user: USERS.chloe,
    created_at: ago(460),
    likes_count: 71200,
    comments_count: 9400,
    reposts_count: 18000,
    views_count: 2800000,
    repliers_avatars: [
      USERS.dinda.avatar_url,
      USERS.siti.avatar_url,
      USERS.rina.avatar_url,
    ],
    space: SPACES[6],
  },
  {
    id: "t13",
    content:
      'Warung makan bu Yati di gang sebelah udah 23 tahun buka. Ga pernah ganti menu. Ga ada Instagram. Ga ada Grab/GoFood. Bayar cash doang.\n\nSetiap hari PENUH. Antri 30 menit. Nasi + ayam goreng + sambal + es teh = 18rb.\n\nSementara cafe baru di Kemang, buka 6 bulan, menu fusion "nasi goreng truffle" 89rb, rating 3.2 di Google, udah tutup.\n\nConsistency > aesthetic. Bu Yati menang.',
    image_urls: [
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop",
    ],
    user_id: "u15",
    user: USERS.liam,
    created_at: ago(530),
    likes_count: 89700,
    comments_count: 10200,
    reposts_count: 24000,
    views_count: 3600000,
    repliers_avatars: [
      USERS.tom.avatar_url,
      USERS.agus.avatar_url,
      USERS.fajar.avatar_url,
    ],
    space: SPACES[3],
  },
  {
    id: "t14",
    content:
      'Gue: *posting foto makanan di story*\n\nTemen SMA yang 10 tahun ga pernah ngobrol: "Wah di mana tuh? Ajak-ajak dong hehe"\n\nBro terakhir kita ngobrol lo minjem duit gue 200rb dan belum balikin. Jangan "hehe" gue.',
    user_id: "u7",
    user: USERS.nina,
    created_at: ago(600),
    likes_count: 54300,
    comments_count: 6800,
    reposts_count: 13000,
    views_count: 1800000,
    repliers_avatars: [
      USERS.alex.avatar_url,
      USERS.marcus.avatar_url,
      USERS.jake.avatar_url,
    ],
    space: SPACES[6],
  },
  {
    id: "t15",
    content:
      'Pejabat: "Anak muda harus kreatif, jangan cuma jadi karyawan!"\n\nAnak muda: *bikin usaha*\n\nPejabat: "Izin usaha, NPWP, NIB, sertifikat halal, izin lingkungan, BPOM, laporan pajak bulanan..."\n\nAnak muda: "..."\n\nPejabat: "Kenapa anak muda sekarang ga kreatif ya?"',
    user_id: "u5",
    user: USERS.priya,
    created_at: ago(700),
    likes_count: 98400,
    comments_count: 13200,
    reposts_count: 28000,
    views_count: 4100000,
    repliers_avatars: [
      USERS.andi.avatar_url,
      USERS.ryan.avatar_url,
      USERS.mega.avatar_url,
    ],
    space: SPACES[2],
  },
  {
    id: "t16",
    content:
      'Gebetan gue bales chat 3 hari kemudian terus bilang "sorry baru baca hehe."\n\nMbak, gue liat lo online 47 kali sejak gue chat. Lo posting 3 story. Lo reply tweet orang. Lo update LinkedIn.\n\nYang lo "baru baca" itu chat gue atau perasaan gue?',
    user_id: "u1",
    user: USERS.sarah,
    created_at: ago(800),
    likes_count: 82100,
    comments_count: 11400,
    reposts_count: 22000,
    views_count: 3200000,
    repliers_avatars: [
      USERS.dinda.avatar_url,
      USERS.nina.avatar_url,
      USERS.kai.avatar_url,
    ],
    space: SPACES[6],
  },
  {
    id: "t17",
    content:
      'Ortu gue dulu: "Jangan kebanyakan main HP!"\n\nOrtu gue sekarang:\n- Grup WA 47 buah\n- Forward hoax sehari 12x\n- Main Candy Crush sampe level 4000\n- Nonton drakor di HP sampe jam 2 pagi\n- Video call sama temen arisan 3 jam\n\nPas gue sindir, mama gue bilang: "Mama kan udah tua, biar lah."\n\nDouble standards yang paling ikonik di dunia.',
    user_id: "u9",
    user: USERS.david,
    created_at: ago(900),
    likes_count: 74600,
    comments_count: 8900,
    reposts_count: 19000,
    views_count: 2900000,
    repliers_avatars: [
      USERS.alex.avatar_url,
      USERS.fajar.avatar_url,
      USERS.siti.avatar_url,
    ],
    space: SPACES[6],
  },
  {
    id: "t18",
    content:
      "Baru sadar kerjaan gue sebagai developer itu intinya cuma copy paste dari StackOverflow terus ganti nama variabel biar keliatan original.\n\nYang bikin senior itu bukan skill-nya, tapi kecepatan googling-nya.",
    user_id: "u16",
    user: USERS.budi,
    created_at: ago(15),
    likes_count: 8900,
    comments_count: 567,
    reposts_count: 2100,
    views_count: 178000,
    repliers_avatars: [
      USERS.rina.avatar_url,
      USERS.fajar.avatar_url,
      USERS.agus.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t19",
    content:
      'Interview di startup:\n\nHR: "Expectednya berapa?"\nGue: "15 juta"\nHR: "Wah kita budgetnya 7 juta tapi kita punya unlimited snack dan ping pong table"\nGue: "..."\nHR: "Kita juga kerja kayak keluarga di sini"\n\nYa emang keluarga gue juga ga bayar gue sih.',
    user_id: "u22",
    user: USERS.andi,
    created_at: ago(35),
    likes_count: 34500,
    comments_count: 4200,
    reposts_count: 8900,
    views_count: 890000,
    repliers_avatars: [
      USERS.budi.avatar_url,
      USERS.mega.avatar_url,
      USERS.rina.avatar_url,
    ],
    space: SPACES[6],
  },
  {
    id: "t20",
    content:
      "Unpopular opinion: kalo lo baru belajar ngoding, JANGAN langsung belajar framework.\n\nGue liat anak-anak baru langsung loncat ke Next.js padahal HTML form aja belum ngerti cara kerjanya. Terus heran kenapa error mulu.\n\nIbarat mau nyetir mobil F1 tapi belum bisa naik sepeda.",
    user_id: "u17",
    user: USERS.rina,
    created_at: ago(55),
    likes_count: 12300,
    comments_count: 1890,
    reposts_count: 3400,
    views_count: 246000,
    repliers_avatars: [
      USERS.fajar.avatar_url,
      USERS.budi.avatar_url,
      USERS.agus.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t21",
    content:
      'Client: "Mas, ini bisa ga tambahin fitur kecil aja?"\n\nFitur "kecil" nya:\n- Login dengan face recognition\n- Integration sama 3 payment gateway\n- Real-time chat\n- Dashboard analytics\n- Mobile app juga ya sekalian\n\nDeadline: Jumat ini.\n\nGue: *buka LinkedIn*',
    user_id: "u18",
    user: USERS.agus,
    created_at: ago(75),
    likes_count: 28700,
    comments_count: 3100,
    reposts_count: 6700,
    views_count: 574000,
    repliers_avatars: [
      USERS.budi.avatar_url,
      USERS.andi.avatar_url,
      USERS.mega.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t22",
    content:
      'Tipe-tipe developer di meeting:\n\n1. Yang selalu mute tapi tiba-tiba unmute buat bilang "iya setuju"\n2. Yang share screen tapi lupa nutup tab Tokopedia\n3. Yang ngomong "harusnya gampang sih" (spoiler: ga pernah gampang)\n4. Yang join telat 15 menit terus nanya "tadi ngomongin apa?"\n5. Yang kameranya mati tapi sebenernya lagi masak',
    user_id: "u16",
    user: USERS.budi,
    created_at: ago(110),
    likes_count: 45200,
    comments_count: 5600,
    reposts_count: 12000,
    views_count: 1200000,
    repliers_avatars: [
      USERS.rina.avatar_url,
      USERS.siti.avatar_url,
      USERS.agus.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t23",
    content:
      'Designer: "Ini udah pixel perfect ya"\nDeveloper: *buka di HP Android harga 2 juta*\nDesigner: 👁️👄👁️\n\nSeriously though, 70% user Indonesia pake HP mid-range. Kalo design lo cuma bagus di MacBook Pro, lo bukan designer lo interior decorator.',
    user_id: "u19",
    user: USERS.dinda,
    created_at: ago(150),
    likes_count: 19800,
    comments_count: 2300,
    reposts_count: 4500,
    views_count: 396000,
    repliers_avatars: [
      USERS.siti.avatar_url,
      USERS.rina.avatar_url,
      USERS.budi.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t24",
    content:
      'Cerita sedih developer Indonesia:\n\nBelajar ngoding 2 tahun ✅\nBikin portfolio ✅\nApply 100+ lowongan ✅\nDapet interview ✅\n\n"Maaf mas, kita cari yang pengalaman minimal 5 tahun untuk posisi junior"\n\n????\n\nYang bikin requirement ini pasti orang yang ga pernah ngoding seumur hidup.',
    user_id: "u20",
    user: USERS.fajar,
    created_at: ago(200),
    likes_count: 56700,
    comments_count: 7800,
    reposts_count: 15000,
    views_count: 1800000,
    repliers_avatars: [
      USERS.budi.avatar_url,
      USERS.rina.avatar_url,
      USERS.andi.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t25",
    content:
      'Bos gue tadi presentasi ke investor pake slide yang isinya:\n\n"We are the Uber of laundry"\n"AI-powered blockchain-based solution"\n"Disrupting the traditional market"\n\nPadahal app kita literally cuma form input + WhatsApp redirect.\n\nTapi dapet funding 2M USD.\n\nGue salah jurusan kayanya, harusnya gue jadi sales aja.',
    user_id: "u22",
    user: USERS.andi,
    created_at: ago(250),
    likes_count: 67800,
    comments_count: 8900,
    reposts_count: 18000,
    views_count: 2300000,
    repliers_avatars: [
      USERS.mega.avatar_url,
      USERS.budi.avatar_url,
      USERS.agus.avatar_url,
    ],
    space: SPACES[6],
  },
  {
    id: "t26",
    content:
      "Server down jam 3 pagi.\n\nGue bangun, buka laptop, fix bug-nya.\n\nTernyata masalahnya: ada yang push langsung ke production tanpa testing.\n\nSiapa?\n\nGue sendiri kemarin sore.\n\n🤡",
    user_id: "u23",
    user: USERS.mega,
    created_at: ago(320),
    likes_count: 38900,
    comments_count: 4500,
    reposts_count: 9800,
    views_count: 780000,
    repliers_avatars: [
      USERS.agus.avatar_url,
      USERS.budi.avatar_url,
      USERS.fajar.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t27",
    content:
      'User research hari ini:\n\nGue: "Biasanya kalo pake app ini, fitur apa yang paling sering dipake?"\nUser: "Ga tau, biasanya cuma buka terus close lagi"\nGue: "...kenapa?"\nUser: "Soalnya loading-nya lama, keburu males"\n\nYa udah makasih bu, cukup hari ini. *menangis dalam diam*',
    user_id: "u21",
    user: USERS.siti,
    created_at: ago(400),
    likes_count: 23400,
    comments_count: 3200,
    reposts_count: 5600,
    views_count: 468000,
    repliers_avatars: [
      USERS.dinda.avatar_url,
      USERS.rina.avatar_url,
      USERS.budi.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t28",
    content:
      'Stages of debugging:\n\n1. "Ini gampang paling 5 menit"\n2. "Hmm kok ga work ya"\n3. "Oke mungkin gue salah di sini"\n4. "WHAT THE HELL"\n5. *googling error message*\n6. "Ternyata ada thread StackOverflow dari 2014"\n7. "Jawaban: tambahin semicolon"\n8. "........."\n9. *tutup laptop, pergi ngopi*',
    user_id: "u18",
    user: USERS.agus,
    created_at: ago(480),
    likes_count: 41200,
    comments_count: 5100,
    reposts_count: 11000,
    views_count: 824000,
    repliers_avatars: [
      USERS.budi.avatar_url,
      USERS.fajar.avatar_url,
      USERS.mega.avatar_url,
    ],
    space: SPACES[5],
  },
  {
    id: "t29",
    content:
      'Kalo lo kerja di startup Indonesia, lo pasti familiar sama kalimat-kalimat ini:\n\n- "Kita pivot aja" (baca: kita ga tau mau ngapain)\n- "Kita lean startup" (baca: ga ada budget)\n- "Equity-based compensation" (baca: ga digaji)\n- "Fast-paced environment" (baca: chaos)\n- "Wear many hats" (baca: lo ngerjain kerjaan 5 orang)\n\nGue udah kena semua. AMA.',
    user_id: "u22",
    user: USERS.andi,
    created_at: ago(550),
    likes_count: 72300,
    comments_count: 9200,
    reposts_count: 19000,
    views_count: 2900000,
    repliers_avatars: [
      USERS.budi.avatar_url,
      USERS.mega.avatar_url,
      USERS.rina.avatar_url,
    ],
    space: SPACES[6],
  },

  // ── Repost variant: post with embedded repost ──
  {
    id: "t30",
    content:
      "Ini literally gue banget. Gue udah apply 200+ dan yang bales cuma 3. Yang 3 itu juga ghosting setelah interview. Sistem hiring di Indo emang broken.",
    user_id: "u18",
    user: USERS.agus,
    created_at: ago(180),
    likes_count: 12400,
    comments_count: 890,
    reposts_count: 3200,
    views_count: 456000,
    repliers_avatars: [USERS.budi.avatar_url, USERS.fajar.avatar_url],
    space: SPACES[5],
    repost: {
      id: "t24",
      content:
        'Cerita sedih developer Indonesia:\n\nBelajar ngoding 2 tahun ✅\nBikin portfolio ✅\nApply 100+ lowongan ✅\nDapet interview ✅\n\n"Maaf mas, kita cari yang pengalaman minimal 5 tahun untuk posisi junior"\n\n????\n\nYang bikin requirement ini pasti orang yang ga pernah ngoding seumur hidup.',
      user_id: "u20",
      user: USERS.fajar,
      created_at: ago(200),
      likes_count: 56700,
      comments_count: 7800,
      reposts_count: 15000,
      views_count: 1800000,
      space: SPACES[5],
    },
  },
  {
    id: "t31",
    content:
      "WKWKWK gue baru aja presentasi ke investor pake deck yang literally cuma 3 slide. Dapet deal. Meanwhile temen gue bikin 50 slide ditolak semua. Kadang hidup emang ga adil 😂",
    user_id: "u11",
    user: USERS.ryan,
    created_at: ago(95),
    likes_count: 23400,
    comments_count: 2100,
    reposts_count: 5600,
    views_count: 670000,
    repliers_avatars: [USERS.andi.avatar_url, USERS.mega.avatar_url],
    space: SPACES[6],
    repost: {
      id: "t25",
      content:
        'Bos gue tadi presentasi ke investor pake slide yang isinya:\n\n"We are the Uber of laundry"\n"AI-powered blockchain-based solution"\n"Disrupting the traditional market"\n\nPadahal app kita literally cuma form input + WhatsApp redirect.\n\nTapi dapet funding 2M USD.',
      user_id: "u22",
      user: USERS.andi,
      created_at: ago(250),
      likes_count: 67800,
      comments_count: 8900,
      reposts_count: 18000,
      views_count: 2300000,
      space: SPACES[6],
    },
  },

  // ── Anonymous posts to spaces ──
  {
    id: "t32",
    content:
      "Gue secretly suka sama coworker gue. Udah 2 tahun. Dia duduknya persis di depan gue. Tiap hari gue pura-pura fokus kerja padahal dalem hati mau meledak.\n\nYang bikin makin susah: dia baru aja putus. Tapi gue ga berani ngomong karena takut ngerusak pertemanan + suasana kantor.\n\nGue harus gimana? Serius butuh saran.",
    user_id: "u_anon1",
    user: {
      id: "u_anon1",
      username: "anonymous",
      full_name: "Anonymous",
      avatar_url: "",
      created_at: "",
      verified: false,
    },
    created_at: ago(42),
    likes_count: 18900,
    comments_count: 3400,
    reposts_count: 1200,
    views_count: 890000,
    repliers_avatars: [
      USERS.nina.avatar_url,
      USERS.dinda.avatar_url,
      USERS.siti.avatar_url,
    ],
    space: SPACES[6],
    is_anonymous: true,
  },
  {
    id: "t33",
    content:
      "Gaji gue 45jt/bulan tapi gue ga happy. Setiap hari kerja 14 jam. Weekend juga kerja. Ga punya waktu buat keluarga, temen, atau diri sendiri.\n\nKemarin anak gue nanya kenapa papa ga pernah di rumah. Gue ga bisa jawab.\n\nGue mau resign tapi takut ga dapet kerjaan segitu lagi. Gue trapped.",
    user_id: "u_anon2",
    user: {
      id: "u_anon2",
      username: "anonymous",
      full_name: "Anonymous",
      avatar_url: "",
      created_at: "",
      verified: false,
    },
    created_at: ago(68),
    likes_count: 34500,
    comments_count: 5600,
    reposts_count: 4500,
    views_count: 1560000,
    repliers_avatars: [
      USERS.andi.avatar_url,
      USERS.budi.avatar_url,
      USERS.mega.avatar_url,
    ],
    space: SPACES[6],
    is_anonymous: true,
  },

  // ── Public posts (no topic/space) ──
  {
    id: "t34",
    content:
      'Hari ini gue mutusin buat belajar masak. Bukan karena mau sehat. Bukan karena mau hemat.\n\nTapi karena GoFood udah auto-suggest "Nasi Goreng Spesial" sebelum gue ketik apa-apa. Algoritma-nya udah kenal gue lebih baik dari mama gue sendiri.\n\nIt\'s time to change.',
    user_id: "u13",
    user: USERS.kai,
    created_at: ago(22),
    likes_count: 15600,
    comments_count: 2300,
    reposts_count: 4100,
    views_count: 520000,
    repliers_avatars: [USERS.fajar.avatar_url, USERS.agus.avatar_url],
  },
  {
    id: "t35",
    content:
      'Hot take: orang yang bilang "gue ga butuh validasi dari orang lain" biasanya orang yang PALING butuh validasi.\n\nSource: gue sendiri.',
    user_id: "u1",
    user: USERS.sarah,
    created_at: ago(38),
    likes_count: 42100,
    comments_count: 3800,
    reposts_count: 9200,
    views_count: 1340000,
    repliers_avatars: [
      USERS.nina.avatar_url,
      USERS.elena.avatar_url,
      USERS.mia.avatar_url,
    ],
  },
  {
    id: "t36",
    content:
      'Baru aja ketemu mantannya temen gue di Starbucks. Dia bilang "Hai, apa kabar? Lama ga ketemu!"\n\nPadahal gue bukan temennya. Gue temennya ex-nya. Dan gue yang bantu nge-stalk IG dia selama 6 bulan.\n\nAwkward level: infinite.',
    user_id: "u7",
    user: USERS.nina,
    created_at: ago(52),
    likes_count: 28700,
    comments_count: 4100,
    reposts_count: 7800,
    views_count: 980000,
    repliers_avatars: [USERS.sarah.avatar_url, USERS.chloe.avatar_url],
  },

  // ── Posts with many images (scrollable gallery) ──
  {
    id: "t37",
    content:
      "Weekend kemarin explore kafe-kafe hidden gem di Bandung. Thread 🧵\n\nSemua harga di bawah 50rb per orang. Tempatnya aesthetic tapi ga pretentious. Kopinya enak beneran, bukan cuma buat foto.",
    image_urls: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop",
    ],
    user_id: "u19",
    user: USERS.dinda,
    created_at: ago(28),
    likes_count: 19800,
    comments_count: 2800,
    reposts_count: 6700,
    views_count: 780000,
    repliers_avatars: [
      USERS.siti.avatar_url,
      USERS.rina.avatar_url,
      USERS.tom.avatar_url,
    ],
    space: SPACES[3],
  },
  {
    id: "t38",
    content:
      "Dokumentasi setup WFH gue dari 2020 sampe sekarang. Dari meja lipat + kursi plastik sampe battlestation impian. Totalnya habis 25jt tapi pelan-pelan, bukan sekaligus.\n\nMoral of the story: investasi workspace itu worth it. Produktivitas naik, punggung ga sakit lagi.",
    image_urls: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500&auto=format&fit=crop",
    ],
    user_id: "u16",
    user: USERS.budi,
    created_at: ago(85),
    likes_count: 31200,
    comments_count: 4500,
    reposts_count: 8900,
    views_count: 1200000,
    repliers_avatars: [
      USERS.agus.avatar_url,
      USERS.fajar.avatar_url,
      USERS.rina.avatar_url,
    ],
    space: SPACES[4],
  },
  {
    id: "t39",
    content:
      "Street food Jakarta yang WAJIB dicoba kalo kalian baru pindah ke sini. Semua di bawah 20rb dan rasanya ga kalah sama restoran bintang 5 (menurut gue).",
    image_urls: [
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop",
    ],
    user_id: "u6",
    user: USERS.tom,
    created_at: ago(120),
    likes_count: 45600,
    comments_count: 6200,
    reposts_count: 12000,
    views_count: 2100000,
    repliers_avatars: [
      USERS.agus.avatar_url,
      USERS.fajar.avatar_url,
      USERS.dinda.avatar_url,
    ],
    space: SPACES[3],
  },
];

export const MOCK_COMMENTS: Record<string, PostComment[]> = {
  t1: [
    {
      id: "c1",
      post_id: "t1",
      user: USERS.dinda,
      content:
        'AKHIRNYA ADA YANG NGOMONG. Gue beli serum 350rb karena influencer X bilang "life changing." Hasilnya? Jerawat tambah 5 biji. Life changing emang. Life gue jadi lebih jelek.',
      created_at: ago(10),
      likes_count: 5600,
      replies: [
        {
          id: "c1_1",
          post_id: "t1",
          user: USERS.mia,
          content:
            'Yang paling lucu tuh pas diminta review jujur, mereka bilang "setiap kulit beda-beda ya." Gak gitu cara kerja accountability, mbak.',
          created_at: ago(8),
          likes_count: 3400,
        },
        {
          id: "c1_2",
          post_id: "t1",
          user: USERS.rina,
          content:
            "Unpopular opinion: mending beli skincare dari dokter kulit 150rb daripada skincare influencer 500rb yang ingredient-nya air sumur dikasih pewangi",
          created_at: ago(7),
          likes_count: 8900,
        },
      ],
    },
    {
      id: "c2",
      post_id: "t1",
      user: USERS.siti,
      content: "Tapi... skincare yang X promote emang bagus sih di gue... 🙈",
      created_at: ago(9),
      likes_count: 890,
      replies: [
        {
          id: "c2_1",
          post_id: "t1",
          user: USERS.nina,
          content: "Found the influencer's alt account",
          created_at: ago(6),
          likes_count: 15000,
        },
      ],
    },
    {
      id: "c3",
      post_id: "t1",
      user: USERS.chloe,
      content:
        "Gue kerja di beauty brand. Mau tau rahasia? Serum 500rb sama yang 50rb kadang LITERALLY isinya sama. Yang beda cuma packaging sama budget influencer-nya.",
      created_at: ago(5),
      likes_count: 21000,
    },
  ],
  t2: [
    {
      id: "c4",
      post_id: "t2",
      user: USERS.agus,
      content:
        "Lo lupa survival skill paling penting: pura-pura telepon biar ga ditawarin MLM sama orang random di kereta.",
      created_at: ago(23),
      likes_count: 8900,
      replies: [
        {
          id: "c4_1",
          post_id: "t2",
          user: USERS.jake,
          content:
            'WKWK ini gue pernah kena. Bapak-bapak tiba-tiba presentasi bisnis "passive income" di gerbong KRL. Lengkap sama brosur.',
          created_at: ago(22),
          likes_count: 6700,
        },
      ],
    },
    {
      id: "c5",
      post_id: "t2",
      user: USERS.mega,
      content:
        "Gue pernah ketiduran di KRL. Bangun-bangun udah di Bogor. Gue kerja di Sudirman. BOGOR.",
      created_at: ago(20),
      likes_count: 18000,
    },
    {
      id: "c6",
      post_id: "t2",
      user: USERS.fajar,
      content:
        "Yang paling horror itu pas jam pulang kantor. Lo bukan naik kereta, lo di-upload ke kereta.",
      created_at: ago(18),
      likes_count: 12000,
    },
  ],
  t3: [
    {
      id: "c7",
      post_id: "t3",
      user: USERS.andi,
      content: "Hati-hati bro ntar di-grebek 💀",
      created_at: ago(46),
      likes_count: 23000,
      replies: [
        {
          id: "c7_1",
          post_id: "t3",
          user: USERS.ryan,
          content: "Gue ngomong fakta doang kok, yang ngerasa silahkan",
          created_at: ago(45),
          likes_count: 15000,
        },
        {
          id: "c7_2",
          post_id: "t3",
          user: USERS.budi,
          content: "RIP mentions. Siap-siap buzzer dateng.",
          created_at: ago(44),
          likes_count: 8900,
        },
      ],
    },
    {
      id: "c8",
      post_id: "t3",
      user: USERS.mega,
      content:
        "Ga setuju. Pasti ada konteksnya. Jangan gampang judge. *liat username* oh ini akun anonim ya. Ya berani sih kalo anonim.",
      created_at: ago(43),
      likes_count: 7800,
    },
  ],
  t4: [
    {
      id: "c9",
      post_id: "t4",
      user: USERS.agus,
      content:
        "Oke tapi rendang padang yang bener itu yang mana? Serius nanya, bukan mau mulai perang.",
      created_at: ago(63),
      likes_count: 2300,
      replies: [
        {
          id: "c9_1",
          post_id: "t4",
          user: USERS.tom,
          content:
            '"Bukan mau mulai perang" terus nanya pertanyaan yang literally memulai perang setiap tahun 💀',
          created_at: ago(62),
          likes_count: 18000,
        },
      ],
    },
    {
      id: "c10",
      post_id: "t4",
      user: USERS.siti,
      content:
        "Nasi goreng TANPA kecap itu bukan nasi goreng. Itu nasi yang digoreng. Ada bedanya.",
      created_at: ago(61),
      likes_count: 12000,
    },
    {
      id: "c11",
      post_id: "t4",
      user: USERS.dinda,
      content:
        "Yang paling berani itu orang yang bilang Indomie rasa Mie Sedaap lebih enak. Lu mau diusir dari Indonesia?",
      created_at: ago(60),
      likes_count: 34000,
    },
  ],
  t5: [
    {
      id: "c12",
      post_id: "t5",
      user: USERS.budi,
      content:
        "Anak kelas 3 SD literally lebih jago teknologi dari kita semua. Gue masih bingung cara pake Bluetooth, anak gue udah bikin presentasi pake Canva.",
      created_at: ago(88),
      likes_count: 9800,
    },
    {
      id: "c13",
      post_id: "t5",
      user: USERS.rina,
      content:
        '"Kalah sama anak kelas 3 SD yang bisa prompt engineering" ini kalimat paling menyakitkan yang pernah gue baca hari ini',
      created_at: ago(86),
      likes_count: 15000,
      replies: [
        {
          id: "c13_1",
          post_id: "t5",
          user: USERS.alex,
          content:
            "Yang lebih sakit: bini gue sekarang minta ChatGPT buat masalah rumah tangga, bukan gue.",
          created_at: ago(85),
          likes_count: 28000,
        },
      ],
    },
    {
      id: "c14",
      post_id: "t5",
      user: USERS.fajar,
      content:
        "Bang gue baru lulus bootcamp 3 bulan. Apakah gue udah kalah sebelum mulai?",
      created_at: ago(84),
      likes_count: 5600,
    },
  ],
  t6: [
    {
      id: "c15",
      post_id: "t6",
      user: USERS.nina,
      content:
        'Step 3.5 yang lo lupa: posting story gelap dengan caption "Allah tau" atau quote Jalaluddin Rumi yang ga nyambung.',
      created_at: ago(128),
      likes_count: 23000,
    },
    {
      id: "c16",
      post_id: "t6",
      user: USERS.mia,
      content:
        "Gue kerja di media. Bisa confirm ini literally playbook yang dipake. Ada artis yang SENGAJA bikin skandal biar rame.",
      created_at: ago(126),
      likes_count: 12000,
      replies: [
        {
          id: "c16_1",
          post_id: "t6",
          user: USERS.elena,
          content:
            "Spill dong siapa. Ga usah sebut nama juga gpp. Kasih inisial aja. 👀",
          created_at: ago(125),
          likes_count: 34000,
        },
        {
          id: "c16_2",
          post_id: "t6",
          user: USERS.mia,
          content: "Gue masih butuh gaji WKWK",
          created_at: ago(124),
          likes_count: 45000,
        },
      ],
    },
    {
      id: "c17",
      post_id: "t6",
      user: USERS.dinda,
      content:
        "Cancel culture di Indo itu kayak diet Senin. Semangat 3 hari, Kamis udah makan bakso lagi.",
      created_at: ago(122),
      likes_count: 28000,
    },
  ],
  t7: [
    {
      id: "c18",
      post_id: "t7",
      user: USERS.fajar,
      content: '"Nasgor Sigma" WKWKWK gue mau order ini tiap hari',
      created_at: ago(168),
      likes_count: 12000,
    },
    {
      id: "c19",
      post_id: "t7",
      user: USERS.agus,
      content:
        "Tukang nasgor depan kos gue nerima crypto. Ga boong. Dia pasang QR code di gerobak. Indonesia udah beda.",
      created_at: ago(166),
      likes_count: 8900,
      replies: [
        {
          id: "c19_1",
          post_id: "t7",
          user: USERS.marcus,
          content: "Lo serius? 💀 Bayarnya pake coin apa?",
          created_at: ago(165),
          likes_count: 4500,
        },
        {
          id: "c19_2",
          post_id: "t7",
          user: USERS.agus,
          content:
            "Terakhir gue cek dia terima USDT sama Dogecoin. Katanya anaknya yang setting-in.",
          created_at: ago(164),
          likes_count: 15000,
        },
      ],
    },
    {
      id: "c20",
      post_id: "t7",
      user: USERS.jake,
      content:
        "Pak tukang nasgor ini lebih tech-savvy dari startup yang gue kerja di situ. Kita masih pake Excel buat inventory.",
      created_at: ago(162),
      likes_count: 18000,
    },
  ],
  t8: [
    {
      id: "c51",
      post_id: "t8",
      user: USERS.siti,
      content:
        '"Noted with thanks" ini passive aggressive level dewa. Gue selalu translate jadi "gue ga peduli tapi gue mau keliatan profesional."',
      created_at: ago(208),
      likes_count: 14000,
      replies: [
        {
          id: "c51_1",
          post_id: "t8",
          user: USERS.david,
          content:
            'Yang paling parah "Kindly be informed..." = lo salah dan gue mau ngomong dengan halus supaya lo ga nangis.',
          created_at: ago(207),
          likes_count: 21000,
        },
      ],
    },
    {
      id: "c52",
      post_id: "t8",
      user: USERS.andi,
      content:
        'Lo lupa: "Nanti saya sampaikan ke atasan" = ini ga akan pernah sampai ke atasan karena gue juga ga berani.',
      created_at: ago(206),
      likes_count: 18000,
    },
    {
      id: "c53",
      post_id: "t8",
      user: USERS.mega,
      content:
        'Gue pernah reply "Kindly noted" dan bos gue bales "Maksudnya gimana? Noted apa kindly?" Sejak itu gue trauma.',
      created_at: ago(205),
      likes_count: 9800,
    },
  ],
  t9: [
    {
      id: "c54",
      post_id: "t9",
      user: USERS.rina,
      content:
        'Ini gue banget. Dokter bilang "jangan begadang." Gue bilang iya. Jam 12 malem gue udah rewatch One Piece dari episode 1.',
      created_at: ago(278),
      likes_count: 8900,
    },
    {
      id: "c55",
      post_id: "t9",
      user: USERS.alex,
      content:
        "Dok saya susah tidur.\nDokter: Sudah coba matikan HP jam 10?\nSaya: *visible confusion* Emangnya bisa?",
      created_at: ago(276),
      likes_count: 15000,
      replies: [
        {
          id: "c55_1",
          post_id: "t9",
          user: USERS.kai,
          content:
            "HP gue ga pernah di bawah 5% battery karena gue cas SAMBIL scroll. Efisiensi.",
          created_at: ago(275),
          likes_count: 12000,
        },
      ],
    },
  ],
  t10: [
    {
      id: "c56",
      post_id: "t10",
      user: USERS.agus,
      content:
        'WiFi "up to 100mbps" itu bahasa marketing untuk "kadang dapet 100, biasanya 0.3."',
      created_at: ago(338),
      likes_count: 14000,
    },
    {
      id: "c57",
      post_id: "t10",
      user: USERS.kai,
      content:
        "2.5jt buat kamar segitu mah di kota gue udah dapet 1 rumah. Tapi ya kotanya ga ada kerjaan. Hidup itu trade-off.",
      created_at: ago(336),
      likes_count: 8900,
      replies: [
        {
          id: "c57_1",
          post_id: "t10",
          user: USERS.fajar,
          content:
            "Ini dilema klasik: kerja di Jakarta bayar kos mahal, atau tinggal di kampung tapi ga ada kerjaan. Mau milih derita yang mana.",
          created_at: ago(335),
          likes_count: 15000,
        },
      ],
    },
    {
      id: "c58",
      post_id: "t10",
      user: USERS.budi,
      content:
        '"Strategis dekat MRT" gue kos dulu juga gini. "Dekat" ternyata 25 menit jalan kaki lewat kuburan. KUBURAN.',
      created_at: ago(334),
      likes_count: 23000,
    },
  ],
  t11: [
    {
      id: "c59",
      post_id: "t11",
      user: USERS.nina,
      content:
        'Sebagai orang yang pernah jadi tamu podcast: 90% pertanyaannya "gimana sih ceritanya?" terus gue harus improvisasi 45 menit. Ga ada riset. Ga ada briefing.',
      created_at: ago(398),
      likes_count: 12000,
      replies: [
        {
          id: "c59_1",
          post_id: "t11",
          user: USERS.zara,
          content:
            '"Gimana sih ceritanya" itu pertanyaan yang host tanya kalo dia ga prepare apa-apa',
          created_at: ago(397),
          likes_count: 9800,
        },
      ],
    },
    {
      id: "c60",
      post_id: "t11",
      user: USERS.mia,
      content:
        "Tapi gue demen podcast yang hostnya emang receh dan ga pura-pura deep. At least honest.",
      created_at: ago(396),
      likes_count: 5600,
    },
    {
      id: "c61",
      post_id: "t11",
      user: USERS.elena,
      content: '"Satu tangan. Yang kelingkingnya patah." SAVAGE BANGET 😭',
      created_at: ago(395),
      likes_count: 18000,
    },
  ],
  t12: [
    {
      id: "c62",
      post_id: "t12",
      user: USERS.dinda,
      content: "Nikahan itu performance art yang disponsori orang tua.",
      created_at: ago(458),
      likes_count: 28000,
    },
    {
      id: "c63",
      post_id: "t12",
      user: USERS.siti,
      content:
        "Gue dateng nikahan temen, makanannya catering hotel bintang 5, tapi antriannya 45 menit. Gue udah kebelet pipis tapi ga berani ninggalin antrian.",
      created_at: ago(456),
      likes_count: 8900,
      replies: [
        {
          id: "c63_1",
          post_id: "t12",
          user: USERS.chloe,
          content:
            "Survival of the fittest itu bukan di hutan. Itu di buffet nikahan.",
          created_at: ago(455),
          likes_count: 15000,
        },
      ],
    },
    {
      id: "c64",
      post_id: "t12",
      user: USERS.ryan,
      content:
        'Ice sculpture bentuk angsa 💀 ini ibu mertua-nya pasti bilang "di nikahan tetangga ada loh"',
      created_at: ago(454),
      likes_count: 12000,
    },
  ],
  t13: [
    {
      id: "c65",
      post_id: "t13",
      user: USERS.tom,
      content:
        "Bu Yati for president. Bisnis model paling sustainable: masak enak, harga murah, udah.",
      created_at: ago(528),
      likes_count: 15000,
    },
    {
      id: "c66",
      post_id: "t13",
      user: USERS.agus,
      content:
        '"Nasi goreng truffle" 89rb. Gue bisa makan di bu Yati hampir seminggu dengan harga segitu.',
      created_at: ago(526),
      likes_count: 21000,
      replies: [
        {
          id: "c66_1",
          post_id: "t13",
          user: USERS.fajar,
          content:
            "Truffle itu jamur kan? JAMUR. Gue bisa petik di belakang rumah nenek gue gratis.",
          created_at: ago(525),
          likes_count: 34000,
        },
        {
          id: "c66_2",
          post_id: "t13",
          user: USERS.liam,
          content: "Itu jamur beda bang... tapi semangat-nya gue hargai",
          created_at: ago(524),
          likes_count: 18000,
        },
      ],
    },
    {
      id: "c67",
      post_id: "t13",
      user: USERS.dinda,
      content:
        "Cafe di Kemang itu bayar vibes, bukan makanan. Mau duduk 3 jam pake WiFi? 89rb itu membership co-working space dengan bonus nasi.",
      created_at: ago(523),
      likes_count: 12000,
    },
  ],
  t14: [
    {
      id: "c68",
      post_id: "t14",
      user: USERS.marcus,
      content:
        "WKWK gue juga punya temen kayak gini. Tiap gue posting makan di mana pasti nongol kayak jin. Padahal pas gue sakit ga pernah nanya.",
      created_at: ago(598),
      likes_count: 15000,
    },
    {
      id: "c69",
      post_id: "t14",
      user: USERS.alex,
      content:
        'Yang lebih hebat lagi temen yang chat "lu di mana? gue mau ke situ" terus pas lo bilang lo bayar sendiri langsung "eh jadi ga bisa deng, ada acara."',
      created_at: ago(596),
      likes_count: 23000,
      replies: [
        {
          id: "c69_1",
          post_id: "t14",
          user: USERS.nina,
          content: '"Ada acara" = ada orang lain yang mau bayarin mereka 💀',
          created_at: ago(595),
          likes_count: 18000,
        },
      ],
    },
  ],
  t15: [
    {
      id: "c70",
      post_id: "t15",
      user: USERS.andi,
      content:
        'Gue founder startup. Urus izin usaha aja butuh 4 bulan, 11 dokumen, dan 3x bolak-balik ke kantor yang beda-beda. "Anak muda harus kreatif" emang, kreatif ngurus birokrasi.',
      created_at: ago(698),
      likes_count: 28000,
      replies: [
        {
          id: "c70_1",
          post_id: "t15",
          user: USERS.priya,
          content:
            "Ini kenapa banyak anak muda akhirnya jualan online aja tanpa izin. Bukan karena ga mau legal, tapi capek ngurusnya.",
          created_at: ago(697),
          likes_count: 21000,
        },
      ],
    },
    {
      id: "c71",
      post_id: "t15",
      user: USERS.mega,
      content:
        "Plot twist: pejabat yang nyuruh anak muda kreatif ternyata anaknya sendiri masuk BUMN langsung jadi manager. Ga usah kreatif.",
      created_at: ago(696),
      likes_count: 45000,
    },
    {
      id: "c72",
      post_id: "t15",
      user: USERS.budi,
      content:
        'Gue pernah coba bikin startup, urus NIB, eh yang verifikasi malah nanya "ini usahanya beneran?"\n\nBro lo mau gue jawab apa? Engga? Ini cuma hobi gue ngurus surat?',
      created_at: ago(694),
      likes_count: 18000,
    },
  ],
  t16: [
    {
      id: "c73",
      post_id: "t16",
      user: USERS.dinda,
      content:
        '"Yang lo baru baca itu chat gue atau perasaan gue?" BARR. Tweet ini menyerang gue secara pribadi.',
      created_at: ago(798),
      likes_count: 34000,
    },
    {
      id: "c74",
      post_id: "t16",
      user: USERS.kai,
      content:
        "Sabar kak. Kalau orangnya emang suka, chat lo ga akan ke-skip. Ini gue ngomong dari pengalaman sebagai orang yang pernah di-skip dan juga pernah nge-skip.",
      created_at: ago(796),
      likes_count: 12000,
      replies: [
        {
          id: "c74_1",
          post_id: "t16",
          user: USERS.sarah,
          content: "Ini wisdom yang menyakitkan tapi bener. 😭",
          created_at: ago(795),
          likes_count: 8900,
        },
        {
          id: "c74_2",
          post_id: "t16",
          user: USERS.nina,
          content: "Bro jadi lo akui lo juga pernah nge-skip orang? 🤨",
          created_at: ago(794),
          likes_count: 15000,
        },
      ],
    },
    {
      id: "c75",
      post_id: "t16",
      user: USERS.fajar,
      content:
        'Gue pernah di-"baru baca" padahal kita di grup yang sama dan dia reply chat orang lain di depan mata gue. Ya udah lah ya.',
      created_at: ago(792),
      likes_count: 21000,
    },
  ],
  t17: [
    {
      id: "c76",
      post_id: "t17",
      user: USERS.siti,
      content:
        "MAMA GUE BANGET WKWK. Dulu HP gue disita kalo main lebih dari 1 jam. Sekarang mama gue nonton drakor di HP sampe ketiduran HP-nya nimpa muka.",
      created_at: ago(898),
      likes_count: 28000,
      replies: [
        {
          id: "c76_1",
          post_id: "t17",
          user: USERS.david,
          content: "HP nimpa muka 💀 ini pasti semua orang pernah ngalamin",
          created_at: ago(897),
          likes_count: 12000,
        },
      ],
    },
    {
      id: "c77",
      post_id: "t17",
      user: USERS.alex,
      content:
        "Papa gue forward berita hoax tiap hari. Gue bilang itu hoax, beliau marah. Bilang \"kamu jangan sok tau.\" Pak ini ada watermark 'satire' di bawahnya.",
      created_at: ago(896),
      likes_count: 34000,
    },
    {
      id: "c78",
      post_id: "t17",
      user: USERS.rina,
      content:
        'Yang paling epic: ortu dulu "jangan percaya orang di internet" tapi sekarang mereka percaya grup WA random yang bilang minum air hangat bisa nyembuhin kanker.',
      created_at: ago(894),
      likes_count: 41000,
    },
    {
      id: "c79",
      post_id: "t17",
      user: USERS.budi,
      content:
        '"Double standards yang paling ikonik di dunia" ini caption yang bisa dipake buat 90% perilaku ortu di Indonesia',
      created_at: ago(892),
      likes_count: 9800,
    },
  ],
  t18: [
    {
      id: "c21",
      post_id: "t18",
      user: USERS.fajar,
      content: "Bang jangan keras-keras, nanti ketauan sama client kita",
      created_at: ago(13),
      likes_count: 2300,
    },
    {
      id: "c22",
      post_id: "t18",
      user: USERS.agus,
      content:
        "Senior dev itu orang yang tau keyword yang bener buat di-google. Change my mind.",
      created_at: ago(12),
      likes_count: 4500,
      replies: [
        {
          id: "c22_1",
          post_id: "t18",
          user: USERS.budi,
          content:
            "Fakta. Gue digaji 25jt/bulan intinya cuma karena gue googling lebih cepet dari yang lain.",
          created_at: ago(11),
          likes_count: 6700,
        },
        {
          id: "c22_2",
          post_id: "t18",
          user: USERS.rina,
          content:
            "Sekarang mah ga google lagi, langsung tanya ChatGPT. Evolusi.",
          created_at: ago(10),
          likes_count: 3400,
        },
      ],
    },
    {
      id: "c23",
      post_id: "t18",
      user: USERS.mega,
      content:
        "Gue pernah copy paste dari StackOverflow terus yang jawab ternyata gue sendiri 2 tahun lalu. Hidup itu lingkaran.",
      created_at: ago(9),
      likes_count: 12000,
    },
  ],
  t19: [
    {
      id: "c24",
      post_id: "t19",
      user: USERS.budi,
      content:
        '"Kerja kayak keluarga" red flag terbesar di dunia startup. Keluarga mana yang suruh lo lembur sampe jam 11 malem tiap hari.',
      created_at: ago(33),
      likes_count: 8900,
      replies: [
        {
          id: "c24_1",
          post_id: "t19",
          user: USERS.andi,
          content: "Keluarga gue sih emang gitu WKWK",
          created_at: ago(32),
          likes_count: 15000,
        },
      ],
    },
    {
      id: "c25",
      post_id: "t19",
      user: USERS.mega,
      content:
        "Unlimited snack tapi gajinya cuma cukup buat beli Indomie. Ironis.",
      created_at: ago(31),
      likes_count: 7800,
    },
    {
      id: "c26",
      post_id: "t19",
      user: USERS.rina,
      content:
        'Pernah interview ditanya "kamu passionate ga?" ya kalo passionate bisa bayar kos-kosan sih gapapa',
      created_at: ago(30),
      likes_count: 11200,
    },
    {
      id: "c27",
      post_id: "t19",
      user: USERS.siti,
      content:
        "Ping pong table-nya ga pernah dipake juga karena semua orang lembur WKWKWK",
      created_at: ago(29),
      likes_count: 5600,
    },
  ],
  t21: [
    {
      id: "c28",
      post_id: "t21",
      user: USERS.budi,
      content:
        'Setiap denger "fitur kecil" dari client, hati gue langsung deg-degan kayak mau ketemu mantan.',
      created_at: ago(73),
      likes_count: 4500,
      replies: [
        {
          id: "c28_1",
          post_id: "t21",
          user: USERS.agus,
          content: "Bedanya sama mantan: mantan ga minta revision 47 kali",
          created_at: ago(72),
          likes_count: 8900,
        },
      ],
    },
    {
      id: "c29",
      post_id: "t21",
      user: USERS.andi,
      content:
        '"Deadline Jumat" bro hari ini udah Rabu. Lo mau gue ngoding pake apa, sihir?',
      created_at: ago(71),
      likes_count: 6700,
    },
    {
      id: "c30",
      post_id: "t21",
      user: USERS.dinda,
      content:
        'Sebagai designer gue juga kena. "Mbak bikin UI-nya aja ya cepet, paling 2 jam." Terus wireframe aja belum ada. Mau gue desain apa, perasaan lo?',
      created_at: ago(70),
      likes_count: 9800,
    },
  ],
  t22: [
    {
      id: "c31",
      post_id: "t22",
      user: USERS.agus,
      content:
        'Gue nomor 5. Kemarin masak nasi goreng sambil daily standup. Pas ditanya gue bilang lagi "refactoring kitchen module".',
      created_at: ago(108),
      likes_count: 18000,
      replies: [
        {
          id: "c31_1",
          post_id: "t22",
          user: USERS.budi,
          content: "REFACTORING KITCHEN MODULE WKWKWK gue ga kuat 💀",
          created_at: ago(107),
          likes_count: 12000,
        },
        {
          id: "c31_2",
          post_id: "t22",
          user: USERS.mega,
          content: "Deploy ke production-nya masak = nasi gosong",
          created_at: ago(106),
          likes_count: 8900,
        },
      ],
    },
    {
      id: "c32",
      post_id: "t22",
      user: USERS.rina,
      content:
        'Gue pernah share screen terus ketauan lagi buka Shopee pas flash sale. Manager gue cuma bilang "link-nya dong"',
      created_at: ago(105),
      likes_count: 23000,
    },
    {
      id: "c33",
      post_id: "t22",
      user: USERS.siti,
      content:
        'Nomor 3 ini PM gue banget. "Harusnya gampang" terus sprint-nya molor 3 minggu.',
      created_at: ago(104),
      likes_count: 5600,
    },
    {
      id: "c34",
      post_id: "t22",
      user: USERS.fajar,
      content:
        "Lo lupa nomor 6: yang ga pernah mute terus kedenger suara anak nangis sama sinetron emaknya",
      created_at: ago(103),
      likes_count: 14000,
    },
  ],
  t24: [
    {
      id: "c35",
      post_id: "t24",
      user: USERS.rina,
      content:
        "Ini beneran ya. Gue pernah liat lowongan junior React developer, requirement-nya: 5 tahun React. React sendiri baru ada berapa tahun coba.",
      created_at: ago(198),
      likes_count: 8900,
      replies: [
        {
          id: "c35_1",
          post_id: "t24",
          user: USERS.fajar,
          content:
            "Yang bikin requirement pasti copy paste dari lowongan lain yang juga copy paste. Inception.",
          created_at: ago(196),
          likes_count: 5600,
        },
      ],
    },
    {
      id: "c36",
      post_id: "t24",
      user: USERS.budi,
      content:
        "Sabar bang. Gue dulu juga gitu. Sekarang udah senior tapi masih imposter syndrome kok. Ga pernah ilang.",
      created_at: ago(195),
      likes_count: 7800,
    },
    {
      id: "c37",
      post_id: "t24",
      user: USERS.andi,
      content:
        'Pro tip: bikin startup sendiri terus tulis di CV "5 tahun pengalaman" karena lo kerja buat diri sendiri. Big brain move.',
      created_at: ago(193),
      likes_count: 23000,
    },
  ],
  t25: [
    {
      id: "c38",
      post_id: "t25",
      user: USERS.agus,
      content:
        '"Uber of laundry" WKWKWK ini kenapa setiap startup harus jadi Uber-nya sesuatu. Kapan ada yang bilang "kita Indomaret-nya tech".',
      created_at: ago(248),
      likes_count: 12000,
      replies: [
        {
          id: "c38_1",
          post_id: "t25",
          user: USERS.andi,
          content:
            "Investor ga tertarik kalo lo bilang gitu. Harus pake buzzword minimal 7 biji per slide.",
          created_at: ago(246),
          likes_count: 9800,
        },
        {
          id: "c38_2",
          post_id: "t25",
          user: USERS.budi,
          content:
            '"We leverage AI-driven synergy to disrupt the paradigm" = gue bikin CRUD app pake ChatGPT',
          created_at: ago(245),
          likes_count: 18000,
        },
      ],
    },
    {
      id: "c39",
      post_id: "t25",
      user: USERS.mega,
      content:
        "Sebagai orang yang maintain server-nya: app-nya emang cuma form + WA redirect tapi somehow bisa crash 3x seminggu. Talent.",
      created_at: ago(244),
      likes_count: 15000,
    },
    {
      id: "c40",
      post_id: "t25",
      user: USERS.dinda,
      content:
        'Gue yang bikin pitch deck-nya. Setiap hari gue harus mikir cara nge-wrap "redirect ke WhatsApp" jadi keliatan revolusioner.',
      created_at: ago(242),
      likes_count: 11000,
    },
  ],
  t26: [
    {
      id: "c41",
      post_id: "t26",
      user: USERS.budi,
      content: "Plot twist yang ga ada yang expect tapi semua orang relate",
      created_at: ago(318),
      likes_count: 5600,
    },
    {
      id: "c42",
      post_id: "t26",
      user: USERS.agus,
      content:
        'Gue pernah nulis postmortem buat incident yang gue sendiri yang cause. Paragraf pertama: "An unidentified engineer pushed untested code." Sir, that engineer is me.',
      created_at: ago(316),
      likes_count: 21000,
      replies: [
        {
          id: "c42_1",
          post_id: "t26",
          user: USERS.mega,
          content:
            '"Unidentified engineer" 💀 bro lo nulis postmortem kayak laporan polisi',
          created_at: ago(315),
          likes_count: 14000,
        },
      ],
    },
    {
      id: "c43",
      post_id: "t26",
      user: USERS.fajar,
      content:
        "git blame paling sedih: baris yang error commit-nya dari lo sendiri",
      created_at: ago(314),
      likes_count: 9800,
    },
  ],
  t28: [
    {
      id: "c44",
      post_id: "t28",
      user: USERS.budi,
      content:
        "Lo lupa step 10: setelah ngopi, balik lagi dan bug-nya tiba-tiba ilang sendiri. Ga ada yang ngerti kenapa.",
      created_at: ago(478),
      likes_count: 8900,
      replies: [
        {
          id: "c44_1",
          post_id: "t28",
          user: USERS.agus,
          content:
            "Ini literally tadi pagi. Bug ilang setelah gue restart laptop. Gue udah nulis essay 3 paragraf di Slack buat minta tolong.",
          created_at: ago(477),
          likes_count: 6700,
        },
      ],
    },
    {
      id: "c45",
      post_id: "t28",
      user: USERS.mega,
      content:
        'Step 5.5 yang ga disebutin: pas googling error message, result pertama ternyata issue GitHub dari 2019 yang di-close dengan komentar "nvm fixed it" TANPA BILANG CARA FIX-NYA. Penjahat.',
      created_at: ago(475),
      likes_count: 25000,
    },
    {
      id: "c46",
      post_id: "t28",
      user: USERS.rina,
      content:
        "Gue masih di stage 4 dari kemarin. Send help. Atau kopi. Preferably both.",
      created_at: ago(474),
      likes_count: 4500,
    },
  ],
  t29: [
    {
      id: "c47",
      post_id: "t29",
      user: USERS.mega,
      content:
        '"Wear many hats" gue sekarang frontend, backend, devops, QA, customer support, DAN office boy karena yang bersihin pantry cuma gue.',
      created_at: ago(548),
      likes_count: 18000,
      replies: [
        {
          id: "c47_1",
          post_id: "t29",
          user: USERS.andi,
          content:
            "Lo lupa: juga jadi therapist buat CEO yang anxiety soal runway tiap minggu",
          created_at: ago(547),
          likes_count: 12000,
        },
      ],
    },
    {
      id: "c48",
      post_id: "t29",
      user: USERS.budi,
      content:
        '"Equity-based compensation" = lo digaji pake mimpi dan harapan. Pas startup-nya bangkrut, equity-nya jadi wallpaper.',
      created_at: ago(546),
      likes_count: 15000,
    },
    {
      id: "c49",
      post_id: "t29",
      user: USERS.siti,
      content:
        'Yang paling sakit itu "fast-paced environment." Mas, ini bukan fast-paced, ini chaos yang di-rebrand.',
      created_at: ago(544),
      likes_count: 9800,
    },
    {
      id: "c50",
      post_id: "t29",
      user: USERS.fajar,
      content:
        "Baca ini sambil nangis di toilet kantor startup. Very accurate. 10/10.",
      created_at: ago(543),
      likes_count: 21000,
    },
  ],
};
