import type { Client, Chain, Transport } from 'viem'
import { type Config, getClient } from "@wagmi/core";
import { providers } from "ethers";

export function clientToProvider(client: Client<Transport, Chain>) {
    const { chain, transport } = client
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback')
        return new providers.JsonRpcProvider(transport.transports[0].value?.url, network)
    //   return new providers.FallbackProvider(
    //     (transport.transports as ReturnType<Transport>[]).map(
    //       ({ value }) => new providers.JsonRpcProvider(value?.url, network),
    //     ),
    //   )
    return new providers.JsonRpcProvider(transport.url, network)
  }
  
  /** Action to convert a viem Public Client to an ethers.js Provider. */
  export function getEthersProvider(
    config: Config,
    { chainId }: { chainId?: number } = {},
  ) {
    const client = getClient(config, { chainId })

    if (!client) {
        throw new Error("Client not found");
    }

    return clientToProvider(client)
  }
  