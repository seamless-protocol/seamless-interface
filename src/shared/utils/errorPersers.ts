import { BaseError } from "viem";
/**
 * @dev utility function to parse error
 * @param e - error object
 * @returns {string} parsed error string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParsedError = (e: any | BaseError): string => {
  let message = e.message ?? "An unknown error occurred";

  if (e instanceof BaseError) {
    if (e.details) {
      message = e.details;
    } else if (e.shortMessage) {
      message = e.shortMessage;
    } else if (e.message) {
      message = e.message;
    } else if (e.name) {
      message = e.name;
    }
  }

  return message;
};
