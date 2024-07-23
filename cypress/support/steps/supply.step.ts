// import constants from "../../fixtures/constans.json";

import { Address } from "viem";

// todo: rename this, reconsider params
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
) => {
  const name = "test";

  describe(`Supply process for ${name}`, () => {
    it(`Open ${name} supply popup view`, () => {
      // todo: wait for actual requests instead of hacky timeout
      cy.wait(3000);
      cy.get(`[data-cy='asset-card-${address}']`).click();
      cy.wait(3000);
      cy.setAmount(amount, isMaxAmount);
      cy.wait(3000);
      cy.doConfirm(hasApproval);
    });
  });
};
