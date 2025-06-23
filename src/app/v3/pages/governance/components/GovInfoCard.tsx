import { useAccount } from "wagmi";
import {
  Buttonv2,
  Divider,
  FlexCol,
  FlexRow,
  formatAddressToDisplayable,
  Typography,
  useNotificationContext,
  useToken,
  WatchAssetComponentv2,
} from "@shared";
import { GovInfoCardDataPoint } from "./GovInfoCardDataPoint";
import { useFetchSEAMAssetBalances } from "../hooks/useFetchSeamBalances";
import { SEAM_ADDRESS } from "@meta";
import { useMutateClaimVestedEsSEAM } from "../../../../data/governance/mutations/useMutateClaimVestedEsSEAM";
import { useFetchDelegates } from "../../../../data/governance/queries/delegates/FetchDelegates.hook";
import { useFetchVestedSeam } from "../../../../data/governance/queries/vested-seam/FetchVestedSeam.hook";

export const GovInfoCard = () => {
  /* -------- */
  /*   Meta   */
  /* -------- */
  const { showNotification } = useNotificationContext();
  const { address } = useAccount();

  /* ------------- */
  /*   Queries     */
  /* ------------- */
  const { data: { seamBalance, esSeamBalance, stkSeamBalance } = {}, ...rest } = useFetchSEAMAssetBalances();
  const { data: { userVotingPower } = {}, ...delegRest } = useFetchDelegates();
  const { data: vestedSeam, ...vestedSeamRest } = useFetchVestedSeam();
  const { data: seamTokenData, error, isLoading } = useToken(SEAM_ADDRESS);

  /* ------------- */
  /*   Mutations   */
  /* ------------- */
  const { claimVestedAsync, isClaimVestedPending } = useMutateClaimVestedEsSEAM({
    onSuccess(txHash) {
      showNotification({
        txHash,
        content: (
          <FlexCol className="w-full items-center text-center justify-center">
            <Typography type="regular3">Vested Seam Claimed Successfully!</Typography>
            {error && <Typography type="regular3">Error: {error.message}</Typography>}
            {isLoading ? (
              <Typography type="regular3">Loading...</Typography>
            ) : (
              <WatchAssetComponentv2 {...seamTokenData} address={SEAM_ADDRESS} />
            )}
          </FlexCol>
        ),
      });
    },
  });

  const onClaim = async () => {
    await claimVestedAsync();
  };

  /* --------- */
  /*    JSX    */
  /* --------- */
  return (
    <div>
      <div className="p-10 flex flex-col bg-neutral-0 rounded-xl gap-5 border border-b-100 h-full justify-between">
        <FlexCol>
          <Typography type="medium3">Your address: {formatAddressToDisplayable(address)}</Typography>
        </FlexCol>
        <Divider />
        <FlexRow className="justify-between">
          <GovInfoCardDataPoint
            label="Voting power"
            tooltip={
              <>
                Your voting power is based on the amount of SEAM + esSEAM + stkSEAM <br /> that has been delegated to
                you (you must delegate to yourself to vote with your balance). <br /> Use it to vote for or against
                active proposals.
              </>
            }
            viewValue={userVotingPower?.viewValue}
            {...delegRest}
          />

          <GovInfoCardDataPoint label="SEAM" viewValue={seamBalance?.tokenAmount.viewValue} {...rest} />

          <GovInfoCardDataPoint label="esSEAM" viewValue={esSeamBalance?.tokenAmount.viewValue} {...rest} />

          <GovInfoCardDataPoint label="stkSEAM" viewValue={stkSeamBalance?.tokenAmount.viewValue} {...rest} />
        </FlexRow>
        <Divider />

        <FlexRow className="justify-between items-center">
          <GovInfoCardDataPoint
            tooltip={<>Amount of esSEAM that has vested and is claimable as SEAM.</>}
            label="Claimable SEAM"
            viewValue={vestedSeam?.viewValue}
            {...vestedSeamRest}
          />

          <Buttonv2
            className="w-1/2 text-bold3"
            disabled={(vestedSeam?.bigIntValue ?? 0n) < 1n}
            loading={isClaimVestedPending}
            onClick={onClaim}
          >
            Claim
          </Buttonv2>
        </FlexRow>
      </div>
    </div>
  );
};
