const API = "https://api.demoblaze.com";

// Función para convertir password a Base64
const toBase64 = (texto) => btoa(texto);

// Generar usuario único por ejecución para evitar conflictos
const TIMESTAMP = Date.now();
const USUARIO_NUEVO = `testuser_${TIMESTAMP}`;

describe("Pruebas de API Signup y Login", () => {

  // ---------------------------------------------------------------
  // SIGNUP
  // ---------------------------------------------------------------
  describe("POST /signup", () => {

    it("TC-API-001: Crear un nuevo usuario exitosamente", () => {
      cy.request({
        method: "POST",
        url: `${API}/signup`,
        headers: { "Content-Type": "application/json" },
        body: {
          username: USUARIO_NUEVO,
          password: toBase64("MiPassword123!")
        },
        failOnStatusCode: false
      }).then((response) => {
        // Verificar status 200
        expect(response.status).to.eq(200);

        // El body debe estar vacío (registro exitoso)
        const body = JSON.stringify(response.body).toLowerCase();
        expect(body).to.not.include("exists");

        cy.log(`✅ Usuario creado: ${USUARIO_NUEVO}`);
        cy.log(`Respuesta: ${JSON.stringify(response.body)}`);
      });
    });

    it("TC-API-002: Intentar crear un usuario ya existente", () => {
      // Usamos el mismo usuario que creamos arriba
      cy.request({
        method: "POST",
        url: `${API}/signup`,
        headers: { "Content-Type": "application/json" },
        body: {
          username: USUARIO_NUEVO,
          password: toBase64("MiPassword123!")
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);

        // El body debe indicar que el usuario ya existe
        const body = JSON.stringify(response.body).toLowerCase();
        expect(body).to.include("exist");

        cy.log(`✅ Error correcto al duplicar usuario`);
        cy.log(`Respuesta: ${JSON.stringify(response.body)}`);
      });
    });

  });

  // ---------------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------------
  describe("POST /login", () => {

    it("TC-API-003: Login con usuario y password correcto", () => {
      cy.request({
        method: "POST",
        url: `${API}/login`,
        headers: { "Content-Type": "application/json" },
        body: {
          username: USUARIO_NUEVO,
          password: toBase64("MiPassword123!")
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);

        // El body debe contener un token (no debe decir "Wrong")
        expect(response.body).to.not.be.null;
        const body = JSON.stringify(response.body).toLowerCase();
        expect(body).to.not.include("wrong");

        cy.log(`✅ Login exitoso. Token: ${JSON.stringify(response.body)}`);
      });
    });

    it("TC-API-004: Login con usuario y password incorrecto", () => {
      cy.request({
        method: "POST",
        url: `${API}/login`,
        headers: { "Content-Type": "application/json" },
        body: {
          username: "usuario_que_no_existe_999",
          password: toBase64("PasswordMalo!")
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);

        // El body debe indicar el error
        const body = JSON.stringify(response.body).toLowerCase();
        expect(body).to.satisfy(
          (s) => s.includes("wrong") || s.includes("does not exist"),
          `Se esperaba mensaje de error, recibido: ${JSON.stringify(response.body)}`
        );

        cy.log(`✅ Login rechazado correctamente`);
        cy.log(`Respuesta: ${JSON.stringify(response.body)}`);
      });
    });

  });

});