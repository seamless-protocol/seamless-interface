export interface ViewUserInfo {
  underlyingAssetBalance: {
    tokenAmount: {
      value: string;
      symbol: string;
    };
    dollarAmount: {
      value: string;
      symbol: string;
    };
  };

  strategyBalance: {
    tokenAmount: {
      value: string;
      symbol: string;
    };
    dollarAmount: {
      value: string;
      symbol: string;
    };
  };
}
