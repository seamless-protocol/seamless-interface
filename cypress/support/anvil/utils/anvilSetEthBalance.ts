import { Address } from "viem";
import { targetAccount } from "../../constants";
import { testAnvilClient } from "../constants";

export const anvilSetEthBalance = async ({
  amount = BigInt(1e18),
  address = targetAccount,
}: {
  amount?: bigint;
  address?: Address;
}) => {
  await testAnvilClient.setBalance({
    address,
    value: amount,
  });
};
