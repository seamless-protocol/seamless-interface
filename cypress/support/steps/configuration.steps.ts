import { Address } from "viem";
import { DEFAULT_TEST_ACCOUNT, TenderlyFork } from "../tenderly";
import { base } from "viem/chains";

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

  const walletAddress: Address = wallet != null ? wallet.address : DEFAULT_TEST_ACCOUNT.address;

  before(async () => {
    await tenderly.init();
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    await tenderly.add_balance_rpc(walletAddress);
  });

  // before("Save env variables", () => {
  //   window.tenderly = tenderly;
  //   window.address = walletAddress;
  //   window.chainId = chainId.toString();
  //   window.rpc = tenderly.get_rpc_url();
  //   window.market = market;
  //   window.testnetsEnabled = enableTestnet.toString();
  //   window.url = URL;
  //   window.provider = provider;
  //   window.signer = signer;
  //   window.auth = auth;
  // });

  after(async () => {
    if (!PERSIST_FORK_AFTER_RUN) {
      cy.log("deleting fork");
      await tenderly.deleteFork();
    }
  });
};
