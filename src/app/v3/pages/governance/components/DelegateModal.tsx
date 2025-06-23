import { useRef, useState } from "react";
import {
  Modal,
  FlexCol,
  Typography,
  Buttonv2,
  ModalHandles,
  StandardTooltip,
  RHFInput,
  MyFormProvider,
  FlexRow,
  useNotificationContext,
  mergeQueryStates,
} from "@shared";
import { useForm } from "react-hook-form";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "../../../../../meta";
import { Address } from "viem";
import { useFetchSEAMAssetBalances } from "../hooks/useFetchSeamBalances";
import { useMutateDelegate } from "../../../../data/governance/mutations/useMutateDelegate";
import { useFetchDelegates } from "../../../../data/governance/queries/delegates/FetchDelegates.hook";

const useDelegateModalData = () => {
  const { data: { seamBalance, esSeamBalance, stkSeamBalance } = {}, ...rest } = useFetchSEAMAssetBalances();

  const {
    data: {
      esSEAMVotingDelegatee,
      seamVotingDelegatee,
      stkseamVotingDelegatee,
      seamDelegated,
      stkSeamDelegated,
      esSeamDelegated,
    } = {},
    ...delegRest
  } = useFetchDelegates();

  return {
    ...mergeQueryStates([rest, delegRest]),
    data: {
      seamBalance,
      esSeamBalance,
      stkSeamBalance,
      esSEAMVotingDelegatee,
      seamVotingDelegatee,
      stkseamVotingDelegatee,
      seamDelegated,
      stkSeamDelegated,
      esSeamDelegated,
    },
  };
};

export const DelegateModal: React.FC<{
  isRevoking?: boolean;
}> = ({ isRevoking }) => {
  const { showNotification } = useNotificationContext();

  const {
    data: { seamBalance, esSeamBalance, stkSeamBalance, seamDelegated, stkSeamDelegated, esSeamDelegated } = {},
    ...rest
  } = useDelegateModalData();

  const modalRef = useRef<ModalHandles | null>(null);
  const [selectedOption, setSelectedOption] = useState<Address | undefined>(undefined);

  const methods = useForm<{ delegatee: Address | undefined }>({
    defaultValues: {},
  });
  const { handleSubmit } = methods;

  const { delegateAsync, isDelegationPending } = useMutateDelegate(isRevoking, {
    onSuccess: (txHash) => {
      showNotification({
        txHash,
        content: (
          <FlexCol className="w-full items-center text-center justify-center">
            <Typography type="regular3">Voting power {isRevoking ? "revoked" : "delegated"} successfully!</Typography>
          </FlexCol>
        ),
      });
    },
    onSettled: () => {
      modalRef.current?.close();
    },
  });

  const onSubmitAsync = async (data: { delegatee: Address | undefined }) => {
    await delegateAsync({
      delegatee: data.delegatee,
      token: selectedOption,
    });
  };

  const buttonText = isRevoking ? "Revoke" : "Delegate";

  if (rest.isLoading) return <Buttonv2 loading>{buttonText}</Buttonv2>;
  if (rest.error)
    return (
      <Typography type="bold3" className="text-error-main">
        Error: {rest.error.message}
      </Typography>
    );

  return (
    <div>
      <Modal
        ref={modalRef}
        header={isRevoking ? "Revoke Voting Power" : "Delegate Voting Power"}
        size="normal"
        button={<Buttonv2 className="text-bold3 w-full">{buttonText}</Buttonv2>}
      >
        <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
          <FlexCol className="gap-8">
            <FlexCol className="gap-6">
              <FlexCol className="gap-4">
                <FlexRow className="gap-1 items-center">
                  <Typography type="bold2">Balance to delegate</Typography>
                  <StandardTooltip openOnClick={false}>
                    <div className="max-w-[400px]">
                      <Typography type="regular2">
                        Choose how much voting/proposition power to give to someone else by delegating some of your
                        SEAM, esSEAM or stkSEAM balance. Your tokens will remain in your account, but your delegate will
                        be able to vote or propose on your behalf. If your SEAM or esSEAM balance changes, your
                        delegate`s voting/proposition power will be automatically adjusted.
                      </Typography>
                    </div>
                  </StandardTooltip>
                </FlexRow>

                {/* todo proper rhf approach with radio buttons (group) */}
                {(!isRevoking || (isRevoking && seamDelegated)) && (
                  <FlexRow className="justify-between w-full">
                    <FlexRow className="gap-2 items-center">
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio"
                        onChange={() => setSelectedOption(SEAM_ADDRESS)}
                      />
                      <Typography type="bold2">SEAM</Typography>
                    </FlexRow>
                    <Typography type="bold3">{seamBalance?.tokenAmount.viewValue}</Typography>
                  </FlexRow>
                )}
                {(!isRevoking || (isRevoking && esSeamDelegated)) && (
                  <FlexRow className="justify-between w-full">
                    <FlexRow className="gap-2 items-center">
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio"
                        onChange={() => setSelectedOption(ESSEAM_ADDRESS)}
                      />
                      <Typography type="bold2">esSEAM</Typography>
                    </FlexRow>
                    <Typography type="bold3">{esSeamBalance?.tokenAmount.viewValue}</Typography>
                  </FlexRow>
                )}

                {(!isRevoking || (isRevoking && stkSeamDelegated)) && (
                  <FlexRow className="justify-between w-full">
                    <FlexRow className="gap-2 items-center">
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio"
                        onChange={() => setSelectedOption(STAKED_SEAM_ADDRESS)}
                      />
                      <Typography type="bold2">stkSEAM</Typography>
                    </FlexRow>
                    <Typography type="bold3">{stkSeamBalance?.tokenAmount.viewValue}</Typography>
                  </FlexRow>
                )}

                {/* removed from MVP version */}
                {/* <FlexRow className="justify-between w-full">
                  <FlexRow className="gap-2 items-center">
                    <input type="radio" name="radio-1" className="radio" onChange={() => setSelectedOption("all")} />
                    <Typography type="bold2">All</Typography>
                  </FlexRow>
                  <Typography type="bold3">{sum?.tokenAmount.viewValue}</Typography>
                </FlexRow> */}

                {!isRevoking && (
                  <FlexCol className="gap-2">
                    <Typography type="medium3">Recipient address</Typography>
                    <div className="border border-neutral-100 rounded-2xl p-4">
                      <RHFInput required name="delegatee" placeholder="0x0...00" className="w-full" />
                    </div>
                  </FlexCol>
                )}
              </FlexCol>

              <Buttonv2 type="submit" className="text-bold3" loading={isDelegationPending}>
                {buttonText}
              </Buttonv2>
            </FlexCol>
          </FlexCol>
        </MyFormProvider>
      </Modal>
    </div>
  );
};
