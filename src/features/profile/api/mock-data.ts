import type { Post, User } from "@/types/database";
import type { ProfileUser } from "../types";

export const MOCK_PROFILE: ProfileUser = {
  id: "jack-harding",
  username: "jackharding",
  full_name: "Jack Harding",
  avatar_url: "https://i.pravatar.cc/300?u=jackharding",
  bio: "Travel, Adventure & Lifestyle Photographer\nSony Imaging Ambassador\nCurrently in Edinburgh\nLet's Work: hello@jackharding.photo",
  website: "jackharding.photo/brandwork",
  category: "Photographer",
  created_at: new Date().toISOString(),
  stats: {
    posts: 518,
    followers: 220000,
    following: 197,
  },
  is_following: false,
  highlights: [
    {
      id: "1",
      title: "Woolmark",
      cover_image: "https://picsum.photos/seed/wool/200",
    },
    {
      id: "2",
      title: "Croatia",
      cover_image: "https://picsum.photos/seed/croatia/200",
    },
    {
      id: "3",
      title: "Indonesia",
      cover_image: "https://picsum.photos/seed/indo/200",
    },
    {
      id: "4",
      title: "Wallpapers",
      cover_image: "https://picsum.photos/seed/wall/200",
    },
    {
      id: "5",
      title: "Madeira",
      cover_image: "https://picsum.photos/seed/mad/200",
    },
    {
      id: "6",
      title: "People",
      cover_image: "https://picsum.photos/seed/ppl/200",
    },
    {
      id: "7",
      title: "Sweden",
      cover_image: "https://picsum.photos/seed/swe/200",
    },
    {
      id: "8",
      title: "Mackmyra",
      cover_image: "https://picsum.photos/seed/mack/200",
    },
  ],
};

const MOCK_USER: User = {
  id: "jack-harding",
  username: "jackharding",
  full_name: "Jack Harding",
  avatar_url: "https://i.pravatar.cc/300?u=jackharding",
  created_at: new Date().toISOString(),
};

export const MOCK_PROFILE_POSTS: Post[] = [
  {
    id: "pp-1",
    user_id: "jack-harding",
    image_url: "https://picsum.photos/seed/pp1/800/800",
    caption:
      "Morning light hits different at 5am in the Scottish Highlands. Worth every cold step. 🏔️",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    likes_count: 3240,
    comments_count: 87,
    user: MOCK_USER,
  },
  {
    id: "pp-2",
    user_id: "jack-harding",
    caption:
      "Hot take: the best travel photos aren't taken at tourist spots. They're taken at 6am when everyone else is still sleeping and the world is yours alone.",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    likes_count: 1820,
    comments_count: 45,
    user: MOCK_USER,
  },
  {
    id: "pp-3",
    user_id: "jack-harding",
    image_url: "https://picsum.photos/seed/pp3/800/800",
    caption: "Croatia — June 2024. The Adriatic never gets old.",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    likes_count: 5610,
    comments_count: 132,
    user: MOCK_USER,
  },
  {
    id: "pp-4",
    user_id: "jack-harding",
    caption:
      "Just spent 3 weeks shooting in Indonesia. Some observations:\n\n1. Golden hour lasts about 8 minutes. Set your alarm.\n2. The people are the subject, always.\n3. Get off the tourist trail by day 3 or don't bother.",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    likes_count: 2980,
    comments_count: 71,
    user: MOCK_USER,
  },
  {
    id: "pp-5",
    user_id: "jack-harding",
    image_url: "https://picsum.photos/seed/pp5/800/800",
    caption: "Edinburgh fog doing what it does best ☁️",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    likes_count: 4100,
    comments_count: 94,
    user: MOCK_USER,
  },
  {
    id: "pp-6",
    user_id: "jack-harding",
    caption:
      "Gear doesn't make the photo. I shot some of my favourite frames on a 10-year-old kit lens. Stop waiting for the perfect camera body. Go outside.",
    created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    likes_count: 4450,
    comments_count: 156,
    user: MOCK_USER,
  },
  {
    id: "pp-7",
    user_id: "jack-harding",
    image_url: "https://picsum.photos/seed/pp7/800/800",
    caption: "Madeira from above. Drone nearly didn't make it back 😅",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    likes_count: 6870,
    comments_count: 203,
    user: MOCK_USER,
  },
  {
    id: "pp-8",
    user_id: "jack-harding",
    caption:
      "Some thoughts on editing: less is more, always. If you're spending 45 minutes on a single raw file, you're probably going in the wrong direction. The best edits are invisible.",
    created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
    likes_count: 3310,
    comments_count: 89,
    user: MOCK_USER,
  },
  {
    id: "pp-9",
    user_id: "jack-harding",
    image_url: "https://picsum.photos/seed/pp9/800/800",
    caption: "Sweden in December. Dark by 3pm, beautiful by 4pm.",
    created_at: new Date(Date.now() - 9 * 86400000).toISOString(),
    likes_count: 2750,
    comments_count: 61,
    user: MOCK_USER,
  },
  {
    id: "pp-10",
    user_id: "jack-harding",
    caption:
      "Open to brand collaborations in 2025. DM me or reach out at hello@jackharding.photo. Looking for outdoor, travel, and lifestyle work specifically. No crypto or finance please.",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    likes_count: 892,
    comments_count: 37,
    user: MOCK_USER,
  },
  {
    id: "pp-11",
    user_id: "jack-harding",
    image_url: "https://picsum.photos/seed/pp11/800/800",
    caption:
      "The one that almost got away. Caught this light for maybe 90 seconds before it was gone.",
    created_at: new Date(Date.now() - 11 * 86400000).toISOString(),
    likes_count: 7200,
    comments_count: 248,
    user: MOCK_USER,
  },
  {
    id: "pp-12",
    user_id: "jack-harding",
    caption:
      "Reminder: your follower count doesn't determine the quality of your work. Some of the best photographers I know have under 2k followers. Keep shooting.",
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    likes_count: 5540,
    comments_count: 112,
    user: MOCK_USER,
  },
];
