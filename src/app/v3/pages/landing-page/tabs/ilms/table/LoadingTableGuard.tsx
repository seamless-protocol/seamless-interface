import React from "react";
import { Displayable, FlexCol } from "@shared";

export const LoadingTableGuard: React.FC<{
  loadingState: Displayable<unknown>;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  mobileLoadingComponent?: React.ReactNode;
}> = ({ loadingState, children, loadingComponent, mobileLoadingComponent }) => {
  const { isLoading, isFetched } = loadingState;

  if (isFetched || !isLoading) {
    return <>{children}</>;
  }

  const hasDesktop = Boolean(loadingComponent);
  const hasMobile = Boolean(mobileLoadingComponent);

  if (hasDesktop && hasMobile) {
    return (
      <>
        <div className="hidden md:block">{loadingComponent}</div>
        <div className="block md:hidden">{mobileLoadingComponent}</div>
      </>
    );
  }

  if (hasDesktop) {
    return (
      <>
        <div className="hidden md:block">{loadingComponent}</div>
        <div className="block md:hidden">
          <SpinnerFallback />
        </div>
      </>
    );
  }

  if (hasMobile) {
    return (
      <>
        <div className="hidden md:block">
          <SpinnerFallback />
        </div>
        <div className="block md:hidden">{mobileLoadingComponent}</div>
      </>
    );
  }

  return <SpinnerFallback />;
};

const SpinnerFallback: React.FC = () => (
  <FlexCol className="justify-center items-center">
    <div className="loading loading-spinner flex self-center min-h-40" />
  </FlexCol>
);
