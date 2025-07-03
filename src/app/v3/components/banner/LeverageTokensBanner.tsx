import { FlexRow } from "@shared";
import { RouterConfig } from "@router";
import { Link } from "react-router-dom";
import { useFetchLeverageTokenByAddress } from "../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { weeth_weth_17x_LT } from "@meta";
import { parseUnits } from "viem";

export const LeverageTokensBanner = () => {
  const { data: leverageToken, isLoading, isError } = useFetchLeverageTokenByAddress(weeth_weth_17x_LT);

  const isAtCapacity = !isLoading && !isError && leverageToken?.tokenData?.decimals && leverageToken?.tvl?.tokenAmount.bigIntValue && leverageToken?.tvl?.tokenAmount.bigIntValue > parseUnits(leverageToken?.limitsConfig.maxDeposit.toString(), leverageToken?.tokenData?.decimals);

  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-[#4F68F7] rounded-2xl md:rounded-[100px] text-white">
          <FlexRow className="md:gap-1 gap-4 items-center justify-center w-full">
            <p className="text-bold3 flex flex-col md:flex-row items-center justify-center gap-2">
              {isAtCapacity ?
                <span
                  className="inline-block bg-yellow-400 text-[#1A237E] text-bold2 px-3 py-1 rounded-full ml-0 md:ml-4 mt-2 md:mt-0 tracking-wide uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  At capacity
                </span> : null}
              <span>
                🔮 Leverage Tokens are live! The first LT: A weETH/ETH 17x Yield Loop. Check it out{" "}
                <Link className="text-bold3 underline" to={RouterConfig.Routes.leverageTokenTab}>
                  here
                </Link>
                . 🔮
              </span>
            </p>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
