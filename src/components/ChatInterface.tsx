import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, User, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useConversationMessages,
  useConversations,
  useSendMessage,
} from "@/hooks/useConversations";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/hooks/useAuth";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  conversationId: string | null;
}

export const ChatInterface = ({ conversationId }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");

  const { data: user } = useUser();
  const { data: conversations } = useConversations();
  // Fetch messages from React Query
  const { data: messages = [], isLoadingNewConversation } =
    useConversationMessages(conversationId);
  // Send message mutation
  const sendMessageMutation = useSendMessage();
  const queryClient = useQueryClient();

  const areaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // wait for DOM layout to settle
    const raf = requestAnimationFrame(() => {
      const viewport = areaRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement | null;

      if (!viewport) return;

      viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
    });

    return () => cancelAnimationFrame(raf);
  }, [messages.length, conversationId]);

  // Scroll to bottom when loading finishes
  useLayoutEffect(() => {
    if (!isLoadingNewConversation && messages.length > 0) {
      const raf = requestAnimationFrame(() => {
        const viewport = areaRef.current?.querySelector(
          "[data-radix-scroll-area-viewport]"
        ) as HTMLElement | null;

        if (!viewport) return;

        viewport.scrollTo({ top: viewport.scrollHeight, behavior: "instant" });
      });

      return () => cancelAnimationFrame(raf);
    }
  }, [isLoadingNewConversation, messages.length]);
  const handleSend = async () => {
    if (!input.trim() || !conversationId || sendMessageMutation.isPending)
      return;

    const userMessage: Message = { role: "user", content: input };

    // Optimistic update
    queryClient.setQueryData(
      ["messages", conversationId],
      (old: Message[] = []) => [...old, userMessage]
    );

    const messageText = input;
    setInput("");

    try {
      const response = await sendMessageMutation.mutateAsync({
        message: messageText,
        userId: user.id,
        conversationId,
      });

      // Add assistant response
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };

      queryClient.setQueryData(
        ["messages", conversationId],
        (old: Message[] = []) => [...old, assistantMessage]
      );
    } catch (error) {
      // Rollback on error
      queryClient.setQueryData(
        ["messages", conversationId],
        (old: Message[] = []) => old.filter((msg) => msg !== userMessage)
      );

      // Show error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Lo siento, hubo un error al procesar tu mensaje.",
      };

      queryClient.setQueryData(
        ["messages", conversationId],
        (old: Message[] = []) => [...old, errorMessage]
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isLoading = sendMessageMutation.isPending;

  return (
    <div className="flex flex-col h-full">
      {isLoadingNewConversation ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground">Cargando conversación...</p>
          </div>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {conversations !== null
                ? "Pregunta lo que necesites sobre derivaciones y centros"
                : "Crear una conversación para hablar con el agente"}
            </p>
          </div>
        </div>
      ) : (
        <ScrollArea ref={areaRef} className="flex-1 pr-4">
          <div className="space-y-4 py-4">
            {messages?.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      {conversationId !== null && (
        <div className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe tu pregunta..."
            disabled={sendMessageMutation.isPending}
          />
          <Button
            onClick={handleSend}
            disabled={sendMessageMutation.isPending || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
