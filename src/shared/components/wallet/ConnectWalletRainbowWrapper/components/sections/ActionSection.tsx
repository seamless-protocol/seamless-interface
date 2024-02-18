import {
  ClockIcon,
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { FlexCol } from "../../../../containers/FlexCol";
import { ActionButton } from "../ActionButton";
import { useAccount } from "wagmi";
import { RouterConfig } from "../../../../../../app/router";

export const ActionSection: React.FC<{
  setIsDropdownVisible: (value: boolean) => void;
}> = ({ setIsDropdownVisible }) => {
  const { address } = useAccount();

  const handleCopyAddressClick = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
      } catch (error) {
        console.error("Failed to copy address:", error);
      }
    }
    setIsDropdownVisible(false);
  };

  const handleRedirectToTransactionHistory = () => {
    window.open(RouterConfig.Routes.transactionHistory, "_blank");
    setIsDropdownVisible(false);
  };

  const handleViewItOnExplorer = () => {
    if (!address) return;
    const url = RouterConfig.Builder.baseScan(address);
    window.open(url, "_blank");
    setIsDropdownVisible(false);
  };

  return (
    <FlexCol className="gap-2 py-1 md:text-primary-dark text-primary-contrast">
      <ActionButton
        handleClick={handleRedirectToTransactionHistory}
        text="Transaction history"
        icon={<ClockIcon width={20} />}
      />
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
