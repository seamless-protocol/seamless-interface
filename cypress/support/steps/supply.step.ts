// import constants from "../../fixtures/constans.json";

import { Address } from "viem";

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
  const name = "test";

  return describe(`Supply process for ${name}`, () => {
    it(`Open ${name} supply popup view`, () => {
      cy.wait(3000);
      cy.get(`[data-cy='asset-card-${address}']`).click();
      cy.setAmount(amount, isMaxAmount);
      cy.doConfirm(hasApproval);
    });
  });
};
