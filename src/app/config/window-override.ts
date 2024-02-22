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
    // ethereum: {
    //   isConnected: () => boolean;
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   providers: any;
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   setSelectedProvider: any;
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   request: any;
    // };
  }
}
