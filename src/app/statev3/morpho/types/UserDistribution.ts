interface Distributor {
  id: string;
  address: string;
  chain_id: number;
}

interface Asset {
  id: string;
  address: string;
  chain_id: number;
}

export interface ClaimableData {
  claimable: string;
  proof: string[];
  txData: string;
  distributor: Distributor;
  asset: Asset;
}
