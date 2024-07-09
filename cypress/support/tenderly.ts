import { Address, createTestClient, http, publicActions, walletActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, foundry } from "viem/chains";

const PRIVATE_KEY = Cypress.env("VITE_PKEY");
const account = privateKeyToAccount(`0x${PRIVATE_KEY}` as Address);

const TENDERLY_KEY = Cypress.env("TENDERLY_KEY");
const TENDERLY_ACCOUNT = Cypress.env("TENDERLY_ACCOUNT");
const TENDERLY_PROJECT = Cypress.env("TENDERLY_PROJECT");

export const DEFAULT_TEST_ACCOUNT = {
  address: account.address as Address,
  privateKey: PRIVATE_KEY,
};

export class TenderlyFork {
  public _forkNetworkID: string;

  public _chainID: number;

  private fork_id?: string;

  public client?: ReturnType<typeof initTestClient> | undefined;

  constructor({ forkNetworkID }: { forkNetworkID: number }) {
    this._forkNetworkID = forkNetworkID.toString();
    this._chainID = base.id;
  }

  private checkForkInitialized() {
    if (!this.fork_id) throw new Error("Fork not initialized!");
  }

  async init() {
    const response = await fetch(
      `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT}/project/${TENDERLY_PROJECT}/fork`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": TENDERLY_KEY,
        },
        body: JSON.stringify({
          network_id: this._forkNetworkID,
          chain_config: { chain_id: this._chainID },
        }),
      }
    );
    const data = await response.json();
    this.fork_id = data.simulation_fork.id;

    this.client = initTestClient(this.get_rpc_url());
  }

  get_rpc_url() {
    this.checkForkInitialized();
    return `https://rpc.tenderly.co/fork/${this.fork_id}`;
  }

  async add_balance_rpc(address?: Address, value?: bigint) {
    this.checkForkInitialized();

    const response = await fetch(
      `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT}/project/${TENDERLY_PROJECT}/fork/${this.fork_id}/balance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": TENDERLY_KEY,
        },
        body: JSON.stringify({
          accounts: [address],
          amount: value?.toString() || "100000000000000000000",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to set balance on Tenderly fork");
    }

    return response.json();
  }

  async deleteFork() {
    await fetch(
      `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT}/project/${TENDERLY_PROJECT}/fork/${this.fork_id}`,
      {
        method: "DELETE",
        headers: {
          "X-Access-Key": TENDERLY_KEY,
        },
      }
    );
  }
}

const initTestClient = (rpc: string) =>
  createTestClient({
    chain: foundry,
    mode: "anvil",
    transport: http(rpc),
  })
    .extend(publicActions)
    .extend(walletActions);

export const startDemoEnv = () => {
  cy.visit("/");
  localStorage.setItem("demo", String(true));
};
