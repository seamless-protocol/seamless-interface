import { Displayable, FlexRow, Icon, ViewBigInt, ViewNumber } from "@shared";
import { getBackGroundColorBasedOnSign, getColorBasedOnSign, getSvgBasedOnSign } from "../../utils/uiUtils";

export const SignIndicatingElement: React.FC<{
  dislayable: Displayable<ViewBigInt | ViewNumber | undefined>;
  children: React.ReactNode;
  noBackground?: boolean;
}> = ({ dislayable, children, noBackground }) => {
  const { isLoading, isFetched, data } = dislayable;

  if (isLoading || !isFetched) {
    return <>{children}</>;
  }

  return (
    <FlexRow
      className={`items-center gap-1 p-2 rounded-tag
       ${noBackground ? "" : getBackGroundColorBasedOnSign(data?.value)}
      ${getColorBasedOnSign(data?.value)}`}
    >
      <Icon src={getSvgBasedOnSign(data?.value)} alt="polygon" width={16} height={16} hidden={!Number(data?.value)} />
      {children}
    </FlexRow>
  );
};
