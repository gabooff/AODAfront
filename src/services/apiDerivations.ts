import { DerivationPayload } from "@/types";
import { apiAnova } from "./api";

export async function getDerivations() {
  const { data } = await apiAnova.get("/derivation/");

  return data;
}

export async function createDerivation(derivation: DerivationPayload) {
  const { data } = await apiAnova.post("/derivation/create", derivation);

  // return data;
}
