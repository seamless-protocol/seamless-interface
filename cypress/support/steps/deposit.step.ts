// import constants from "../../fixtures/constans.json";

import { Address } from "viem";

// todo: rename this, reconsider params
export const deposit = ({
  address,
  amount,
  hasApproval = true,
  isMaxAmount = false,
}: {
  address: Address;
  amount: number;
  hasApproval: boolean;
  isMaxAmount?: boolean;
}) => {
  const name = "test";

  describe(`Supply process for ${name}`, () => {
    it(`Open ${name} supply popup view`, () => {
      // todo: wait for actual requests instead of hacky timeout
      cy.wait(3000);
      cy.get(`[data-cy='table-row-${address}']`).click();
      cy.wait(4000);
      cy.setAmount(amount, isMaxAmount);
      cy.wait(4000);
      cy.doDepositSubmit(hasApproval);
      cy.get(`[data-cy='notification-success-icon']`, { timeout: 20000 }).should("be.visible");
      cy.wait(5000);
      cy.get(`[data-cy='close-modal'']`, { timeout: 2000 }).should("be.visible").click();
    });
  });
};
