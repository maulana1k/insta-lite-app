export interface Conversation {
  id: string;
  user: {
    name: string;
    username: string;
    avatar_url: string;
  };
  last_message: string;
  last_message_by: "me" | "them";
  timestamp: string;
  unread: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender: "me" | "them";
  content: string;
  timestamp: string;
  type: "text" | "image";
  image_url?: string;
}
