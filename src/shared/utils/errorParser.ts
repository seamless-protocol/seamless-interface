import { BaseError, ContractFunctionRevertedError } from "viem";

/**
 * @dev utility function to parse error
 * @param e - error object
 * @returns {string} parsed error string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParsedError = (error: any | BaseError): string => {
  let message = error.shortMessage ?? "An unknown error occurred.";

  if (error as BaseError) {
    const revertError = error?.walk(
      (err: unknown) => err instanceof ContractFunctionRevertedError
    );
    if (revertError instanceof ContractFunctionRevertedError) {
      const errorName = revertError.data?.errorName ?? "";
      if (errorMapping[errorName]) return errorMapping[errorName];
    }
    if (error.details) {
      message = error.details;
    } else if (error.shortMessage) {
      message = error.shortMessage;
    } else {
      message =
        "An unknown error occurred, use the Support channel in Discord for assistance.";
    }
  }

  return message;
};

export const errorMapping: Record<string, string> = {
  EnforcedPause: "Temporary pause in effect, please check Discord for updates.",
  ErrorNotEnoughAllowance:
    "Not enough allowance, did you approve your tokens first?",
};
