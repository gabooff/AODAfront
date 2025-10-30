import { useQuery } from "@tanstack/react-query";
import { getCenters, getTopCenters } from "../services/apiCenters";

export function useCenters() {
  return useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
    staleTime: Infinity, // 🔥 nunca se vuelve obsoleto
    cacheTime: Infinity, // 🔥 nunca se borra de la cache
  });
}

export function useTopCenters() {
  return useQuery({
    queryKey: ["topCenters"],
    queryFn: getTopCenters,
    staleTime: 0, // 🔥 nunca se vuelve obsoleto
  });
}
