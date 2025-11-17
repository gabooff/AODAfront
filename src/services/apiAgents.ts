import {
  ChatPayload,
  ConversationPayload,
  ConversationResponse,
} from "@/types";
import { apiAnova } from "./api";

export async function createConversation(
  conversationPayload: ConversationPayload
): Promise<ConversationResponse> {
  const { data } = await apiAnova.post(
    "/agent/conversations/create",
    conversationPayload
  );

  return data;
}

export async function deleteConversation(conversation_id: string) {
  const { data } = await apiAnova.delete(
    `/agent/conversations/delete/${conversation_id}`,
    conversation_id
  );

  return data;
}

export async function getConversations() {
  const { data } = await apiAnova.get("/agent/conversations");
  return data;
}

export async function getMessagesOpenAi(conversation_id: string) {
  const { data } = await apiAnova.get(
    `/agent/conversations/${conversation_id}`
  );
  return data;
}

export async function chatWihAgent(chatPayload: ChatPayload) {
  const { data } = await apiAnova.post("/agent/chat", chatPayload);
  return data.response;
}
