interface AuthenticationError {
  isError: boolean;
  errorMessage: string;
}

export const getAuthenticationError = (isAuthenticated: boolean): AuthenticationError | undefined => {
  if (!isAuthenticated) {
    return {
      isError: true,
      errorMessage: "Please connect your wallet.",
    }
  }

  return undefined;
}