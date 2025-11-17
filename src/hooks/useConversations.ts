import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  chatWihAgent,
  createConversation,
  deleteConversation,
  getConversations,
  getMessagesOpenAi,
} from "@/services/apiAgents";
import { ConversationPayload, SendMessageParams } from "@/types";
import { useEffect, useRef } from "react";

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

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (conversation_id: string) => {
      const response = await deleteConversation(conversation_id);
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
  const prevConversationIdRef = useRef(conversationId);

  const query = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessagesOpenAi(conversationId!),
    enabled: !!conversationId,
    initialData: [],
  });

  // Check if conversation ID changed
  const conversationChanged = prevConversationIdRef.current !== conversationId;

  // Update ref after render
  useEffect(() => {
    prevConversationIdRef.current = conversationId;
  });

  const isLoadingNewConversation = conversationChanged && query.isFetching;

  return {
    ...query,
    isLoadingNewConversation, // Use this for your spinner
  };
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
