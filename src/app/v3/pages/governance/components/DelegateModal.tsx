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
} from "@shared";
import { useForm } from "react-hook-form";
import { useFetchMultipleAssetBalanceUsdValues } from "../hooks/useFetchSeamBalances";

export const DelegateModal = () => {
  const { data: { sum, seamBalance, esSeamBalance, stkSeamBalance } = {}, ...rest } =
    useFetchMultipleAssetBalanceUsdValues();

  const modalRef = useRef<ModalHandles | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // eslint-disable-next-line no-console
  console.log({ selectedOption });

  const methods = useForm<FormData>({
    defaultValues: {},
  });
  const { handleSubmit } = methods;

  const onSubmitAsync = async () => {
    // eslint-disable-next-line no-console
    console.log("Delegate");
  };

  if (rest.isLoading) return <Buttonv2 loading>Delagate</Buttonv2>;
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
        header="Set up delegation"
        size="normal"
        button={<Buttonv2 className="text-bold3 w-full">Delegate</Buttonv2>}
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
                        Choose how much voting/proposition power to give to someone else by delegating some of your SEAM
                        or esSEAM balance. Your tokens will remain in your account, but your delegate will be able to
                        vote or propose on your behalf. If your SEAM or esSEAM balance changes, your delegate`s
                        voting/proposition power will be automatically adjusted.
                      </Typography>
                    </div>
                  </StandardTooltip>
                </FlexRow>

                {/* todo proper rhf approach with radio buttons (group) */}
                <FlexRow className="justify-between w-full">
                  <FlexRow className="gap-2 items-center">
                    <input type="radio" name="radio-1" className="radio" onChange={() => setSelectedOption("SEAM")} />
                    <Typography type="bold2">SEAM</Typography>
                  </FlexRow>
                  <Typography type="bold3">{seamBalance?.tokenAmount.viewValue}</Typography>
                </FlexRow>
                <FlexRow className="justify-between w-full">
                  <FlexRow className="gap-2 items-center">
                    <input type="radio" name="radio-1" className="radio" onChange={() => setSelectedOption("esSEAM")} />
                    <Typography type="bold2">esSEAM</Typography>
                  </FlexRow>
                  <Typography type="bold3">{esSeamBalance?.tokenAmount.viewValue}</Typography>
                </FlexRow>
                <FlexRow className="justify-between w-full">
                  <FlexRow className="gap-2 items-center">
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      onChange={() => setSelectedOption("stkSEAM")}
                    />
                    <Typography type="bold2">stkSEAM</Typography>
                  </FlexRow>
                  <Typography type="bold3">{stkSeamBalance?.tokenAmount.viewValue}</Typography>
                </FlexRow>

                <FlexRow className="justify-between w-full">
                  <FlexRow className="gap-2 items-center">
                    <input type="radio" name="radio-1" className="radio" onChange={() => setSelectedOption("all")} />
                    <Typography type="bold2">All</Typography>
                  </FlexRow>
                  <Typography type="bold3">{sum?.tokenAmount.viewValue}</Typography>
                </FlexRow>

                <FlexCol className="gap-2">
                  <Typography type="medium3">Recipient address</Typography>
                  <div className="border border-neutral-100 rounded-2xl p-4">
                    <RHFInput name="delegateAddress" placeholder="0x0...00" className="w-full" />
                  </div>
                </FlexCol>
              </FlexCol>

              <Buttonv2 className="text-bold3" loading={false}>
                Delegate
              </Buttonv2>
            </FlexCol>
          </FlexCol>
        </MyFormProvider>
      </Modal>
    </div>
  );
};
