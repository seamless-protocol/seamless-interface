import { Address } from "viem";

export const depositExecutionReverted = ({
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

  describe(`${name} DEPOSIT process, error test`, () => {
    it(`Deposit, execution reverted`, () => {
      let approved = false;
      cy.intercept('POST', '**', (req) => {
        if (req.body.method === 'eth_sendRawTransaction') {
          if (!approved) {
            approved = true;
            req.continue();
          } else {
            req.reply({
              error: { code: -32000, message: "execution reverted" },
            });
          }
        } else {
          req.continue();
        }
      });

      cy.deposit({
        address,
        amount,
        hasApproval,
        isMaxAmount,
        shouldErrorBeThrown: true,
      });

      // Wait to cleanup everything after test
      cy.wait(1500);
    });
  });
};
