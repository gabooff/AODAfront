export interface DerivationPayload {
  age: number;
  sex: string;
  migrate_situation: boolean;
  description: string;
  crime_id: number;
  comuna_id: number;
}

export interface ConversationPayload {
  user_id: number;
  name?: string;
}

export interface ConversationResponse {
  conversation_id: string;
}

export interface SendMessageParams {
  message: string;
  userId: number;
  conversationId: string;
}

export interface ChatPayload {
  message: string;
  user_id: number;
  conversation_id: string;
}

export interface MessagesPayload {
  conversation_id: string;
}
