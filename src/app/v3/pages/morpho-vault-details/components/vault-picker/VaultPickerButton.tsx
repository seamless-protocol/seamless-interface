import { Address } from "viem";
import { FlexRow, Icon, Modal, ModalHandles, Typography } from "@shared";

import polygonIcon from "@assets/common/polygon-black-down.svg";
import { useRef, useEffect } from "react";
import { VaultsTableContainer } from "../../../landing-page/tabs/morpho-vaults/components/VaultsTableContainer";
import { useFetchFormattedFullVaultInfo } from "../../../../../data/morpho/full-vault-info/FullVaultInfo.hook";


export const VaultPickerButton: React.FC<{
  vault?: Address;
}> = ({ vault }) => {
  const { data: vaultData, isLoading, error } = useFetchFormattedFullVaultInfo(vault);
  const { logoURI: icon } = vaultData?.asset || {};
  const { name } = vaultData || {};
  const modalRef = useRef<ModalHandles | null>(null);

  useEffect(() => {
    modalRef.current?.close();
  }, [vault]);

  if (error) {
    return (
      <div>
        <Typography type="medium1">Error fetching vault info</Typography>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <Typography type="medium1">Loading vault info...</Typography>
      </div>
    )
  }

  return (
    <div>
      <Modal
        ref={modalRef}
        header="Pick another Vault"
        size="biger"
        button={
          <button>
            <FlexRow className="bg-neutral-0 items-center p-2 rounded-[100px] border border-primary-100">
              <FlexRow className="gap-2 items-center">
                <Icon src={icon || ""} alt="strategy-icon" width={25.6} />
                <Typography type="medium1">{name}</Typography>
              </FlexRow>
              <Icon width={24} height={24} src={polygonIcon} alt="strategy-icon" className="text-black" />
            </FlexRow>
          </button>
        }
      >
        <VaultsTableContainer selectedVault={vault} />
      </Modal>
    </div>
  );
};
