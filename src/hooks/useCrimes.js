import { useQuery } from "@tanstack/react-query";
import { getCrimes } from "../services/apiCrimes";

export function useCrimes() {
  return useQuery({
    queryKey: ["crimes"],
    queryFn: getCrimes,
    staleTime: Infinity, // 🔥 nunca se vuelve obsoleto
    cacheTime: Infinity, // 🔥 nunca se borra de la cache
  });
}
