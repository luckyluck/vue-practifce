# vue-practice

This is a test project developed during [Udemy course](https://www.udemy.com/share/101WAS3@cI3MPbLP_YHAhdISpm4VLAkX81v6fdaV8P6IYDI54IDaXi1QLk515CqRGv6sCs4T/) studying.
The purposes of the project:
 - migrate from Options API to composition API
 - replace Vuex with Pinia
 - Add unit tests
 - Add E2E tests

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
