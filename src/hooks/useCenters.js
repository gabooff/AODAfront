import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../services/apiCenters";

export function useCenters() {
  return useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
    staleTime: Infinity, // 🔥 nunca se vuelve obsoleto
    cacheTime: Infinity, // 🔥 nunca se borra de la cache
  });
}
