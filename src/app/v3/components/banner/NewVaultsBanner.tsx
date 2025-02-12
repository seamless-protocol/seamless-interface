import { FlexRow } from "@shared";
import { RouterConfig } from "@router";
import { Link } from "react-router-dom";

export const NewVaultsBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-[#5CDBF0] rounded-[100px] text-black">
          <FlexRow className="md:gap-1 gap-4 items-center justify-center w-full">
            <p className="text-bold3">
              🦋 ✨ Seamless ETH, USDC & cbBTC Vaults are live on Based Morpho with SEAM emissions{" "}
              <Link className="text-bold3 underline" to={RouterConfig.Routes.morphoVaultsTab}>
                here
              </Link>
              ! ✨ 🦋
            </p>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
