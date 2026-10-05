# Demo Web Shop - Playwright Automation Framework

A JavaScript + Playwright + Page Object Model automation framework for:

https://demowebshop.tricentis.com/

## Tech stack

- JavaScript
- Node.js
- Playwright Test
- Page Object Model (POM)
- HTML reporting
- Screenshots, video and trace on failure
- Chromium, Firefox and WebKit

## Setup

Install Node.js first.

Open this folder in VS Code and run:

```bash
npm install
npx playwright install
```

## Run all tests

```bash
npx playwright test
```

## Run with browser visible

```bash
npx playwright test --headed
```

## Run one test file

```bash
npx playwright test tests/login.spec.js
```

## Debug

```bash
npx playwright test --debug
```

## HTML report

```bash
npx playwright show-report
```

## Test files

- registration.spec.js
- login.spec.js
- navigation.spec.js
- search.spec.js
- product.spec.js
- cart.spec.js
- wishlist.spec.js
- checkout.spec.js
- end-to-end-purchase.spec.js

## Framework structure

```text
DemoWebShop-Playwright/
├── pages/
│   ├── BasePage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── SearchPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── WishlistPage.js
│   └── CheckoutPage.js
├── fixtures/
│   └── testData.js
├── tests/
│   ├── registration.spec.js
│   ├── login.spec.js
│   ├── navigation.spec.js
│   ├── search.spec.js
│   ├── product.spec.js
│   ├── cart.spec.js
│   ├── wishlist.spec.js
│   ├── checkout.spec.js
│   └── end-to-end-purchase.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

## Important

The Demo Web Shop is a public demo application. Test data may persist or change. The framework deliberately creates a unique email during registration tests.

For checkout, use the site's test/demo payment flow only. Do not use real financial information.

## Interview topics demonstrated

- Page Object Model
- Locators
- getByRole / getByLabel / CSS locators
- Assertions
- Auto waiting
- Fixtures
- beforeEach
- Reusable methods
- Test data
- Cross-browser testing
- Screenshots
- Video
- Trace
- HTML report
- End-to-end testing
