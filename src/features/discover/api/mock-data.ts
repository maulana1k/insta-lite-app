
import { Post, User } from "@/types/database";
import { USERS } from '@/features/post/api/mock-data';

export interface DiscoverCategory {
  id: string;
  name: string;
  thumbnail_url: string;
}

export const DISCOVER_CATEGORIES: DiscoverCategory[] = [
  { id: 'design', name: 'Design', thumbnail_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&h=150&fit=crop' },
  { id: 'architecture', name: 'Architecture', thumbnail_url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=200&h=150&fit=crop' },
  { id: 'art', name: 'Art', thumbnail_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=150&fit=crop' },
  { id: 'travel', name: 'Travel', thumbnail_url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=150&fit=crop' },
  { id: 'style', name: 'Style', thumbnail_url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=150&fit=crop' },
  { id: 'nature', name: 'Nature', thumbnail_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=150&fit=crop' },
  { id: 'animals', name: 'Animals', thumbnail_url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=200&h=150&fit=crop' },
  { id: 'fitness', name: 'Fitness', thumbnail_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=150&fit=crop' },
];

export const DISCOVER_POSTS: Post[] = [
    {
    id: "d-post-1", // Big Featured Video
    user_id: "user-grid-1",
    user: { id: "user-grid-1", username: "natgeo", full_name: "National Geographic", avatar_url: "https://i.pravatar.cc/150?u=ng", created_at: "" },
    image_url: "https://images.unsplash.com/photo-1664464168739-676285e4bf89?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // A moody image
    caption: "Videos You Might Like",
    created_at: new Date().toISOString(),
    likes_count: 5500,
    comments_count: 230,
    isVideo: true // Faking a new property for UI logic
  } as any,
  {
    id: "d-post-2",
    user_id: "user-grid-2",
    user: { id: "user-grid-2", username: "traveler", full_name: "Traveller", avatar_url: "https://i.pravatar.cc/150?u=tr", created_at: "" },
    image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop",
    caption: "Adventure time",
    created_at: new Date().toISOString(),
    likes_count: 1200,
    comments_count: 45,
  },
  {
    id: "d-post-3",
    user_id: "user-grid-3",
    user: { id: "user-grid-3", username: "artist", full_name: "Artist", avatar_url: "https://i.pravatar.cc/150?u=ar", created_at: "" },
    image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop",
    caption: "Colorful art",
    created_at: new Date().toISOString(),
    likes_count: 890,
    comments_count: 30,
  },
  {
    id: "d-post-4",
    user_id: "user-grid-4",
    user: { id: "user-grid-4", username: "skater", full_name: "Skater", avatar_url: "https://i.pravatar.cc/150?u=sk", created_at: "" },
    image_url: "https://images.unsplash.com/photo-1506104795953-3862fa60f36e?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Skate park",
    created_at: new Date().toISOString(),
    likes_count: 450,
    comments_count: 12,
  },
  {
    id: "d-post-5",
    user_id: "user-grid-5",
    user: { id: "user-grid-5", username: "swimmer", full_name: "Swimmer", avatar_url: "https://i.pravatar.cc/150?u=sw", created_at: "" },
    image_url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&auto=format&fit=crop",
    caption: "Deep dive",
    created_at: new Date().toISOString(),
    likes_count: 2100,
    comments_count: 90,
  },
   {
    id: "d-post-6",
    user_id: "user-grid-6",
    user: { id: "user-grid-6", username: "hiker", full_name: "Hiker", avatar_url: "https://i.pravatar.cc/150?u=hk", created_at: "" },
    image_url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop",
    caption: "Mountain top",
    created_at: new Date().toISOString(),
    likes_count: 3400,
    comments_count: 150,
  },
   {
    id: "d-post-7",
    user_id: "user-grid-7",
    user: { id: "user-grid-7", username: "singer", full_name: "Singer", avatar_url: "https://i.pravatar.cc/150?u=sg", created_at: "" },
    image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Concert vibes",
    created_at: new Date().toISOString(),
    likes_count: 4500,
    comments_count: 300,
  },
  {
      id: "d-post-8",
      user_id: "user-grid-8",
      user: { id: "user-grid-8", username: "model", full_name: "Model", avatar_url: "https://i.pravatar.cc/150?u=md", created_at: "" },
      image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop",
      caption: "Fashion shoot",
      created_at: new Date().toISOString(),
      likes_count: 2300,
      comments_count: 110,
    },
    {
      id: "d-post-9",
      user_id: "user-grid-9",
      user: { id: "user-grid-9", username: "yoga", full_name: "Yoga Girl", avatar_url: "https://i.pravatar.cc/150?u=yg", created_at: "" },
      image_url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&auto=format&fit=crop",
      caption: "Morning yoga",
      created_at: new Date().toISOString(),
      likes_count: 1500,
      comments_count: 60,
    },
    {
      id: "d-post-10",
      user_id: "user-grid-10",
      user: { id: "user-grid-10", username: "mountain", full_name: "Mountain Man", avatar_url: "https://i.pravatar.cc/150?u=mm", created_at: "" },
      image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop",
      caption: "Snowy peaks",
      created_at: new Date().toISOString(),
      likes_count: 3200,
      comments_count: 180,
    },
];

// ── Trending ──────────────────────────────────────────────────────────────

export interface TrendingHashtag {
  tag: string;
  posts_count: number;
}

export const TRENDING_HASHTAGS: TrendingHashtag[] = [
  { tag: '#GajiTransparan', posts_count: 12400 },
  { tag: '#StartupBubble', posts_count: 8900 },
  { tag: '#NasgorVsMigoreng', posts_count: 34200 },
  { tag: '#KRLSurvivors', posts_count: 15600 },
  { tag: '#AnakMudaKreatif', posts_count: 6700 },
  { tag: 'Drama Selebriti', posts_count: 45300 },
  { tag: 'Jakarta Vibes', posts_count: 22100 },
  { tag: 'Politik Santai', posts_count: 18700 },
  { tag: 'Kuliner Lokal', posts_count: 31500 },
];

export interface TrendingTopic {
  label: string;
  posts_count: number;
  category: string;
}

export const TRENDING_TOPICS: TrendingTopic[] = [
  { label: 'Debat Capres', posts_count: 124000, category: 'Politik' },
  { label: 'QRIS', posts_count: 89000, category: 'Teknologi' },
  { label: 'Nasi Goreng', posts_count: 67000, category: 'Kuliner' },
  { label: 'WFH vs WFO', posts_count: 54000, category: 'Karir' },
  { label: 'Skincare', posts_count: 45000, category: 'Gaya Hidup' },
  { label: 'AI Takeover', posts_count: 41000, category: 'Teknologi' },
  { label: 'Harga Kos', posts_count: 38000, category: 'Jakarta' },
  { label: 'Side Hustle', posts_count: 35000, category: 'Bisnis' },
  { label: 'Overwork', posts_count: 32000, category: 'Karir' },
];

export interface TrendingPost {
  rank: number;
  user: User;
  timestamp: string;
  content: string;
  likes_count: number;
  replies_count: number;
}

export const TRENDING_POSTS: TrendingPost[] = [
  {
    rank: 1,
    user: USERS.marcus,
    timestamp: '2j',
    content: 'Update dari tukang nasi goreng depan kos: Beliau sekarang terima QRIS. Ada menu baru: nasi goreng "corporate" — isinya nasi goreng biasa tapi pake plate aesthetic dan harganya 3x lipat.',
    likes_count: 92100,
    replies_count: 11200,
  },
  {
    rank: 2,
    user: USERS.ryan,
    timestamp: '50m',
    content: 'Baru aja nonton debat capres. Dua-duanya bilang "kami akan memberantas korupsi." Bro yang satu tim sukses-nya lagi kena kasus korupsi.',
    likes_count: 89200,
    replies_count: 12400,
  },
  {
    rank: 3,
    user: USERS.liam,
    timestamp: '8j',
    content: 'Warung makan bu Yati di gang sebelah udah 23 tahun buka. Ga pernah ganti menu. Ga ada instagram. Ga ada influencer review. Tapi tiap jam makan rame banget. Marketing terbaik itu rasa.',
    likes_count: 89700,
    replies_count: 10200,
  },
];
