import { Displayable, FlexCol } from "@shared";

export const LoadingTableGuard: React.FC<{
  loadingState: Displayable<undefined>;
  children: React.ReactNode;
}> = ({ loadingState: numberOfStrategiesDisplayable, children }) => {
  const { ...rest } = numberOfStrategiesDisplayable;

  return (
    <FlexCol className=" justify-center items-center gap-8 py-14">
      {rest.isFetched || !rest.isLoading ? (
        <>{children}</>
      ) : (
        <div className="loading loading-spinner flex self-center min-h-40" />
      )}
    </FlexCol>
  );
};
