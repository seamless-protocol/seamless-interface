import { Address } from "viem";

export const depositAndWithdraw = ({
  address,
  amount,
  hasApproval = false,
  isMaxAmount = false,
}: {
  address: Address;
  amount: number;
  hasApproval: boolean;
  isMaxAmount?: boolean;
}) => {
  const name = "test";

  describe(`${name} DEPOSIT & WITHDRAW process`, () => {
    it(`Deposit and Withdraw`, () => {
      // Start with the deposit process
      cy.wait(3000);
      cy.get(`[data-cy='table-row-${address}']`).click();
      cy.wait(4000);
      cy.setAmount(amount, isMaxAmount);
      cy.wait(4000);
      cy.doDepositSubmit(hasApproval);
      cy.get(`[data-cy='notification-success-icon']`, { timeout: 20000 }).should("be.visible");
      cy.wait(100);
      cy.get(`[data-cy='close-modal']`, { timeout: 2000 }).should("be.visible").click();

      // Proceed to the withdraw process
      cy.wait(3000); // Ensure there's enough time between operations
      cy.get(`[data-cy='withdraw-button']`).click();
      cy.wait(4000);
      cy.setAmount(amount, true);
      cy.wait(4000);
      cy.doWithdrawSubmit();
      cy.get('[data-cy="notification-success-icon"]', { timeout: 20000 }).should("be.visible");
      cy.wait(5000);
    });
  });
};
