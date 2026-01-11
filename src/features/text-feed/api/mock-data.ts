import { TextPost, Topic, PostComment } from '../types';

export const TOPICS: Topic[] = [
  { 
    id: 'mac', 
    name: "Mac O'Clock", 
    slug: 'macoclock',
    description: "The best stories for Apple owners and enthusiasts",
    avatar_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&h=100&fit=crop',
    members_count: 124000,
    posts_count: 5300
  },
  { 
    id: 'math', 
    name: 'Math Games', 
    slug: 'mathgames',
    description: "#1 Math Puzzles on Medium",
    avatar_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop',
    members_count: 45000,
    posts_count: 1200
  },
  { 
    id: 'illumination', 
    name: 'ILLUMINATION', 
    slug: 'illumination',
    description: "We curate & disseminate outstanding stories from diverse domains to create synergy.",
    avatar_url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    members_count: 890000,
    posts_count: 24000
  },
  { 
    id: 'ux', 
    name: 'UX Collective', 
    slug: 'uxcollective',
    description: "We believe designers are thinkers as much as they are makers.",
    avatar_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop',
    members_count: 450000,
    posts_count: 8500
  },
  { 
    id: 'stack', 
    name: 'Stackademic', 
    slug: 'stackademic',
    description: "Stackademic is a learning hub for programmers, devs, coders, and engineers.",
    avatar_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=100&h=100&fit=crop',
    members_count: 230000,
    posts_count: 15600
  },
];

export const MOCK_TEXT_POSTS: TextPost[] = [
  {
    id: 't1',
    content: "I'm just going to say what we are all thinking and knowing is about to downity down: There is about to be some piping hot tea spillage on here daily that people posting and we are all going to sitting like:",
    user_id: 'u1',
    user: { id: 'u1', username: 'fabstudio.design', full_name: 'Fab Studio', avatar_url: 'https://i.pravatar.cc/150?u=fab', created_at: '', verified: true },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likes_count: 1468,
    comments_count: 347,
    reposts_count: 5,
    repliers_avatars: [
      'https://i.pravatar.cc/150?u=1',
      'https://i.pravatar.cc/150?u=2',
      'https://i.pravatar.cc/150?u=3'
    ],
    topic: TOPICS[3] // UX Collective
  },
  {
    id: 't2',
    content: "Minimalism isn't just about owning less, it's about making room for more of what matters. 🌿",
    image_urls: [
       'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1507149833265-60c372daea22?w=500&auto=format&fit=crop'
    ],
    user_id: 'u2',
    user: { id: 'u2', username: 'design_daily', full_name: 'Design Daily', avatar_url: 'https://i.pravatar.cc/150?u=design', created_at: '', verified: true },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes_count: 890,
    comments_count: 45,
    reposts_count: 120,
    repliers_avatars: [
      'https://i.pravatar.cc/150?u=4',
      'https://i.pravatar.cc/150?u=5'
    ],
    topic: TOPICS[2] // Illumination
  },
   {
    id: 't3',
    content: "There is about to be some piping hot tea spillage on here daily that people posting and we are all going to sitting like:",
    user_id: 'u3',
    user: { id: 'u3', username: 'imfaizu_', full_name: 'Faizu', avatar_url: 'https://i.pravatar.cc/150?u=faizu', created_at: '' },
    created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    likes_count: 56,
    comments_count: 2,
    reposts_count: 0,
    repliers_avatars: [
      'https://i.pravatar.cc/150?u=6'
    ],
    topic: TOPICS[0] // Mac
  },
  {
    id: 't4',
    content: "Anyone else excited about the new Next.js release? The server actions are a game changer! 🔥",
    user_id: 'u4',
    user: { id: 'u4', username: 'feona_alexender', full_name: 'Feona', avatar_url: 'https://i.pravatar.cc/150?u=feona', created_at: '' },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    likes_count: 1397,
    comments_count: 526,
    reposts_count: 34,
    repliers_avatars: [
      'https://i.pravatar.cc/150?u=7',
      'https://i.pravatar.cc/150?u=8',
       'https://i.pravatar.cc/150?u=9'
    ],
    topic: TOPICS[4] // Stack
  }
];

export const MOCK_COMMENTS: Record<string, PostComment[]> = {
  't1': [
    {
      id: 'c1',
      post_id: 't1',
      user: { id: 'u10', username: 'alex_dev', full_name: 'Alex', avatar_url: 'https://i.pravatar.cc/150?u=10', created_at: '', verified: true },
      content: "Can't wait for the tea! ☕️",
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      likes_count: 12,
    },
    {
      id: 'c2',
      post_id: 't1',
      user: { id: 'u11', username: 'sarah_m', full_name: 'Sarah', avatar_url: 'https://i.pravatar.cc/150?u=11', created_at: '', verified: false },
      content: "This is exactly what I was thinking lol",
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      likes_count: 5,
      replies: [
        {
          id: 'c2_1',
          post_id: 't1',
          user: { id: 'u1', username: 'fabstudio.design', full_name: 'Fab Studio', avatar_url: 'https://i.pravatar.cc/150?u=fab', created_at: '', verified: true },
          content: "I know right?!",
          created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          likes_count: 2,
        }
      ]
    }
  ],
  't2': [
    {
      id: 'c3',
      post_id: 't2',
      user: { id: 'u12', username: 'minimal_vibes', full_name: 'Minimal', avatar_url: 'https://i.pravatar.cc/150?u=12', created_at: '' },
      content: "Such a beautiful message. Minimalism has changed my life.",
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      likes_count: 24,
    }
  ]
};
