import { BaseError, ContractFunctionRevertedError } from "viem";

/**
 * @dev utility function to parse error
 * @param e - error object
 * @returns {string} parsed error string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParsedError = (error: any | BaseError): string => {
  let message =
    "An unknown error occurred, use the Support channel in Discord for assistance.";

  const revertedError = error?.walk
    ? error.walk((err: unknown) => err instanceof ContractFunctionRevertedError)
    : null;

  if (revertedError instanceof ContractFunctionRevertedError) {
    const errorKey =
      revertedError.data?.errorName ?? revertedError.signature ?? "";
    console.log({ revertedError });
    message = errorMapping[errorKey] ?? message;
  } else if (error.shortMessage) {
    message = error.shortMessage;
  } else if (error.details) {
    message = error.details;
  } else if (error.message) {
    message = error.message;
  }

  return message;
};

export const errorMapping: Record<string, string> = {
  EnforcedPause: "Temporary pause in effect, please check Discord for updates.",
  ErrorNotEnoughAllowance:
    "Not enough allowance, did you approve your tokens first?",
  "0xc2139725": "This ILM is currently at capacity, please try again later",
  ERC4626ExceededMaxDeposit:
    "This ILM is currently at capacity, please try again later",
};
