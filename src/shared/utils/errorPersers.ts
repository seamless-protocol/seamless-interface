interface CustomError {
  details?: string;
  shortMessage?: string;
  cause?: {
    data?: {
      errorName?: string;
    };
    name?:
      | "ContractFunctionZeroDataError"
      | "ContractFunctionRevertedError"
      | string;
  };
}

/**
 * @dev utility function to parse error
 * @param e - error object
 * @returns {string} parsed error string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParsedError = (e: any | CustomError): string => {
  let message = e.shortMessage ?? "An unknown error occurred";

  const error = e as CustomError;
  if (error) {
    if (e.cause?.data?.errorName && errorMapping[e.cause?.data?.errorName]) {
      message = errorMapping[e.cause?.data?.errorName];
    } else if (e.cause?.name && errorMapping[e.cause?.name]) {
      message = errorMapping[e.cause?.name];
    } else if (error.details) {
      message = error.details;
    } else if (error.shortMessage) {
      message = error.shortMessage;
    } else {
      message =
        "Unknown error, feel free to report this to our discord channel.";
    }
  }

  return message;
};

export const errorMapping: Record<string, string> = {
  ContractFunctionZeroDataError:
    "Contract not found! Make sure you are on correct chain.",
  EnforcedPause: "Temporary pause in effect, please check Discord for updates.",
  ErrorNotEnoughAllowance:
    "Not enough allowance, did you approve your tokens first?",
};
