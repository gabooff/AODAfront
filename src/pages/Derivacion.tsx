import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MapPin, CirclePlusIcon } from "lucide-react";
import Navigation from "@/components/Navigation";

import { chatWihAgent } from "@/services/apiAgents";
import { ChatInterface, Message } from "@/components/ChatInterface";
import {
  ConversationsList,
  Conversation,
} from "@/components/ConversationLists";
import { useUser } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useConversations";
import FormDerivation from "@/components/FormDerivation";

const Derivacion = () => {
  const { data: user } = useUser();
  const { data: conversationList } = useConversations();

  // Chat state

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [conversationMessages, setConversationMessages] = useState<
    Record<string, Message[]>
  >({});

  const handleChatMessage = async (message: string): Promise<string> => {
    const response = await chatWihAgent({
      message,
      user_id: user.id,
      conversation_id: activeConversationId,
    });
    return response;
  };

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: newId,
      name: `Conversación ${conversations.length + 1}`,
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newId);
    setConversationMessages((prev) => ({ ...prev, [newId]: [] }));
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleMessagesChange = (messages: Message[]) => {
    if (activeConversationId) {
      setConversationMessages((prev) => ({
        ...prev,
        [activeConversationId]: messages,
      }));

      // Update conversation last message and timestamp
      // if (messages.length > 0) {
      //   const lastMessage = messages[messages.length - 1];
      //   setConversations((prev) =>
      //     prev.map((conv) =>
      //       conv.id === activeConversationId
      //         ? {
      //             ...conv,
      //             lastMessage: lastMessage.content.slice(0, 50),
      //             timestamp: new Date(),
      //           }
      //         : conv
      //     )
      //   );
      // }
    }
  };

  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, title: newTitle } : conv))
    );
  };

  const currentMessages = activeConversationId
    ? conversationMessages[activeConversationId] || []
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nueva Derivación
          </h1>
          <p className="text-muted-foreground">
            Complete la información del caso para obtener una recomendación de
            AODA del centro más apropiado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Formulario */}
          <FormDerivation />
          {/* Recomendación - Chat */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Recomendación de AODA</span>
              </CardTitle>
              <CardDescription>
                Centro recomendado basado en el análisis del agente inteligente.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[600px] p-0">
              <div className="flex h-full">
                <div className="w-64">
                  <ConversationsList
                    conversations={conversationList}
                    activeConversationId={activeConversationId}
                    onSelectConversation={handleSelectConversation}
                    onNewConversation={handleNewConversation}
                    onRenameConversation={handleRenameConversation}
                  />
                </div>
                <div className="flex-1 p-6">
                  <ChatInterface
                    conversationId={activeConversationId}
                    messages={currentMessages}
                    onSendMessage={handleChatMessage}
                    onMessagesChange={handleMessagesChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Derivacion;
