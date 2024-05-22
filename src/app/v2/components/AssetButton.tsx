import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { Modal, Icon, ModalHandles, useFullTokenData, Typography } from "@shared";
import { AssetPicker } from "./AssetPicker";
import { AssetPickerStateHookProps, useAssetPickerState } from "../hooks/useAssetPickerState";

export const AssetButton: React.FC<AssetPickerStateHookProps> = ({ overrideUrlSlug }) => {
  const modalRef = useRef<ModalHandles | null>(null);
  const { asset, isStrategy } = useAssetPickerState({ overrideUrlSlug });
  const { data: tokenData } = useFullTokenData(asset);

  useEffect(() => {
    modalRef.current?.close();
  }, [asset, isStrategy]);

  return (
    <Modal
      ref={modalRef}
      className="min-h-64"
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
      <div className="mx-[-24px]">
        <AssetPicker overrideUrlSlug={overrideUrlSlug} />
      </div>
    </Modal>
  );
};
