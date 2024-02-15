import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Connector, useAccount, useConnect } from "wagmi";

const WALLET_STROAGE_KEY = "WALLET_STROAGE_KEY";
const WAGMI_WALLET_STORAGE_KEY = "WAGMI_WALLET_STORAGE_KEY";

// ID of the SAFE connector instance
const SAFE_ID = "SAFE";

/**
 * This function will get the initial wallet connector (if any), the app will connect to
 * @param initialNetwork
 * @param previousWalletId
 * @param connectors
 * @returns
 */
const getInitialConnector = (
  previousWalletId: string,
  connectors: readonly Connector[]
): { connector: Connector | undefined; chainId?: number } | undefined => {
  // Look for the SAFE connector instance and connect to it instantly if loaded in SAFE frame
  const safeConnectorInstance = connectors.find(
    (connector) => connector.id === SAFE_ID
  );

  if (safeConnectorInstance) {
    return { connector: safeConnectorInstance };
  }

  const connector = connectors.find((f) => f.id === previousWalletId);
  return { connector };
};

/**
 * Automatically connect to a wallet/connector based on config and prior wallet
 */
export const useAutoConnect = (): void => {
  const [wagmiWalletValue] = useLocalStorage<string>(WAGMI_WALLET_STORAGE_KEY);
  const [walletId, setWalletId] = useLocalStorage<string>(
    WALLET_STROAGE_KEY,
    wagmiWalletValue ?? ""
  );
  const connectState = useConnect();
  const accountState = useAccount();

  useEffect(() => {
    if (accountState.isConnected) {
      setWalletId(accountState.connector?.id ?? "");
    } else {
      window.localStorage.setItem(WAGMI_WALLET_STORAGE_KEY, JSON.stringify(""));
      setWalletId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountState.isConnected, accountState.connector?.name]);

  useEffect(() => {
    if (accountState.isConnected) return;

    const initialConnector = getInitialConnector(
      walletId,
      connectState.connectors
    );

    if (initialConnector?.connector) {
      connectState.connect({
        connector: initialConnector.connector,
        chainId: initialConnector.chainId,
      });
    }
  });
};
