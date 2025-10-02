import { useQuery } from "@tanstack/react-query";
import { getComunas } from "../services/apiComunas";

export function useComunas() {
  return useQuery({
    queryKey: ["comunas"],
    queryFn: getComunas,
    staleTime: Infinity, // 🔥 nunca se vuelve obsoleto
    cacheTime: Infinity, // 🔥 nunca se borra de la cache
  });
}
