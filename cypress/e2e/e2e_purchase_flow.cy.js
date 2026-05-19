const homePage    = require("../pages/HomePage");
const productPage = require("../pages/ProductPage");
const cartPage    = require("../pages/CartPage");

describe("Flujo de Compra - DemoBlaze", () => {

  beforeEach(() => {
    cy.on("window:alert", () => true);
    cy.on("window:confirm", () => true);
  });

  it("Debe agregar dos productos al carrito, llenar el formulario y completar la compra", () => {
    cy.fixture("orderData").then((order) => {

      homePage.visit();
      homePage.waitForCatalog();
      homePage.clickProduct(order.products[0]);
      productPage.verifyProduct(order.products[0]);
      productPage.addToCart();

      homePage.visit();
      homePage.waitForCatalog();
      homePage.clickPhones();
      homePage.clickProduct(order.products[1]);
      productPage.verifyProduct(order.products[1]);
      productPage.addToCart();

      homePage.goToCart();
      cartPage.waitForCart();
      cartPage.verifyProduct(order.products[0]);
      cartPage.verifyProduct(order.products[1]);

      cartPage.clickPlaceOrder();
      cartPage.verifyOrderModal();
      cartPage.fillForm(order.customer);
      cartPage.confirmPurchase();

      cartPage.verifySuccess();
      cy.screenshot("compra-exitosa");
      cartPage.closeConfirmation();
    });
  });

});
