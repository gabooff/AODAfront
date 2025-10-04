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
import { createDerivation } from "../services/apiDerivations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { DerivationPayload } from "@/types";

const Derivacion = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { control, register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const [recomendacion, setRecomendacion] = useState<any>(null);
  const queryClient = useQueryClient();
  const { data: comunas } = useComunas();
  const { data: crimes } = useCrimes();

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
    console.log(data);
    const crime_id = crimes.find((crime) => crime.name === data.crime).crime_id;
    const comuna_id = comunas.find(
      (comuna) => comuna.nombre === data.comuna
    ).id;

    const payload = {
      age: Number(data.age),
      sex: data.sex,
      migrate_situation: data.migrate_situation
        ? data.migrate_situation === "Si"
        : false,
      description: data.description,
      crime_id,
      comuna_id,
    };
    mutate(payload);
  };

  // const handleConfirmar = () => {
  //   toast({
  //     title: "Derivación registrada",
  //     description: "La derivación ha sido guardada en el sistema.",
  //     variant: "default",
  //   });
  //   // Reset form
  //   setFormData({
  //     age: "",
  //     sex: "",
  //     comuna: "",
  //     migrate_situation: "",
  //     crime: "",
  //     description: "",
  //   });
  // };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <Card>
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

          {/* Recomendación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Recomendación de AODA</span>
              </CardTitle>
              <CardDescription>
                Centro recomendado basado en el análisis del agente inteligente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!recomendacion ? (
                <div className="text-center py-12">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Complete el formulario y haga clic en "Obtener Recomendación
                    AODA" para ver la sugerencia.
                  </p>
                </div>
              ) : (
                <p></p>
                // <div className="space-y-6">
                //   <div className="flex items-center justify-between">
                //     <Badge variant="secondary" className="text-sm">
                //       <CheckCircle className="h-4 w-4 mr-1" />
                //       Confianza: {recomendacion.confianza}%
                //     </Badge>
                //     <Badge variant="outline" className="text-health-success">
                //       {recomendacion.disponibilidad}
                //     </Badge>
                //   </div>

                //   <div>
                //     <h3 className="text-xl font-semibold text-foreground mb-2">
                //       {recomendacion.centro}
                //     </h3>
                //     <p className="text-sm text-muted-foreground mb-4">
                //       {recomendacion.especialidad}
                //     </p>
                //   </div>

                //   <div className="space-y-3">
                //     <div className="flex items-start space-x-2">
                //       <MapPin className="h-4 w-4 text-health-primary mt-1 flex-shrink-0" />
                //       <div>
                //         <p className="text-sm font-medium">Dirección</p>
                //         <p className="text-sm text-muted-foreground">
                //           {recomendacion.direccion}
                //         </p>
                //       </div>
                //     </div>

                //     <div className="flex items-start space-x-2">
                //       <Calendar className="h-4 w-4 text-health-primary mt-1 flex-shrink-0" />
                //       <div>
                //         <p className="text-sm font-medium">Teléfono</p>
                //         <p className="text-sm text-muted-foreground">
                //           {recomendacion.telefono}
                //         </p>
                //       </div>
                //     </div>

                //     <div className="flex items-start space-x-2">
                //       <AlertTriangle className="h-4 w-4 text-health-primary mt-1 flex-shrink-0" />
                //       <div>
                //         <p className="text-sm font-medium">
                //           Motivo de la Recomendación
                //         </p>
                //         <p className="text-sm text-muted-foreground">
                //           {recomendacion.motivo}
                //         </p>
                //       </div>
                //     </div>
                //   </div>

                //   <div className="pt-4 space-y-2">
                //     <Button onClick={handleConfirmar} className="w-full">
                //       Confirmar y Registrar Derivación
                //     </Button>
                //     <Button
                //       variant="outline"
                //       className="w-full"
                //       onClick={() => setRecomendacion(null)}
                //     >
                //       Solicitar Nueva Recomendación
                //     </Button>
                //   </div>
                // </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Derivacion;
