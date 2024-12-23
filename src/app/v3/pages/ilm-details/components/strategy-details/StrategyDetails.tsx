import { useParams } from "react-router-dom";
import { Address } from "viem";
import { cbBTCLong_1_5x, cbBTCLong_3x, ethLong_1_5x, ethLong_3x, ethShort_ADDRESS_1_5_x, weETHBooster_3x, wstETHBooster_3x } from "@meta";
import { EthLong1_5xDetails } from "./details-per-strategy/EthLong1_5xDetails";
import { EthLong3xDetails } from "./details-per-strategy/EthLong3xDetails";
import { EthShort1_5xDetails } from "./details-per-strategy/EthShort1_5xDetails";
import { WstETHBooster3xDetails } from "./details-per-strategy/WstETHBooster3xDetails";
import { CbBtcLong1_5xDetails } from "./details-per-strategy/CbBtcLong1_5xDetails";
import { CbBtcLong3xDetails } from "./details-per-strategy/CbBtcLong3xDetails";
import { weETHBooster_3xDetails } from "./details-per-strategy/weETHBooster_3xDetails";

const DetailsDictionary = {
  [ethLong_1_5x]: EthLong1_5xDetails,
  [ethLong_3x]: EthLong3xDetails,
  [ethShort_ADDRESS_1_5_x]: EthShort1_5xDetails,
  [wstETHBooster_3x]: WstETHBooster3xDetails,
  [cbBTCLong_1_5x]: CbBtcLong1_5xDetails,
  [cbBTCLong_3x]: CbBtcLong3xDetails,
  [weETHBooster_3x]: weETHBooster_3xDetails,
}

export const StrategyDetails = () => {
  const { address } = useParams<{ address: string }>();
  const strategy = address as Address | undefined;

  const Details = strategy ? DetailsDictionary[strategy] : undefined;

  return (
    (Details && strategy) ? <Details strategy={strategy} /> : <div>Strategy details not configured</div>
  );
};
