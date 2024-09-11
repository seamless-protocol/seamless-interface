export const withdraw = ({ amount, isMaxAmount = true }: { amount?: number; isMaxAmount?: boolean }) => {
  const name = "test";

  describe(`Withdraw process for ${name}`, () => {
    it(`Open ${name} withdraw popup view`, () => {
      // todo: wait for actual requests instead of hacky timeout
      cy.get(`[data-cy='withdraw-button']`).click();
      cy.wait(4000);
      cy.setAmount(amount, isMaxAmount);
      cy.wait(4000);
      cy.doWithdrawSubmit();
      cy.get('[data-cy="notification-success-icon"]', { timeout: 20000 }).should("be.visible");
      cy.wait(5000);
    });
  });
};
