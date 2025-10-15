import apiAnova from "./api";

export async function getCenters() {
  const { data } = await apiAnova.get("/centers/");

  return data;
}
