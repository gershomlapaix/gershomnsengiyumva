describe("Should come to login", () => {
  it("Directs On Home page", () => {
    cy.visit("http://localhost:3000/home");

    cy.get("input#username").type("gershom");
    cy.get("input#meter").type("17939");

    cy.get("button").click();
    cy.url().should("eq", "http://localhost:3000/home");

    cy.get("div.App")
      .should("be.visible")
      .within(() => {
        cy.get("a").click();

        cy.url().should("eq", "http://localhost:3000/transactions");
      });
  });
});
