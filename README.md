# Demoblaze - Cypress Test Suite

Automated test suite for [DemoBlaze](https://www.demoblaze.com), covering E2E purchase flow and API validation.

## Requirements

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Running the Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests headless + generate report |
| `npm run test:open` | Open Cypress UI for interactive debugging |

## Project Structure

```
cypress/
├── e2e/
│   ├── e2e_purchase_flow.cy.js   # End-to-end purchase flow
│   └── api_tests.cy.js           # API tests (signup & login)
├── pages/
│   ├── HomePage.js               # Page Object - Home
│   ├── ProductPage.js            # Page Object - Product detail
│   └── CartPage.js               # Page Object - Cart & checkout
├── fixtures/
│   └── orderData.json            # Test data (products & customer info)
└── reports/
    └── index.html                # Generated HTML report (after npm test)
```

## Test Cases

### E2E - Purchase Flow
| ID | Description |
|---|---|
| TC-E2E-001 | Add two products to cart, fill order form, and complete purchase |

### API - Signup & Login
| ID | Description |
|---|---|
| TC-API-001 | Successfully create a new user |
| TC-API-002 | Attempt to create a duplicate user |
| TC-API-003 | Login with valid credentials |
| TC-API-004 | Login with invalid credentials |

## Design Decisions

- **Page Object Model** — UI interactions are encapsulated in page classes, keeping tests clean and maintainable.
- **Fixtures** — Test data lives in `orderData.json`, separate from test logic.
- **Mochawesome Reporter** — Generates an HTML report with embedded screenshots after each headless run.
- **Dynamic usernames** — API tests generate a unique username per run using a timestamp to avoid conflicts.
