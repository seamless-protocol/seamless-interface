import { Address } from "viem";

interface Asset {
  name: string;
  symbol: string;
  decimals: number;
  address: Address;
}

interface Distributor {
  name: string;
  address: Address;
}

interface Distribution {
  user: Address;
  asset: Asset;
  distributor: Distributor;
  claimable: string;
  proof: string[];
}

interface Pagination {
  next: number | null;
  prev: number | null;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface FetchMorphoResponse {
  data: Distribution[];
  pagination: Pagination;
  timestamp: string;
}