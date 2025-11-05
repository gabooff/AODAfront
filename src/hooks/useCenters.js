import { useQuery } from "@tanstack/react-query";
import { getCenters, getTopCenters } from "../services/apiCenters";

export function useCenters() {
  return useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
    staleTime: 0,
  });
}

export function useTopCenters() {
  return useQuery({
    queryKey: ["topCenters"],
    queryFn: getTopCenters,
    staleTime: 0, // 🔥 nunca se vuelve obsoleto
  });
}
