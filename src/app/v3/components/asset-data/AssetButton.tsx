import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { Modal, Icon, ModalHandles, Typography } from "@shared";
import { AssetPickerStateHookProps, useAssetPickerState } from "../../hooks/useAssetPickerState";
import { useFullTokenData } from "../../../statev3/common/meta-data-queries/useFullTokenData";
import { StrategyState } from "../../../statev3/common/types/StateTypes";

export const AssetButton: React.FC<AssetPickerStateHookProps> = ({ overrideUrlSlug }) => {
  const modalRef = useRef<ModalHandles | null>(null);
  const { asset, assetState } = useAssetPickerState({ overrideUrlSlug });
  const { data: tokenData } = useFullTokenData(
    assetState?.isStrategy ? (assetState as StrategyState).underlyingAsset.address : asset
  );

  useEffect(() => {
    modalRef.current?.close();
  }, [asset]);

  return (
    <Modal
      ref={modalRef}
      buttonProps={{
        children: (
          <div
            className="flex justify-between min-w-28 
          min-h-7 space-x-2 pl-2
          border rounded-lg p-1 hover:bg-neutral-50"
          >
            {tokenData?.logo && <Icon width={18} src={tokenData?.logo} alt="input-field-asset" />}
            <Typography type="bold3">{tokenData?.symbol || "Choose strategy"}</Typography>
            <ChevronDownIcon width={12} />
          </div>
        ),
      }}
    >
      <div className="mx-[-22px]">todo asset picker</div>
    </Modal>
  );
};
