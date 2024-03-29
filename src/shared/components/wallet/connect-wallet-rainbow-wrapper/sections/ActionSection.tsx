import { DocumentDuplicateIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { FlexCol } from "../../../containers/FlexCol";
import { ActionButton } from "../components/ActionButton";
import { useConnectButtonContext } from "../../../../contexts/connect-wallet/useConnectButtonContext";

export const ActionSection: React.FC = () => {
  const { handleCopyAddressClick, handleViewItOnExplorer } = useConnectButtonContext();

  return (
    <FlexCol className="gap-2 py-1 md:text-primary-dark text-primary-contrast">
      <ActionButton
        handleClick={handleCopyAddressClick}
        text="Copy address"
        icon={<DocumentDuplicateIcon width={20} />}
      />
      <ActionButton
        handleClick={handleViewItOnExplorer}
        text="View on Explorer"
        icon={<ArrowTopRightOnSquareIcon width={20} />}
      />
    </FlexCol>
  );
};
