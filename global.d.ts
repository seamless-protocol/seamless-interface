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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any & {
      request: ({
        method,
        params,
      }: {
        method: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params?: Array<any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) => Promise<any>;
    };
  }
}
