import { Address } from "viem";
import { testAnvilClient } from "../constants";

export const anvilEvmRevert = async (snapshotId: string) => {
  // eslint-disable-next-line no-console
  console.log("Reverting snapshot", snapshotId);
  const result = await testAnvilClient.revert({
    id: snapshotId as Address,
  });
  // eslint-disable-next-line no-console
  console.log({ result });

  return result;
};
