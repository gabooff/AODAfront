import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDerivation, getDerivations } from "@/services/apiDerivations";
import { toast } from "./use-toast";
import { FieldValues, UseFormReset } from "react-hook-form";

export function useDerivations() {
  return useQuery({
    queryKey: ["derivations"],
    queryFn: getDerivations,
  });
}

export const useCreateDerivation = (reset: UseFormReset<FieldValues>) => {
  const queryClient = useQueryClient();

  return useMutation({
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
};
