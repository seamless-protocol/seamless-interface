// import constants from "../../fixtures/constans.json";

import { Address } from "viem";
import { assetsConfig, strategiesConfig } from "../../../src/app/state/settings/config";

export const supply = (
  {
    address,
    amount,
    hasApproval = true,
    isMaxAmount = false,
  }: {
    address: Address;
    amount: number;
    hasApproval: boolean;
    isMaxAmount?: boolean;
  },
  updateSkipStatus = false
) => {
  const name = assetsConfig[address]?.name || strategiesConfig[address]?.name;
  //   const _actionName = constants.actionTypes.supply;

  return describe(`Supply process for ${name}`, () => {
    it(`Open ${name} supply popup view`, () => {
      cy.get(`[data-cy='asset-card${address}']`).click();
    });
  });
};
