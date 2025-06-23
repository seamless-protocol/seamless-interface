import {
  DisplayMoney,
  DisplayNumber,
  DisplayPercentage,
  DisplayText,
  DisplayTokenAmount,
  FlexCol,
  FlexRow,
  Icon,
  Typography,
} from "@shared";
import border from "@assets/common/border.svg";
import { Address } from "viem";
import { useFetchFormattedFullVaultInfo } from "../../../../data/morpho/full-vault-info/FullVaultInfo.hook";

const skeletonLoaderSettings = {
  width: "120px",
  height: "30px",
};

export const MorphoVaultStats: React.FC<{ vault: Address | undefined }> = ({ vault }) => {
  const { data, isLoading, error } = useFetchFormattedFullVaultInfo(vault);
  const { totalSupply, totalAssetsUsd, curator, feePercentage, timelock } = data || {};

  return (
    <div className="flex md:flex-row flex-col w-full rounded-card bg-neutral-0 py-8 pl-6 md:min-h-36 gap-5">
      <FlexRow className="md:w-1/4 justify-between">
        <FlexCol className="justify-between ">
          <Typography type="medium2" className="text-primary-600">
            TVL
          </Typography>
          <FlexCol>
            <DisplayTokenAmount
              {...totalSupply}
              isLoading={isLoading}
              errorMessage={error?.message}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              viewValue={totalAssetsUsd}
              isLoading={isLoading}
              errorMessage={error?.message}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/4 justify-between">
        <FlexCol className="max-w-max justify-between">
          <Typography type="medium2" className="text-primary-600">
            Curators
          </Typography>
          <FlexRow className="gap-2">
            <Icon src={curator?.icon || ""} alt="curator-icon" width={20} />
            <DisplayText
              viewValue={curator?.name}
              isLoading={isLoading}
              errorMessage={error?.message}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexRow>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/4 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium2" className="text-primary-600 md:max-w-20">
            Performance fee
          </Typography>
          <DisplayPercentage
            viewValue={feePercentage}
            isLoading={isLoading}
            errorMessage={error?.message}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/4">
        <FlexCol className="justify-between">
          <Typography type="medium2" className="text-primary-600  md:max-w-20">
            Risk Curator Timelock Period
          </Typography>
          <DisplayNumber
            viewValue={timelock}
            isLoading={isLoading}
            errorMessage={error?.message}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </FlexCol>
      </FlexRow>
    </div>
  );
};
