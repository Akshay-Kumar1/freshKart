# FreshKart

FreshKart is an Angular storefront for browsing products, filtering by price, sorting, and managing a cart.

The project uses Angular 22.2 and requires Node.js `^22.22.3`, `^24.15.0`, or `>=26.0.0`. Node.js 24.22.1 is supported.

## Development server

Run `npm start` for a development server. Open `http://localhost:4200/`; the app reloads when source files change.

## Node.js backend

Run `npm run start:backend` to start the backend at `http://localhost:3000`. The product catalog is available at `http://localhost:3000/api/get/products`. The backend allows requests from `http://localhost:4200` by default; set `CORS_ORIGINS` to a comma-separated list of allowed origins when using a different frontend origin. Set `PORT` to use a different backend port.

`HttpServiceService` uses `http://localhost:3000/api` as its base URL and provides `get`, `post`, `put`, `patch`, and `delete` methods for API endpoints. Pass endpoint paths relative to `/api` (for example, `/products`). The current backend implements `GET /api/products`; add other routes to `server.js` before calling them.

## Build

Run `npm run build` to create a production build in `dist/freshKart`.

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds and deploys the app when changes are pushed to `main` or `master`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. You can also start a deployment from the Actions tab with **Deploy FreshKart to GitHub Pages → Run workflow**.

## Running unit tests

Run `npm test` to execute the unit tests with Vitest.
