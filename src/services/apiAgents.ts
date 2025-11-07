import { apiAnova } from "./api";

export interface ChatPayload {
  message: string;
  user_id: number;
  conversation_id: string;
}

export interface ConversationPayload {
  user_id: number;
  name?: string;
}

export interface MessagesPayload {
  conversation_id: string;
}

export async function createConversation(
  conversationPayload: ConversationPayload
) {
  const { data } = await apiAnova.post(
    "/agent/conversations/create",
    conversationPayload
  );

  return data;
}

export async function getConversations() {
  const { data } = await apiAnova.get("/agent/conversations");
  return data;
}

export async function getMessagesOpenAi(messagesPayload: MessagesPayload) {
  const { data } = await apiAnova.get("/agent/conversations");
  return data;
}

export async function chatWihAgent(chatPayload: ChatPayload) {
  const { data } = await apiAnova.post("/agent", chatPayload);
  return data.response;
}
