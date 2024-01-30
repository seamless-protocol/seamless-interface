export interface ViewStrategyInfo {
  currentMultiple: string;
  targetMultiple: string;
  collateral: {
    tokenAmount: {
      value: string;
      symbol: string;
    };
    dollarAmount: {
      value: string;
      symbol: string;
    };
  };
  equity: {
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
