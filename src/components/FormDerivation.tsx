import { Brain, CirclePlusIcon, User } from "lucide-react";
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
import { Textarea } from "./ui/textarea";
import { useComunas } from "../hooks/useComunas";
import { useCrimes } from "../hooks/useCrimes";
import { useCenters } from "../hooks/useCenters";
import { useCreateDerivation } from "@/hooks/useDerivations";
import { useUser } from "@/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

const FormDerivation = () => {
  const { data: comunas } = useComunas();
  const { data: crimes } = useCrimes();
  const { data: centers } = useCenters();
  const { data: user } = useUser();
  const { control, register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const createDerivationMutaion = useCreateDerivation(reset);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    createDerivationMutaion.mutateAsync(payload);
  };
  return (
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={
                        errors.sex ? "border-red-500 focus:ring-red-500" : ""
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={
                      errors?.comuna ? "border-red-500 focus:ring-red-500" : ""
                    }
                  >
                    <SelectValue placeholder="Seleccionar comuna" />
                  </SelectTrigger>
                  <SelectContent side="bottom" className="max-h-[300px]">
                    {comunas?.map((comuna) => (
                      <SelectItem key={comuna.nombre} value={comuna.nombre}>
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={
                      errors?.center ? "border-red-500 focus:ring-red-500" : ""
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={
                      errors?.crime ? "border-red-500 focus:ring-red-500" : ""
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
                errors?.description ? "border-red-500 focus:ring-red-500" : ""
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
  );
};
export default FormDerivation;
