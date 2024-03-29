import { ModalBody } from "../modal/ModalBody";

import { TNotificationProps } from "../../types/INotification";
import { ENUM_COLORS, ENUM_MESSAGES, ENUM_STATUSES } from "./mapper";
import { Icon } from "../images/Icon";
import { FlexCol } from "../containers/FlexCol";
import { Button } from "../button/Button";
import { FlexRow } from "../containers/FlexRow";
import { RouterConfig } from "../../../app/router";

import externalLinkIcon from "@assets/common/external-link.svg";
import { Typography } from "../text/Typography/Typography";

interface Props extends TNotificationProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DisplayNotification = ({ content, status, icon, txHash, setModalOpen }: Props) => {
  return (
    <ModalBody setModalOpen={setModalOpen}>
      <FlexCol className="items-center gap-2">
        <FlexCol className="items-center gap-6">
          <div className={`${status ? ENUM_COLORS[status] : ""} p-3 rounded-full`}>
            {icon || (status ? ENUM_STATUSES[status] : null)}
          </div>

          <Typography type="main21">{status ? ENUM_MESSAGES[status] : "Invalid status."}</Typography>
        </FlexCol>

        <div>{content}</div>

        <FlexCol className="w-full gap-2 mt-4">
          {status === "success" && txHash && (
            <FlexRow className="justify-between items-center">
              <span />
              <a href={RouterConfig.Builder.baseScanTx(txHash || "")} target="_blank" rel="noreferrer">
                <FlexRow className="justify-between items-center gap-0.5">
                  <Typography type="subheader2">Review tx details</Typography>
                  <Icon src={externalLinkIcon} alt="external-link" width={12} height={12} />
                </FlexRow>
              </a>
            </FlexRow>
          )}
          <Button fullWidth onClick={() => setModalOpen(false)}>
            <Typography type="buttonM">Ok, Close</Typography>
          </Button>
        </FlexCol>
      </FlexCol>
    </ModalBody>
  );
};
