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
      cy.deposit({
        address,
        amount,
        hasApproval,
        isMaxAmount,
      });

      cy.withdraw({
        amount,
        isMaxAmount: true,
      });
    });
  });
};
