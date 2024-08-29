import { Displayable, FlexCol } from "@shared";

export const LoadingTableGuard: React.FC<{
  loadingState: Displayable<undefined>;
  children: React.ReactNode;
}> = ({ loadingState: numberOfStrategiesDisplayable, children }) => {
  const { ...rest } = numberOfStrategiesDisplayable;

  if (rest.isFetched || !rest.isLoading) return <>{children}</>;

  return (
    <FlexCol className="justify-center items-center">
      <div className="loading loading-spinner flex self-center min-h-40" />
    </FlexCol>
  );
};
