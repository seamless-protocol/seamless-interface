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
  }
}

export const IS_DEV_MODE = process.env.NODE_ENV === "development";
