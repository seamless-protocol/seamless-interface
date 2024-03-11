import { BaseError, ContractFunctionRevertedError } from "viem";

const defaultMessage =
  "An unknown error occurred, use the Support channel in Discord for assistance.";

/**
 * Checks if the message should have an additional error explanation appended.
 * @param message - The error message to check.
 * @param errorKey - The error key to append if conditions are met.
 * @returns {string} - The potentially modified message.
 */
const appendWithErrorType = (message: string, errorKey: string): string => {
  const contractFunctionReverted = /^The contract function "(.*)" reverted/;
  const executionRevertedRegex = /^Execution reverted\.?$/;
  if (
    contractFunctionReverted.test(message) ||
    executionRevertedRegex.test(message) ||
    message === defaultMessage
  ) {
    return `${message} - Operation Unsuccessful Due to: [${errorKey}] error.`;
  }
  return message;
};

/**
 * @dev utility function to parse error
 * @param e - error object
 * @returns {string} parsed error string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParsedError = (error: any | BaseError): string => {
  let message = defaultMessage;
  let errorKey = "";

  const revertedError = error?.walk
    ? error.walk((err: unknown) => err instanceof ContractFunctionRevertedError)
    : null;
  if (revertedError instanceof ContractFunctionRevertedError) {
    errorKey = revertedError.data?.errorName ?? revertedError.signature ?? "";
    if (errorMapping[errorKey]) return errorMapping[errorKey];
  }

  message = error.shortMessage || error.details || error.message || message;

  return appendWithErrorType(message, errorKey);
};

export const errorMapping: Record<string, string> = {
  EnforcedPause: "Temporary pause in effect, please check Discord for updates.",
  ErrorNotEnoughAllowance:
    "Not enough allowance, did you approve your tokens first?",
  "0xc2139725": "Not enough allowance, did you approve your tokens first?",
  ERC4626ExceededMaxDeposit:
    "This ILM is currently at capacity, please try again later",
  SharesReceivedBelowMinimum:
    "Action exceeded safe slippage parameters, please try again later",
};
