import type { Video } from "../types";

export const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Crazy Night with my Mom",
    description: "Recommended",
    thumbnail_url:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
    duration: "3:03",
    views_count: 12000,
    user_id: "u1",
    user: {
      id: "u1",
      username: "marieparis",
      full_name: "Marie Paris",
      avatar_url: "https://i.pravatar.cc/150?u=marie",
      created_at: "",
    },
    created_at: new Date().toISOString(),
    category: "For You",
  },
  {
    id: "v2",
    title: "This Dog Is The Cutest, Grumpiest Old Man",
    description: "Recommended",
    thumbnail_url:
      "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=500&auto=format&fit=crop",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-dog-catching-a-ball-in-slow-motion-1256-large.mp4",
    duration: "4:19",
    views_count: 54000,
    user_id: "u2",
    user: {
      id: "u2",
      username: "The Dodo",
      full_name: "The Dodo",
      avatar_url: "https://i.pravatar.cc/150?u=dodo",
      created_at: "",
    },
    created_at: new Date().toISOString(),
    category: "For You",
  },
  {
    id: "v3",
    title: "Let's Go Skate III Video",
    description: "Recommended",
    thumbnail_url:
      "https://images.unsplash.com/photo-1597019558926-3eef445fdf60?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "1:32",
    views_count: 8500,
    user_id: "u3",
    user: {
      id: "u3",
      username: "loanmak",
      full_name: "Loan Mak",
      avatar_url: "https://i.pravatar.cc/150?u=loan",
      created_at: "",
    },
    created_at: new Date().toISOString(),
    category: "For You",
  },
  {
    id: "v4",
    title: "200 Days Around the World",
    description: "Recommended",
    thumbnail_url:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&auto=format&fit=crop",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "6:28",
    views_count: 142000,
    user_id: "u4",
    user: {
      id: "u4",
      username: "kalvisuals",
      full_name: "Kal Visuals",
      avatar_url: "https://i.pravatar.cc/150?u=kal",
      created_at: "",
    },
    created_at: new Date().toISOString(),
    category: "For You",
  },
  {
    id: "v5",
    title: "Surfing in Hawaii",
    description: "Trending",
    thumbnail_url:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&auto=format&fit=crop",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "2:03",
    views_count: 3200,
    user_id: "u5",
    user: {
      id: "u5",
      username: "surferboy",
      full_name: "Surfer Boy",
      avatar_url: "https://i.pravatar.cc/150?u=surf",
      created_at: "",
    },
    created_at: new Date().toISOString(),
    category: "For You",
  },
  {
    id: "v6",
    title: "Space X Launch",
    description: "Live",
    thumbnail_url:
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&auto=format&fit=crop",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "3:12",
    views_count: 1200000,
    user_id: "u6",
    user: {
      id: "u6",
      username: "spacex",
      full_name: "Space X",
      avatar_url: "https://i.pravatar.cc/150?u=space",
      created_at: "",
    },
    created_at: new Date().toISOString(),
    category: "For You",
  },
  {
    id: "v7",
    title: "Cliff Jumping",
    description: "Travel",
    thumbnail_url:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format&fit=crop",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "0:43",
    views_count: 4500,
    user_id: "u7",
    user: {
      id: "u7",
      username: "adventure",
      full_name: "Adventure Time",
      avatar_url: "https://i.pravatar.cc/150?u=adv",
      created_at: "",
    },
    created_at: new Date().toISOString(),
    category: "For You",
  },
  {
    id: "v8",
    title: "Owl Life",
    description: "Nature",
    thumbnail_url:
      "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: "2:11",
    views_count: 7600,
    user_id: "u8",
    user: {
      id: "u8",
      username: "natgeo",
      full_name: "Nat Geo",
      avatar_url: "https://i.pravatar.cc/150?u=nat",
      created_at: "",
    },
    created_at: new Date().toISOString(),
    category: "For You",
  },
];
