describe("Home should exist", () => {
  it("clicks the home element", () => {
    cy.visit("/");
    cy.get(`[data-cy='home']`, { timeout: 10000 }).click();
  });
});
