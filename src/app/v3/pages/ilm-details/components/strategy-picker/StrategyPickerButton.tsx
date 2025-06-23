import { Address } from "viem";
import { FlexRow, Icon, Modal, ModalHandles, Typography } from "@shared";

import polygonIcon from "@assets/common/polygon-black-down.svg";
import { LeverageTokensTableContainer } from "../../../landing-page/tabs/ilms/table/IlmTableContainer";
import { useRef, useEffect } from "react";
import { useFullTokenData } from "../../../../../data/common/meta-data-queries/useFullTokenData";

export const StrategyPickerButton: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  const { data: tokenData } = useFullTokenData(strategy);
  const { name, logo: icon } = tokenData || {};
  const modalRef = useRef<ModalHandles | null>(null);

  useEffect(() => {
    modalRef.current?.close();
  }, [strategy]);

  return (
    <div>
      <Modal
        ref={modalRef}
        header="Pick another strategy"
        size="biger"
        button={
          <button>
            <FlexRow className="bg-neutral-0 items-center p-2 rounded-[100px] border border-primary-100">
              <FlexRow className="gap-2 items-center">
                <Icon src={icon} alt="strategy-icon" width={25.6} />
                <Typography type="medium1">{name}</Typography>
              </FlexRow>
              <Icon width={24} height={24} src={polygonIcon} alt="strategy-icon" className="text-black" />
            </FlexRow>
          </button>
        }
      >
        <LeverageTokensTableContainer selectedLeverageToken={strategy} />
      </Modal>
    </div>
  );
};
