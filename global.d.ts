export {};

declare global {
  interface Window {
    CBWSubscribe: {
      createSubscriptionUI: (options: {
        partnerAddress: string;
        partnerName: string;
        modalTitle: string;
        modalBody: string;
        onSubscriptionChange: (isSubscribed: boolean) => void;
        onLoading: (isLoading: boolean) => void;
      }) => void;
      toggleSubscription: () => void;
    };

    ethereum?: any & {
      request: ({
        method,
        params,
      }: {
        method: string;

        params?: Array<any>;
      }) => Promise<any>;
    };
  }
}

declare module "viem/account";
