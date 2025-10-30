import { apiAnova } from "./api";

export async function getCenters() {
  const { data } = await apiAnova.get("/centers/");

  return data;
}

export async function getTopCenters() {
  const { data } = await apiAnova.get("/centers/top");

  return data;
}
