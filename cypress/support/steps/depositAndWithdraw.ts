import { Address } from "viem";

export const depositAndWithdraw = ({
  address,
  amount,
  hasApproval = false,
  isMaxAmount = false,
  tab,
  skipWithdraw = false,
  depositNativeETH = false,
}: {
  address: Address;
  amount: number;
  hasApproval: boolean;
  isMaxAmount?: boolean;
  tab?: string;
  skipWithdraw?: boolean;
  depositNativeETH?: boolean;
}) => {
  const name = "test";

  describe(`${name} DEPOSIT & WITHDRAW process`, () => {
    it(`Deposit and Withdraw`, () => {
      cy.deposit({
        address,
        amount,
        hasApproval,
        isMaxAmount,
        tab,
        depositNativeETH,
      });

      if (!skipWithdraw) {
        cy.withdraw({
          amount,
          isMaxAmount: true,
        });
      }

      // Wait to cleanup everything after test
      cy.wait(1500);
    });
  });
};
