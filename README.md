# FreshKart

FreshKart is an Angular storefront for browsing products, filtering by price, sorting, and managing a cart.

The project uses Angular 22.2 and requires Node.js `^22.22.3`, `^24.15.0`, or `>=26.0.0`. Node.js 24.22.1 is supported.

## Development server

Run `npm start` for a development server. Open `http://localhost:4200/`; the app reloads when source files change.

## Build

Run `npm run build` to create a production build in `dist/freshKart`.

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds and deploys the app when changes are pushed to `main` or `master`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. You can also start a deployment from the Actions tab with **Deploy FreshKart to GitHub Pages → Run workflow**.

## Running unit tests

Run `npm test` to execute the unit tests with Vitest.
