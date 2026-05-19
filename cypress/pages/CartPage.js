class CartPage {
  waitForCart()       { cy.get("#tbodyid", { timeout: 15000 }).should("be.visible"); }
  verifyProduct(name) { cy.get("#tbodyid").should("contain", name); }
  clickPlaceOrder()   { cy.contains("button", "Place Order").click(); }
  verifyOrderModal()  { cy.get("#orderModal").should("be.visible"); }

  fillForm({ name, country, city, card, month, year }) {
    cy.get("#name").type(name);
    cy.get("#country").type(country);
    cy.get("#city").type(city);
    cy.get("#card").type(card);
    cy.get("#month").type(month);
    cy.get("#year").type(year);
  }

  confirmPurchase(){ cy.contains("#orderModal button", "Purchase").click(); }

  verifySuccess() {
    cy.get(".sweet-alert", { timeout: 15000 }).should("be.visible");
    cy.get(".sweet-alert h2").should("contain", "Thank you for your purchase!");
  }

  closeConfirmation() { cy.contains(".sweet-alert button", "OK").click(); }
}


module.exports = new CartPage();