import { Address } from "viem";
import { TenderlyFork } from "../tenderly";
import { base } from "viem/chains";
// import { privateKeyToAccount } from "viem/accounts";

const PERSIST_FORK_AFTER_RUN = Cypress.env("VITE_PERSIST_FORK_AFTER_RUN") || false;

export const configEnvWithTenderly = ({
  wallet,
  chainId = base.id,
  enableTestnet = false,
}: {
  chainId?: number;
  tokens?: { tokenAddress: string; donorAddress?: string; tokenCount?: string }[];
  unpause?: boolean;
  wallet?: {
    address: Address;
    privateKey: string;
  };
  enableTestnet?: boolean;
}) => {
  const tenderly = new TenderlyFork({ forkNetworkID: chainId });

  // const walletAddress: Address = wallet != null ? wallet.address : DEFAULT_TEST_ACCOUNT.address;

  before(async () => {
    await tenderly.init();
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    // await tenderly.add_balance_rpc(walletAddress);
  });

  before("Open main page", () => {
    // const rpc = tenderly.get_rpc_url();
    // const provider = tenderly.client;
    // const signer = privateKeyToAccount(wallet?.privateKey || DEFAULT_TEST_ACCOUNT.privateKey);
    // cy.visit(Cypress.env("URL"), {
    //   onBeforeLoad(win: Cypress.AUTWindow & typeof globalThis) {
    //     // @ts-ignore
    //     win.ethereum = provider;
    //     win.localStorage.setItem("forkEnabled", "true");
    //     win.localStorage.setItem("forkNetworkId", "3030");
    //     win.localStorage.setItem("forkBaseChainId", chainId.toString());
    //     win.localStorage.setItem("forkRPCUrl", rpc);
    //     win.localStorage.setItem("walletProvider", "injected");
    //     win.localStorage.setItem("selectedAccount", walletAddress.toLowerCase());
    //     win.localStorage.setItem("selectedMarket", "mainnet");
    //     win.localStorage.setItem("testnetsEnabled", enableTestnet.toString());
    //   },
    // });
  });

  after(async () => {
    if (!PERSIST_FORK_AFTER_RUN) {
      cy.log("deleting fork");
      await tenderly.deleteFork();
    }
  });
};
