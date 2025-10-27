import { apiAnova } from "./api";

export async function getComunas() {
  const { data } = await apiAnova.get("/comunas/");

  return data;
}
