import {
  Buttonv2,
  DisplayTokenAmount,
  ExternalLink,
  FlexCol,
  FlexRow,
  formatAddressToDisplayable,
  Typography,
} from "@shared";
import { delegateUrl, RouterConfig } from "@router";
import { Link } from "react-router-dom";
import { DelegateModal } from "./DelegateModal";
import { useFetchDelegates } from "../../../../data/governance/queries/delegates/FetchDelegates.hook";

export const DelegatedPowerCard = () => {
  return (
    <div>
      <div className="p-10 flex flex-col bg-neutral-0 rounded-xl gap-5 border border-b-100 h-full justify-between">
        <FlexCol className="gap-10">
          <FlexCol className="gap-4">
            <Typography type="bold5">Delegated power</Typography>

            <Typography type="regular3">
              All SEAM tokens have voting power, but in order to activate this voting power, SEAM/esSEAM/stkSEAM must
              first be delegated. <br />
              <br /> Note: Delegation does not transfer token ownership, it only grants “Voting Power” to the delegated
              address. You can either self-delegate or delegate this voting power to others and you can change your
              delegation at anytime. <br />
              <br />
              To view active community members who are interested in receiving delegation, click{" "}
              <Link to={delegateUrl} className="underline text-blue-700" target="_blank" rel="noopener noreferrer">
                here
              </Link>
              .
            </Typography>
          </FlexCol>
          <Typography type="medium3">
            <LocalVotesPowerText />
          </Typography>
          <LocalModalSwitcher />
        </FlexCol>
      </div>
    </div>
  );
};

const LocalModalSwitcher = () => {
  const { data: { hasDelegatedAny } = {}, ...rest } = useFetchDelegates();

  if (rest.isLoading) return <Buttonv2 loading>Delegate</Buttonv2>;
  if (rest.error) return <>Error: {rest.error.message}</>;

  if (hasDelegatedAny)
    return (
      <FlexCol className="gap-4">
        <DelegateModal isRevoking={false} />
        <DelegateModal isRevoking />
      </FlexCol>
    );

  return <DelegateModal isRevoking={false} />;
};

const LocalVotesPowerText = () => {
  const {
    data: {
      hasDelegatedAny,
      esSeamDelegatedVotingPower,
      esSEAMVotingDelegatee,
      seamDelegatedVotingPower,
      seamVotingDelegatee,
      stkSeamDelegatedVotingPower,
      stkseamVotingDelegatee,
      esSeamDelegated,
      seamDelegated,
      stkSeamDelegated,
    } = {},
    ...rest
  } = useFetchDelegates();

  if (rest.isLoading) return <>Loading...</>;
  if (rest.error) return <>Error: {rest.error.message}</>;
  if (!hasDelegatedAny)
    return (
      <>
        You have <strong>NOT</strong> delegated any SEAM/esSEAM/stkSEAM yet.
      </>
    );

  return (
    <FlexCol className="gap-2">
      {esSeamDelegated && (
        <FlexRow className="justify-between">
          <ExternalLink url={RouterConfig.Builder.baseScanAddress(esSEAMVotingDelegatee || "")}>
            <Typography type="bold3">{formatAddressToDisplayable(esSEAMVotingDelegatee)}</Typography>
          </ExternalLink>
          <DisplayTokenAmount {...esSeamDelegatedVotingPower} />
        </FlexRow>
      )}
      {seamDelegated && (
        <FlexRow className="justify-between">
          <ExternalLink url={RouterConfig.Builder.baseScanAddress(seamVotingDelegatee || "")}>
            <Typography type="bold3">{formatAddressToDisplayable(seamVotingDelegatee)}</Typography>
          </ExternalLink>
          <DisplayTokenAmount {...seamDelegatedVotingPower} />
        </FlexRow>
      )}
      {stkSeamDelegated && (
        <FlexRow className="justify-between">
          <ExternalLink url={RouterConfig.Builder.baseScanAddress(stkseamVotingDelegatee || "")}>
            <Typography type="bold3">{formatAddressToDisplayable(stkseamVotingDelegatee)}</Typography>
          </ExternalLink>
          <DisplayTokenAmount {...stkSeamDelegatedVotingPower} />
        </FlexRow>
      )}
    </FlexCol>
  );
};
