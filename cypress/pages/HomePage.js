
class HomePage {
  visit()            { cy.visit("/"); }
  waitForCatalog()   { cy.get(".card-title a", { timeout: 15000 }).should("be.visible"); }
  clickProduct(name) { cy.contains(".card-title a", name).click(); }
  clickPhones()      { cy.contains(".list-group-item", "Phones").click(); cy.wait(1500); }
  goToCart()         { cy.contains("#navbarExample a", "Cart").click(); }
}


module.exports = new HomePage();