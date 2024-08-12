import { testAnvilClient } from "../constants";

export const anvilEvmSnapshot = async () => {
  const response = testAnvilClient.snapshot();

  return response;
};
