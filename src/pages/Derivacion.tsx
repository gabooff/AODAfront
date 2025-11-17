import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { ConversationsList } from "@/components/ConversationLists";
import FormDerivation from "@/components/FormDerivation";

const Derivacion = () => {
  // Chat state

  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  return (
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
                  activeConversationId={activeConversationId}
                  onSelectConversation={setActiveConversationId}
                />
              </div>
              <div className="flex-1 p-6">
                <ChatInterface conversationId={activeConversationId} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

// const handleRenameConversation = (id: string, newTitle: string) => {
//   setConversations((prev) =>
//     prev.map((conv) => (conv.id === id ? { ...conv, title: newTitle } : conv))
//   );
// };

export default Derivacion;
