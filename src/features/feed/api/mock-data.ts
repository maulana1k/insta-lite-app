import { Post, Story, User } from "@/types/database";

export const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "your_story",
    full_name: "Your Story",
    avatar_url: "https://i.pravatar.cc/150?u=1",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    username: "axelbelujon",
    full_name: "Axel Belujon",
    avatar_url: "https://i.pravatar.cc/150?u=2",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    username: "loo.wooy",
    full_name: "Loo Wooy",
    avatar_url: "https://i.pravatar.cc/150?u=3",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    username: "olivierthomas",
    full_name: "Olivier Thomas",
    avatar_url: "https://i.pravatar.cc/150?u=4",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    username: "louismachs",
    full_name: "Louis Machs",
    avatar_url: "https://i.pravatar.cc/150?u=5",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    username: "tinakunakey",
    full_name: "Tina Kunakey",
    avatar_url: "https://i.pravatar.cc/150?u=6",
    created_at: new Date().toISOString(),
  },
];

export const MOCK_STORIES = [
  {
    id: "story-1",
    user_id: "user-1",
    user: {
      id: "user-1",
      username: "Sienna",
      avatar_url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=64&w=64"
    },
    image_url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjY4NjR8MHwxfHNlYXJjaHwyfHxwb3J0cmFpdCUyMHBvcnRyYWl0fGVufDB8fHx8MTY5NzEwNzMzMA&ixlib=rb-1.2.1&q=80&w=1080",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "story-2",
    user_id: "user-2",
    user: {
      id: "user-2",
      username: "Mila",
      avatar_url: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=64&w=64"
    },
    image_url: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjY4NjR8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBvcnRyYWl0fGVufDB8fHx8MTY5NzEwNzQxMQ&ixlib=rb-1.2.1&q=80&w=1080",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "story-3",
    user_id: "user-3",
    user: {
      id: "user-3",
      username: "Leo",
      avatar_url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=64&w=64"
    },
    image_url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjY4NjR8MHwxfHNlYXJjaHwyfHxwZW9wbGUlMjBwb3J0cmFpdCUyMHBvcnRyYWl0fGVufDB8fHx8MTY5NzEwNzQ5Mg&ixlib=rb-1.2.1&q=80&w=1080",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }
];

// export const MOCK_STORIES: Story[] = MOCK_USERS.slice(1).map((user, i) => ({
//   id: `story-${i}`,
//   user_id: user.id,
//   user: user,
//   image_url: `https://source.unsplash.com/1080x1920/?travel,lifestyle,people&sig=${i}`,
//   created_at: new Date().toISOString(),
//   expires_at: new Date(Date.now() + 86400000).toISOString(),
// }));

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    user_id: "2",
    user: MOCK_USERS[1],
    image_url:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop",
    caption: "Flying high ✈️",
    created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hrs ago
    likes_count: 231,
    comments_count: 12,
  },
  {
    id: "post-2",
    user_id: "3",
    user: MOCK_USERS[2],
    image_url:
      "https://images.unsplash.com/photo-1764866915273-ea87cf57526d?q=80&w=729&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Monkey business 🐒",
    created_at: new Date(Date.now() - 21600000).toISOString(), // 6 hrs ago
    likes_count: 472,
    comments_count: 45,
  },
  {
    id: "post-3",
    user_id: "4",
    user: MOCK_USERS[3],
    image_url:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
    caption: "Urban vibes",
    created_at: new Date(Date.now() - 43200000).toISOString(), // 12 hrs ago
    likes_count: 3901,
    comments_count: 120,
  },
  {
    id: "post-4",
    user_id: "5",
    user: MOCK_USERS[4],
    image_url:
      "https://images.unsplash.com/photo-1765466441202-76252154d4fc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Temple run",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    likes_count: 1542,
    comments_count: 88,
  },
  {
    id: "post-5",
    user_id: "6",
    user: MOCK_USERS[5],
    image_url:
      "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=800&auto=format&fit=crop",
    caption: "Waves 🌊",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    likes_count: 892,
    comments_count: 34,
  },
  {
    id: "post-6",
    user_id: "2",
    user: MOCK_USERS[1],
    image_url:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop",
    caption: "Nature",
    created_at: new Date(Date.now() - 200000000).toISOString(),
    likes_count: 120,
    comments_count: 5,
  },
];
