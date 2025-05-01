import { Displayable, FlexRow, Icon, ViewBigInt } from "@shared";
import { getBackGroundColorBasedOnSign, getColorBasedOnSign, getSvgBasedOnSign } from "../../utils/uiUtils";

export const SignIndicatingElement: React.FC<{
  dislayable: Displayable<ViewBigInt>;
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
       ${noBackground ? "" : getBackGroundColorBasedOnSign(data.value)}
      ${getColorBasedOnSign(data.value)}`}
    >
      <Icon src={getSvgBasedOnSign(data.value)} alt="polygon" width={16} height={16} hidden={!data.bigIntValue} />
      {children}
    </FlexRow>
  );
};

export const SignIndicatingElementv2: React.FC<{
  dislayable: Displayable<{
    hasValue?: boolean;
    value?: number | string;
  }>;
  children: React.ReactNode;
  noBackground?: boolean;
}> = ({ dislayable, children, noBackground }) => {
  const {
    isLoading,
    isFetched,
    data: { value, hasValue },
  } = dislayable;

  if (isLoading || !isFetched) {
    return <>{children}</>;
  }

  return (
    <FlexRow
      className={`items-center gap-1 p-2 rounded-tag
       ${noBackground ? "" : getBackGroundColorBasedOnSign(value)}
      ${getColorBasedOnSign(value)}`}
    >
      <Icon src={getSvgBasedOnSign(value)} alt="polygon" width={16} height={16} hidden={!hasValue} />
      {children}
    </FlexRow>
  );
};
