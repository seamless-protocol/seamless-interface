import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { Modal, Icon, ModalHandles, useFullTokenData, Typography } from "@shared";
import { AssetPicker } from "./AssetPicker";
import { useAssetPickerState } from "../hooks/useAssetPickerState";

export const AssetButton = () => {
  const modalRef = useRef<ModalHandles | null>(null);
  const { asset, isStrategy } = useAssetPickerState({});
  const { data: tokenData } = useFullTokenData(asset);

  useEffect(() => {
    modalRef.current?.close();
  }, [asset, isStrategy]);

  return (
    <Modal
      ref={modalRef}
      buttonProps={{
        children: (
          <div className="flex justify-between min-w-28 min-h-7 space-x-2 border rounded-lg p-1 hover:bg-neutral-50">
            {tokenData?.logo && <Icon width={18} src={tokenData?.logo} alt="input-field-asset" />}
            <Typography type="bold3">{tokenData?.symbol || "Choose asset"}</Typography>
            <ChevronDownIcon width={12} />
          </div>
        ),
      }}
    >
      <div className="mx-[-24px] mt-[-80px]">
        <AssetPicker />
      </div>
    </Modal>
  );
};
