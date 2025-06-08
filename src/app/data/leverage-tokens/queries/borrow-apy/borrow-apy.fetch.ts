import { Address } from "viem";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";
import { fetchBorrowApyByMarketId } from "../../../../statev3/morpho/borrow-apy/BorrowApyByMarketId.fetch";
import { fetchMorphoMarketId } from "../market-id/market-id.fetch";

export async function fetchBorrowApy(leverageToken: Address) {
  const { lendingAdapter } = await fetchLeverageTokenConfig(leverageToken);
  const marketId = await fetchMorphoMarketId({ adapterAddress: lendingAdapter });
  if (!marketId) throw new Error("fetchBorrowApy: Market id is not found");

  const borrowApy = await fetchBorrowApyByMarketId(marketId);
  return borrowApy?.market?.state?.borrowApy;
}
