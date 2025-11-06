import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  MapPin,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  CirclePlusIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useComunas } from "../hooks/useComunas";
import { useCrimes } from "../hooks/useCrimes";
import { useCenters } from "../hooks/useCenters";
import { createDerivation } from "../services/apiDerivations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { DerivationPayload } from "@/types";
import { chatWihAgent } from "@/services/apiAgents";
import { ChatInterface, Message } from "@/components/ChatInterface";
import {
  ConversationsList,
  Conversation,
} from "@/components/ConversationLists";
import { useUser } from "@/hooks/useAuth";

const Derivacion = () => {
  const queryClient = useQueryClient();
  const { data: comunas } = useComunas();
  const { data: crimes } = useCrimes();
  const { data: centers } = useCenters();
  const { data: user } = useUser();

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { control, register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  // Chat state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [conversationMessages, setConversationMessages] = useState<
    Record<string, Message[]>
  >({});

  const { mutate, isPending: isCreating } = useMutation<
    unknown,
    Error,
    DerivationPayload
  >({
    mutationFn: createDerivation,
    onSuccess: () => {
      toast({
        title: "Derivación registrada",
        description: "La derivación ha sido guardada en el sistema.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["derivations"] });
      reset({
        age: "",
        sex: "",
        comuna: "",
        migrate_situation: "",
        crime: "",
        description: "",
      });
    },
    onError: (err) => {
      alert(err);
    },
  });

  const onSubmit = (data) => {
    const crime_id = crimes.find((crime) => crime.name === data.crime).crime_id;
    const comuna_id = comunas.find(
      (comuna) => comuna.nombre === data.comuna
    ).id;

    const center_id = centers.find(
      (center) => center.institution === data.center
    ).center_id;

    const payload = {
      age: Number(data.age),
      sex: data.sex,
      migrate_situation: data.migrate_situation
        ? data.migrate_situation === "Si"
        : false,
      description: data.description,
      center_id,
      crime_id,
      comuna_id,
      user_id: user.id,
    };
    mutate(payload);
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    const response = await chatWihAgent({
      message,
      user_id: user.id,
    });
    return response;
  };

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: newId,
      title: `Conversación ${conversations.length + 1}`,
      timestamp: new Date(),
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
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Información del Caso</span>
              </CardTitle>
              <CardDescription>
                Ingrese los datos del caso sin incluir información personal
                identificable.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      id="age"
                      type="number"
                      {...register("age", {
                        required: "Campo obligatorio",
                        min: {
                          value: 0,
                          message: "Número negativos no permitidos",
                        },
                      })}
                      placeholder="Ej: 28"
                      className={
                        errors?.age?.message
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    {errors.age?.message && (
                      <p className="text-sm text-red-500">
                        {String(errors.age.message)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sex">Sexo</Label>
                    <Controller
                      name="sex"
                      control={control}
                      rules={{ required: "Campo obligatorio" }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={
                              errors.sex
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent side="bottom">
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                            <SelectItem value="no-especifica">
                              Prefiere no especificar
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.sex?.message && (
                      <p className="text-sm text-red-500">
                        {String(errors.sex.message)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comuna">Comuna de Residencia</Label>
                  <Controller
                    name="comuna"
                    control={control}
                    rules={{ required: "Campo obligatorio" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={
                            errors?.comuna
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Seleccionar comuna" />
                        </SelectTrigger>
                        <SelectContent side="bottom" className="max-h-[300px]">
                          {comunas?.map((comuna) => (
                            <SelectItem
                              key={comuna.nombre}
                              value={comuna.nombre}
                            >
                              {comuna.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors?.comuna?.message && (
                    <p className="text-sm text-red-500">
                      {String(errors.comuna.message)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="center">Centro de Derivación</Label>
                  <Controller
                    name="center"
                    control={control}
                    rules={{ required: "Campo obligatorio" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={
                            errors?.center
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Seleccionar centro" />
                        </SelectTrigger>
                        <SelectContent side="bottom" className="max-h-[300px]">
                          {centers?.map((center) => (
                            <SelectItem
                              key={center.institution}
                              value={center.institution}
                            >
                              {center.institution}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors?.comuna?.message && (
                    <p className="text-sm text-red-500">
                      {String(errors.center.message)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="migrate_situation">Migrante</Label>
                  <Controller
                    name="migrate_situation"
                    control={control}
                    rules={{ required: "Campo obligatorio" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={
                            errors?.migrate_situation
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectItem value="Si">Si</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.migrate_situation?.message && (
                    <p className="text-sm text-red-500">
                      {String(errors.migrate_situation.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crime">Tipo de Delito</Label>
                  <Controller
                    name="crime"
                    control={control}
                    rules={{ required: "Campo obligatorio" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={
                            errors?.crime
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Seleccionar tipo de delito" />
                        </SelectTrigger>
                        <SelectContent side="bottom" className="max-h-[300px]">
                          {crimes?.map((crime) => (
                            <SelectItem key={crime.name} value={crime.name}>
                              {crime.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors?.crime?.message && (
                    <p className="text-sm text-red-500">
                      {String(errors.crime.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcionCaso">Descripción del Caso</Label>
                  <Textarea
                    id="descripcionCaso"
                    placeholder="Descripción breve del caso sin datos personales identificables..."
                    rows={4}
                    {...register("description", {
                      required: "Campo requirido",
                    })}
                    className={
                      errors?.description
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }
                  />
                  {errors?.description?.message && (
                    <p className="text-sm text-red-500">
                      {String(errors.description.message)}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      Procesando con AODA...
                    </>
                  ) : (
                    <>
                      <CirclePlusIcon className="mr-2 h-4 w-4" />
                      Crear derivación
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

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
                    conversations={conversations}
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
