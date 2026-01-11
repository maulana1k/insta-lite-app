import { ProfileUser } from '../types';
import { Post } from '@/types/database';

export const MOCK_PROFILE: ProfileUser = {
  id: 'jack-harding',
  username: 'jackharding',
  full_name: 'Jack Harding',
  avatar_url: 'https://i.pravatar.cc/300?u=jackharding',
  bio: 'Travel, Adventure & Lifestyle Photographer\nSony Imaging Ambassador\nCurrently in Edinburgh\nLet\'s Work: hello@jackharding.photo',
  website: 'jackharding.photo/brandwork',
  category: 'Photographer',
  created_at: new Date().toISOString(),
  stats: {
    posts: 518,
    followers: 220000,
    following: 197,
  },
  is_following: false,
  highlights: [
    { id: '1', title: 'Woolmark', cover_image: 'https://picsum.photos/seed/wool/200' },
    { id: '2', title: 'Croatia', cover_image: 'https://picsum.photos/seed/croatia/200' },
    { id: '3', title: 'Indonesia', cover_image: 'https://picsum.photos/seed/indo/200' },
    { id: '4', title: 'Wallpapers', cover_image: 'https://picsum.photos/seed/wall/200' },
    { id: '5', title: 'Madeira', cover_image: 'https://picsum.photos/seed/mad/200' },
    { id: '6', title: 'People', cover_image: 'https://picsum.photos/seed/ppl/200' },
    { id: '7', title: 'Sweden', cover_image: 'https://picsum.photos/seed/swe/200' },
    { id: '8', title: 'Mackmyra', cover_image: 'https://picsum.photos/seed/mack/200' },
  ],
};

export const MOCK_PROFILE_POSTS: Post[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `profile-post-${i}`,
  user_id: 'jack-harding',
  image_url: `https://picsum.photos/seed/post${i}/800/800`,
  caption: 'Amazing view! 🏔️',
  created_at: new Date(Date.now() - i * 86400000).toISOString(),
  likes_count: 1200 + i * 50,
  comments_count: 45 + i,
  user: {
      id: 'jack-harding',
      username: 'jackharding',
      full_name: 'Jack Harding',
      avatar_url: 'https://i.pravatar.cc/300?u=jackharding',
      created_at: new Date().toISOString()
  }
}));
