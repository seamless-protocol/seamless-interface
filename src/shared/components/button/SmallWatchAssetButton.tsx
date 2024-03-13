import React from "react";
import { Typography } from "../text/Typography/Typography";
import { Tooltip } from "../tooltip/Tooltip";
import { Address } from "viem";
import { useToken } from "../../hooks/meta-data-queries/useToken";
import { useWatchAsset } from "@shared";

export const SmallWatchAssetButton: React.FC<{
  address: Address;
}> = ({ address }) => {
  const { mutateAsync } = useWatchAsset();
  const { data: tokenData } = useToken(address);

  const handleWatchAsset = async () => {
    await mutateAsync({
      address,
      ...tokenData,
    });
  };

  return (
    <Tooltip
      tooltip={<Typography type="description">Add Token To Wallet</Typography>}
      size="small"
      theme="dark"
    >
      <button
        onClick={handleWatchAsset}
        rel="noopener noreferrer"
        className="group bg-primary-main w-6 h-6 p-1 cursor-pointer rounded-full border-other-borderButton border-thin flex justify-center items-center"
      >
        <svg
          className="stroke-current text-[#b6a5a8] group-hover:text-white" // Tailwind classes for stroke color and hover effect
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 21 19"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Wallet"
        >
          <g clip-path="url(#clip0_3719_3323)" stroke-width="2">
            <path d="M17.3203 17.398H3.32031C2.78988 17.398 2.28117 17.1872 1.9061 16.8122C1.53103 16.4371 1.32031 15.9284 1.32031 15.3979V6.39795C1.32031 5.86752 1.53103 5.35881 1.9061 4.98374C2.28117 4.60866 2.78988 4.39795 3.32031 4.39795H17.3203C17.8507 4.39795 18.3595 4.60866 18.7345 4.98374C19.1096 5.35881 19.3203 5.86752 19.3203 6.39795V15.3979C19.3203 15.9284 19.1096 16.4371 18.7345 16.8122C18.3595 17.1872 17.8507 17.398 17.3203 17.398Z"></path>
            <path
              d="M14.8203 11.3979C14.6877 11.3979 14.5605 11.3453 14.4668 11.2515C14.373 11.1577 14.3203 11.0306 14.3203 10.8979C14.3203 10.7653 14.373 10.6382 14.4668 10.5444C14.5605 10.4506 14.6877 10.3979 14.8203 10.3979C14.9529 10.3979 15.0801 10.4506 15.1739 10.5444C15.2676 10.6382 15.3203 10.7653 15.3203 10.8979C15.3203 11.0306 15.2676 11.1577 15.1739 11.2515C15.0801 11.3453 14.9529 11.3979 14.8203 11.3979Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path d="M16.3203 4.39793V2.99993C16.3202 2.69343 16.2497 2.39106 16.1142 2.11615C15.9787 1.84124 15.7818 1.60116 15.5387 1.41444C15.2956 1.22773 15.0129 1.09937 14.7124 1.03929C14.4118 0.979209 14.1015 0.989009 13.8053 1.06793L2.80531 4.00093C2.37937 4.11444 2.00285 4.36549 1.7343 4.71506C1.46575 5.06462 1.32021 5.49312 1.32031 5.93393V6.39793"></path>
          </g>
          <defs>
            <clipPath id="clip0_3719_3323">
              <rect
                width="20"
                height="19"
                fill="white"
                transform="translate(0.320312)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </button>
    </Tooltip>
  );
};
