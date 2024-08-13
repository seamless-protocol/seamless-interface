import { testAnvilClient } from "..";

export const anvilEvmSnapshot = async () => {
  const response = testAnvilClient.snapshot();

  return response;
};
