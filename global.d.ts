export { };

declare global {
  interface Window {
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
