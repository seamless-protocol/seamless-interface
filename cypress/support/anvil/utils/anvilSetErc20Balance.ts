import {
  type Address,
  BaseError,
  createTestClient,
  encodeAbiParameters,
  erc20Abi,
  getAbiItem,
  http,
  keccak256,
  pad,
  parseAbiParameters,
  publicActions,
  toHex,
  walletActions,
} from "viem";
import { foundry } from "viem/chains";
import { anvilForkUrl } from "../constants";

type SetErcBalanceParameters = {
  address: Address;
  tokenAddress: Address;
  value: bigint;
};

const balanceOfAbiItem = getAbiItem({ abi: erc20Abi, name: "balanceOf" });

const SLOT_VALUE_TO_CHECK = 1337_1337_1337_1337_1337_1337_1337_1337_1337n;

const client = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(anvilForkUrl),
})
  .extend(publicActions)
  .extend(walletActions);

const findSlot = async (address: Address, tokenAddress: Address): Promise<bigint> => {
  const recursiveFind = async (slotGuess: bigint): Promise<bigint> => {
    const encodedData = encodeAbiParameters(parseAbiParameters("address, uint"), [address, slotGuess]);
    const slotKey = keccak256(encodedData);

    const oldSlotValue = await client.getStorageAt({
      address: tokenAddress,
      slot: slotKey,
    });

    await client.setStorageAt({
      address: tokenAddress,
      index: slotKey,
      value: pad(toHex(SLOT_VALUE_TO_CHECK)),
    });

    const newBalance = await client.readContract({
      abi: [balanceOfAbiItem],
      address: tokenAddress,
      functionName: "balanceOf",
      args: [address],
    });

    if (newBalance === BigInt(SLOT_VALUE_TO_CHECK)) {
      return slotGuess;
    }

    await client.setStorageAt({
      address: tokenAddress,
      index: slotKey,
      value: pad(toHex(SLOT_VALUE_TO_CHECK + 1n)),
    });

    const newBalanceAgain = await client.readContract({
      abi: [balanceOfAbiItem],
      address: tokenAddress,
      functionName: "balanceOf",
      args: [address],
    });

    if (newBalanceAgain - newBalance === 1n) {
      return slotGuess;
    }

    await client.setStorageAt({
      address: tokenAddress,
      index: slotKey,
      value: oldSlotValue || pad("0x0"),
    });

    if (slotGuess >= 10n) throw new BaseError("could not find storage for: `balanceOf`");

    return recursiveFind(slotGuess + 1n);
  };

  return recursiveFind(0n);
};

export async function anvilSetErc20Balance({ address, tokenAddress, value }: SetErcBalanceParameters) {
  const slotGuess = await findSlot(address, tokenAddress);
  const encodedData = encodeAbiParameters(parseAbiParameters("address, uint"), [address, slotGuess]);

  await client.setStorageAt({
    address: tokenAddress,
    index: keccak256(encodedData),
    value: pad(toHex(value)),
  });
}
