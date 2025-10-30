import { useQuery } from "@tanstack/react-query";
import { getDerivations } from "@/services/apiDerivations";

export function useDerivations() {
  return useQuery({
    queryKey: ["derivations"],
    queryFn: getDerivations,
  });
}
