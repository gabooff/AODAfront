import { apiAnova } from "./api";

export interface ChatPayload {
  message: string;
  user_id?: number;
}

export async function chatWihAgent(chatPayload: ChatPayload) {
  const { data } = await apiAnova.post("/agent/chat", chatPayload);
  return data.response;
}
