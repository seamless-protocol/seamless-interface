import { BaseError, ContractFunctionRevertedError } from "viem";

const defaultMessage = "An unknown error occurred, use the Support channel in Discord for assistance.";

/**
 * @dev utility function to parse error
 * @param e - error object
 * @returns {string} parsed error string
 */
export const getParsedError = (error: any | BaseError): string => {
  let message = defaultMessage;
  let errorKey = "";

  const revertedError = error?.walk ? error.walk((err: unknown) => err instanceof ContractFunctionRevertedError) : null;
  if (revertedError instanceof ContractFunctionRevertedError) {
    errorKey = revertedError.data?.errorName ?? revertedError.signature ?? revertedError.reason ?? "";
    if (errorMapping[errorKey]) return errorMapping[errorKey];
  }

  message = error.shortMessage || error.details || error.message || message;

  return message;
};

export const errorMapping: Record<string, string> = {
  EnforcedPause: "Temporary pause in effect, please check Discord for updates.",
  ErrorNotEnoughAllowance: "Not enough allowance, did you approve your tokens first?",
  "0xc2139725": "Not enough allowance, did you approve your tokens first?",
  ERC4626ExceededMaxDeposit: "This ILM is currently at capacity, please try again later",
  SharesReceivedBelowMinimum: "Action exceeded safe slippage parameters, please try again later",
  "0xea8d7f02": "Action exceeded safe slippage parameters, please try again later",
  MaxSlippageExceeded: "Action exceeded safe slippage parameters, please try again later",
  "51": "Supply cap exceeded",
  "insufficient liquidity": "The underlying Morpho market does not have enough liquidity to mint this amount of Leverage Tokens, please try again later"
};
