import { ModalBody } from "../modal/ModalBody";

import { TNotificationProps } from "../../types/INotification";
import { ENUM_COLORS, ENUM_STATUSES } from "./mapper";
import { Icon } from "../images/Icon";
import { FlexCol } from "../containers/FlexCol";
import { Typography } from "../text/Typography/Typography";
import { Button } from "../button/Button";
import { FlexRow } from "../containers/FlexRow";
import { Link } from "react-router-dom";
import { RouterConfig } from "../../../app/router";

import externalLinkIcon from "../../../assets/common/external-link.svg";

interface Props extends TNotificationProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DisplayNotification = ({
  content,
  status,
  icon,
  txHash,
  setModalOpen,
}: Props) => {
  console.log({ txHash });
  const statusIcon = icon || ENUM_STATUSES[status];

  return (
    <ModalBody setModalOpen={setModalOpen}>
      <FlexCol className="items-center gap-4">
        <div className={`${ENUM_COLORS[status]} p-3 rounded-full`}>
          <Icon src={statusIcon} alt={status} />
        </div>

        <Typography type="main21">All Done!</Typography>

        <div>{content}</div>

        <FlexCol className="w-full gap-2">
          <FlexRow className="justify-between items-center">
            <span />
            <Link
              to={RouterConfig.Builder.etherScan(txHash || "")}
              target="_blank"
            >
              <FlexRow className="justify-between items-center gap-0.5">
                <Typography type="subheader2">Review tx details</Typography>
                <Icon
                  src={externalLinkIcon}
                  alt="external-link"
                  width={12}
                  height={12}
                />
              </FlexRow>
            </Link>
          </FlexRow>
          <Button fullWidth onClick={() => setModalOpen(false)}>
            Ok, Close
          </Button>
        </FlexCol>
      </FlexCol>
    </ModalBody>
  );
};
