import notConnectedImage from "@assets/common/not-connected.svg";
import { FlexCol, Image, Typography } from "@shared";
import { Link } from "react-router-dom";
import { RouterConfig } from "@router";

export const NoStrategiesTableGuard: React.FC<{
  numberOfStrategies: number;
  children: React.ReactNode;
}> = ({ numberOfStrategies, children }) => {
  if (numberOfStrategies > 0) {
    return <>{children}</>;
  }

  return (
    <FlexCol className=" justify-center items-center gap-8 py-14">
      <Image src={notConnectedImage} alt="no-strategies" width={160} height={160} />
      <FlexCol className="gap-2 justify-center items-center">
        <Typography type="bold5">You have no positions.</Typography>
        <Typography type="medium3">
          Go back to{" "}
          <Link className="underline" to={RouterConfig.Routes.landingPage}>
            ILM tab
          </Link>{" "}
          to create a new position!
        </Typography>
      </FlexCol>
    </FlexCol>
  );
};
