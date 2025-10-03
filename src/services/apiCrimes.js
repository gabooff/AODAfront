import apiAnova from "./api";

export async function getCrimes() {
  const { data } = await apiAnova.get("/crimes/");

  return data;
}
