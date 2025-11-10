import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  chatWihAgent,
  createConversation,
  getConversations,
  getMessagesOpenAi,
} from "@/services/apiAgents";
import { ConversationPayload, SendMessageParams } from "@/types";

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });
}

export const useCreateConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newConversation: ConversationPayload) => {
      const response = await createConversation(newConversation);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (err) => {
      alert(err);
    },
  });
};

export const useConversationMessages = (conversationId: string | null) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessagesOpenAi(conversationId!),
    enabled: !!conversationId, // Only fetch when we have an ID,
    initialData: [],
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      message,
      userId,
      conversationId,
    }: SendMessageParams) =>
      chatWihAgent({
        message,
        user_id: userId,
        conversation_id: conversationId,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
    },
  });
};
