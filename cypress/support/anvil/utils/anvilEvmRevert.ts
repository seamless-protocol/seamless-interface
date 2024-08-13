import { Address } from "viem";
import { testAnvilClient } from "../constants";

export const anvilEvmRevert = async (snapshotId: string) => {
  const result = await testAnvilClient.revert({
    id: snapshotId as Address,
  });

  return result;
};
