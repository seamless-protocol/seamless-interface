import { Displayable, FlexRow, Icon, ViewBigInt } from "@shared";
import { getBackGroundColorBasedOnSign, getColorBasedOnSign, getSvgBasedOnSign } from "../../utils/uiUtils";

export const SignIndicatingElement: React.FC<{
  dislayable: Displayable<ViewBigInt>;
  children: React.ReactNode;
}> = ({ dislayable, children }) => {
  const { isLoading, isFetched, data } = dislayable;

  if (isLoading || !isFetched) {
    return <>{children}</>;
  }

  return (
    <FlexRow
      className={`items-center gap-1 p-2 rounded-tag
      ${getBackGroundColorBasedOnSign(data.value)}
      ${getColorBasedOnSign(data.value)}`}
    >
      <Icon src={getSvgBasedOnSign(data.value)} alt="polygon" width={16} height={16} hidden={!data.bigIntValue} />
      {children}
    </FlexRow>
  );
};
