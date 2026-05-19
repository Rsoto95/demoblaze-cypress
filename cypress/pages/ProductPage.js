class ProductPage {
  verifyProduct(name) { 
    cy.get(".name").should("contain", name); 
}
  addToCart() {
    cy.contains("a", "Add to cart").click();
    cy.wait(2000);
  }
}



module.exports = new ProductPage();