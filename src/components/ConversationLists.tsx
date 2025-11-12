import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MessageSquare, Plus, Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useConversations,
  useCreateConversation,
} from "@/hooks/useConversations";
import { useUser } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export interface Conversation {
  user_id: number;
  name: string;
  conversation_id: string;
}

interface ConversationsListProps {
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  // onRenameConversation: (id: string, newTitle: string) => void;
}

export const ConversationsList = ({
  activeConversationId,
  onSelectConversation,
}: // onNewConversation,
// onRenameConversation,
ConversationsListProps) => {
  const { data: user } = useUser();
  const createConversationMutation = useCreateConversation();
  const queryClient = useQueryClient();
  const { data: conversations } = useConversations();

  const handleNewConversation = async () => {
    const newConv = await createConversationMutation.mutateAsync({
      user_id: user.id,
      name: `Conversación ${(conversations?.length || 0) + 1}`,
    });

    // React Query automatically updates the cache
    queryClient.invalidateQueries({ queryKey: ["conversations"] });
    onSelectConversation(newConv.conversation_id);
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const startEditing = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const saveEdit = (id: string) => {
    if (editTitle.trim()) {
      // onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <Button onClick={handleNewConversation} className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Conversación
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {conversations?.length === 0 ? (
            <div className="text-center py-8 px-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No hay conversaciones aún
              </p>
            </div>
          ) : (
            conversations?.map((conversation) => (
              <div
                key={conversation.conversation_id}
                className={cn(
                  "w-full p-3 rounded-lg transition-colors group",
                  "hover:bg-accent",
                  activeConversationId === conversation.conversation_id
                    ? "bg-accent"
                    : "bg-background"
                )}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    {editingId === conversation.conversation_id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              saveEdit(conversation.conversation_id);
                            if (e.key === "Escape") cancelEdit();
                          }}
                          className="h-7 text-sm"
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => saveEdit(conversation.conversation_id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={cancelEdit}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          onSelectConversation(conversation.conversation_id);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">
                            {conversation.name}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(
                                conversation.conversation_id,
                                conversation.name
                              );
                            }}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
