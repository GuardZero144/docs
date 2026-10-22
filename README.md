# GuardZero Docs

Developer documentation for [ValidFi](https://github.com/GuardZero144/ValidFi) and the [GuardZero SDK](https://github.com/GuardZero144/sdk), built with [VitePress](https://vitepress.dev).

Published at **https://guardzero144.github.io/docs/** once GitHub Pages is enabled.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/docs/
npm run build    # outputs docs/.vitepress/dist
```

## Structure

```
docs/
├── index.md            # landing page
├── guide/              # introduction, architecture, local setup, contributing
├── sdk/                # @guardzero/sdk usage
├── api/                # backend REST endpoints
├── contracts/          # Soroban contract reference and error codes
└── zk/                 # zero-knowledge proof layer
```

Pushing to `main` deploys the site via `.github/workflows/deploy.yml`.

## Contributing

Every page has an **Edit this page on GitHub** link. Keep the content in sync with ValidFi `main`: when a route, contract function or error code changes there, update the matching page here.
