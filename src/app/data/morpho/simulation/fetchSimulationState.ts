import { SimulationState } from "@morpho-org/simulation-sdk";
import { blueAbi } from "@morpho-org/blue-sdk-viem";
import {
  type FetchMarketsParameters,
  type FetchTokensParameters,
  type FetchUsersParameters,
  type FetchVaultsParameters,
  fetchMarketQueryOptions,
  fetchUserQueryOptions,
  fetchTokenQueryOptions,
  fetchVaultQueryOptions,
  fetchPositionQueryOptions,
  fetchHoldingQueryOptions,
  fetchVaultMarketConfigQueryOptions,
  fetchVaultUserQueryOptions,
} from "@morpho-org/blue-sdk-wagmi";
import { getChainAddresses as getMorphoChainAddresses } from "@morpho-org/blue-sdk";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getBlock } from "wagmi/actions";
import { readContractQueryOptions } from "wagmi/query";
import { getConfig } from "../../../utils/queryContractUtils";
import { base } from "viem/chains";

type FetchSimulationStateParameters = FetchMarketsParameters &
  FetchUsersParameters &
  FetchTokensParameters &
  FetchVaultsParameters & { chainId?: number };

export const fetchSimulationState = async ({
  marketIds,
  users,
  tokens,
  vaults,
  chainId = base.id,
}: FetchSimulationStateParameters) => {
  const queryClient = getQueryClient();
  const config = getConfig();
  const block = await getBlock(config);

  const { morpho } = getMorphoChainAddresses(chainId);

  const feeRecipient = await queryClient.fetchQuery(
    readContractQueryOptions(config, {
      address: morpho,
      abi: blueAbi,
      functionName: "feeRecipient",
    })
  );

  const marketState = await Promise.all(
    [...marketIds].map((id) => {
      const { queryFn, queryKey } = fetchMarketQueryOptions(config, {
        marketId: id,
        chainId,
      });
      return queryClient.fetchQuery({ queryFn, queryKey });
    })
  );

  const usersState = await Promise.all(
    [...users].map((user) => {
      const { queryFn, queryKey } = fetchUserQueryOptions(config, {
        user,
        chainId,
      });
      return queryClient.fetchQuery({ queryFn, queryKey });
    })
  );

  const tokensState = await Promise.all(
    [...tokens].map((token) => {
      const { queryFn, queryKey } = fetchTokenQueryOptions(config, {
        token,
        chainId,
      });
      return queryClient.fetchQuery({ queryFn, queryKey });
    })
  );

  const vaultsState = await Promise.all(
    [...vaults].map((vault) => {
      const { queryFn, queryKey } = fetchVaultQueryOptions(config, {
        vault,
        chainId,
      });
      return queryClient.fetchQuery({ queryFn, queryKey });
    })
  );

  const positionsState = await Promise.all(
    [...users].flatMap((user) =>
      [...marketIds].map((marketId) => {
        const { queryFn, queryKey } = fetchPositionQueryOptions(config, {
          user,
          marketId,
          chainId,
        });
        return queryClient.fetchQuery({ queryFn, queryKey });
      })
    )
  );

  const holdingsState = await Promise.all(
    [...users].flatMap((user) =>
      [...tokens].map((token) => {
        const { queryFn, queryKey } = fetchHoldingQueryOptions(config, {
          user,
          token,
          chainId,
        });
        return queryClient.fetchQuery({ queryFn, queryKey });
      })
    )
  );

  const vaultMarketConfigsState = await Promise.all(
    [...vaults].flatMap((vault) =>
      [...marketIds].map((marketId) => {
        const { queryFn, queryKey } = fetchVaultMarketConfigQueryOptions(config, {
          vault,
          marketId,
          chainId,
        });
        return queryClient.fetchQuery({ queryFn, queryKey });
      })
    )
  );

  const vaultUsersState = await Promise.all(
    [...vaults].flatMap((vault) =>
      [...users].map((user) => {
        const { queryFn, queryKey } = fetchVaultUserQueryOptions(config, {
          vault,
          user,
          chainId,
        });
        return queryClient.fetchQuery({ queryFn, queryKey });
      })
    )
  );

  const simulationState = new SimulationState({
    chainId,
    block,
    global: { feeRecipient },
    markets: Object.fromEntries(marketState.map((item) => [item.id, item])),
    users: Object.fromEntries(usersState.map((item) => [item.address, item])),
    tokens: Object.fromEntries(tokensState.map((item) => [item.address, item])),
    vaults: Object.fromEntries(vaultsState.map((item) => [item.address, item])),
    positions: arrayToNestedObject(positionsState, ["user", "marketId"]),
    holdings: arrayToNestedObject(holdingsState, ["user", "token"]),
    vaultMarketConfigs: arrayToNestedObject(vaultMarketConfigsState, ["vault", "marketId"]),
    vaultUsers: arrayToNestedObject(vaultUsersState, ["vault", "user"]),
  });

  return simulationState;
};

function arrayToNestedObject<T extends Record<string, any>>(array: T[], keys: (keyof T)[]): Record<string, any> {
  return array.reduce((acc: Record<string, any>, item: T) => {
    let current: Record<string, any> = acc;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = String(item[keys[i]]);
      current[key] = current[key] || {};
      current = current[key] as Record<string, any>;
    }
    const lastKey = String(item[keys[keys.length - 1]]);
    current[lastKey] = item;
    return acc;
  }, {});
}
