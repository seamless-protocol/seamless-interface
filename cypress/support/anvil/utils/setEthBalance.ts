import { Address } from "viem";
import { targetAccount, testAnvilClient } from "../../constants";

export const setEthBalance = async ({
  amount = BigInt(1e18),
  address = targetAccount,
}: {
  amount?: bigint;
  address?: Address;
}) => {
  await testAnvilClient.request({
    method: "anvil_setBalance",
    params: [address, `0x${amount.toString(16)}`],
  });
};
