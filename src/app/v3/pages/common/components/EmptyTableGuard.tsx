import notConnectedImage from "@assets/common/not-connected.svg";
import { Displayable, FlexCol, Image, Typography } from "@shared";
import { Link } from "react-router-dom";
import { RouterConfig } from "@router";

export const NoPositionsDefaultTableBody: React.FC = () => {
  return (
    <FlexCol className="gap-2 justify-center items-center">
      <Typography type="bold5">You have no positions.</Typography>
      <Typography type="medium3">
        Go to{" "}
        <Link className="underline" to={RouterConfig.Routes.leverageTokenTab}>
          Leverage Tokens tab
        </Link>{" "}
        or{" "}
        <Link className="underline" to={RouterConfig.Routes.morphoVaultsTab}>
          Vaults tab
        </Link>{" "}
        to create a new position!
      </Typography>
    </FlexCol>
  );
};

export const NoRewardsDefaultTableBody: React.FC = () => {
  return (
    <FlexCol className="gap-2 justify-center items-center">
      <Typography type="bold5">There are no rewards configured at the moment.</Typography>
      <Typography type="medium3">Please come back later</Typography>
    </FlexCol>
  );
};

export const EmptyTableGuard: React.FC<{
  numberOfStrategiesDisplayable: Displayable<number>;
  children: React.ReactNode;
  noPositionsBody?: React.ReactNode;
}> = ({ numberOfStrategiesDisplayable, children, noPositionsBody = <NoPositionsDefaultTableBody /> }) => {
  const { data, ...rest } = numberOfStrategiesDisplayable;
  if (data > 0) {
    return <>{children}</>;
  }

  if (!rest.isFetched || rest.isLoading)
    return (
      <FlexCol className="justify-center items-center">
        <div className="loading loading-spinner flex self-center min-h-40" />
      </FlexCol>
    );

  if (rest.error) {
    return (
      <FlexCol className="justify-center items-center gap-8 py-14">
        <Image src={notConnectedImage} alt="no-strategies" width={160} height={160} />
        <Typography className="text-error-light" type="bold1">
          Error while fetching rewards:
        </Typography>
        <Typography className="text-error-light" type="bold3">
          {rest?.error?.message}
        </Typography>
      </FlexCol>
    );
  }

  return (
    <FlexCol className=" justify-center items-center gap-8 py-14">
      <Image src={notConnectedImage} alt="no-strategies" width={160} height={160} />
      {noPositionsBody}
    </FlexCol>
  );
};
