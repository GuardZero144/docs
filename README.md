# GuardZero Docs

Source for the developer documentation of **[ValidFi](https://github.com/GuardZero144/ValidFi)**, GuardZero's privacy-preserving health credential platform on Stellar Soroban, and its **[TypeScript SDK](https://github.com/GuardZero144/sdk)**.

**Live site: https://guardzero144.github.io/docs/**

![built with](https://img.shields.io/badge/built%20with-VitePress-646cff)
![node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

---

## Table of contents

- [What this repo is](#what-this-repo-is)
- [What the site covers](#what-the-site-covers)
- [Local development](#local-development)
- [Repository structure](#repository-structure)
- [Writing and editing pages](#writing-and-editing-pages)
- [Site configuration](#site-configuration)
- [Deployment](#deployment)
- [Keeping docs accurate](#keeping-docs-accurate)
- [Documentation status and wanted pages](#documentation-status-and-wanted-pages)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Related repositories](#related-repositories)

---

## What this repo is

A static documentation site built with [VitePress](https://vitepress.dev) (Vue-powered, Markdown in, HTML out). It has no backend and no database. Every page is a Markdown file under `docs/`, and pushing to `main` rebuilds and publishes the site.

The docs are written for two audiences:

| Audience | Start here |
| --- | --- |
| **Integrators** building apps on ValidFi: issuing, verifying and sharing credentials | [SDK](https://guardzero144.github.io/docs/sdk/), [REST API](https://guardzero144.github.io/docs/api/), [Contracts](https://guardzero144.github.io/docs/contracts/) |
| **Contributors** working on ValidFi itself | [Architecture](https://guardzero144.github.io/docs/guide/architecture), [Running locally](https://guardzero144.github.io/docs/guide/getting-started), [Contributing](https://guardzero144.github.io/docs/guide/contributing) |

## What the site covers

| Section | Path | Contents |
| --- | --- | --- |
| Home | `docs/index.md` | Landing page with the project pitch and entry links |
| Introduction | `docs/guide/introduction.md` | What ValidFi is, who the docs are for, the three GuardZero repos, current maturity |
| Architecture | `docs/guide/architecture.md` | System diagram, the six contracts and what each owns, the timelocked upgrade path, off-chain components |
| Running locally | `docs/guide/getting-started.md` | Prerequisites, then contracts, backend, frontend and ZK setup, with the backend environment variables |
| Contributing | `docs/guide/contributing.md` | How to pick up issues, branch, open PRs, and preview docs changes |
| SDK | `docs/sdk/index.md` | Installing and using `@guardzero/sdk` (API client, contract clients, signers, errors) |
| REST API | `docs/api/index.md` | Wallet-signature login, then every documented backend route with request bodies |
| Smart contracts | `docs/contracts/index.md` | Function reference per contract, plus the full error-code table |
| Zero-knowledge proofs | `docs/zk/index.md` | The Circom/SnarkJS/Groth16 stack, phase status, proof flow |

The SDK page is a summary. Full SDK documentation (every method, signer recipes, error handling) lives in the [SDK README](https://github.com/GuardZero144/sdk#readme).

## Local development

**Requirements:** Node.js 18 or later and npm.

```bash
git clone https://github.com/GuardZero144/docs.git
cd docs
npm install
npm run dev
```

The dev server runs at **http://localhost:5173/docs/**. The `/docs/` suffix comes from the `base` setting, which matches the GitHub Pages project URL. Edits hot-reload.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `docs/.vitepress/dist`. Fails on dead internal links, so run it before opening a PR. |
| `npm run preview` | Serves the production build locally, to check it exactly as deployed |

## Repository structure

```
.
├── package.json
├── README.md
├── .github/workflows/
│   └── deploy.yml            # build + publish to GitHub Pages on push to main
└── docs/                     # the VitePress source root
    ├── index.md              # home page (layout: home, hero, feature cards)
    ├── .vitepress/
    │   └── config.mts        # title, base path, nav, sidebar, search, edit link
    ├── guide/
    │   ├── introduction.md
    │   ├── architecture.md
    │   ├── getting-started.md
    │   └── contributing.md
    ├── sdk/index.md
    ├── api/index.md
    ├── contracts/index.md
    └── zk/index.md
```

Build output (`docs/.vitepress/dist`) and cache (`docs/.vitepress/cache`) are git-ignored.

## Writing and editing pages

Every page is plain Markdown with GitHub-flavored tables and fenced code blocks. The site's **Edit this page on GitHub** link opens the right file for you.

**Adding a page**

1. Create `docs/<section>/<name>.md` with a `# Title` as the first line.
2. Add it to the `sidebar` in `docs/.vitepress/config.mts`. Pages not listed there still build but won't appear in navigation.
3. Link to it with an absolute path without the extension, such as `[SDK](/sdk/)` or `[Architecture](/guide/architecture)`. Don't add the `/docs/` base yourself, because VitePress does that.
4. Run `npm run build`. It fails if any internal link is dead.

**Useful VitePress features used here**

```md
::: warning Early stage
Callout blocks: info, tip, warning, danger.
:::

<Badge text="JWT" />         <!-- inline badge, used to mark authenticated routes -->

```ts [optional-title.ts]    <!-- code fences accept a language and a title -->
```

**Style**

- Lead with what the reader can do, then give the detail. Short paragraphs, tables for reference material.
- Use real names from the code (`submit_credential`, `/identities/:id/revoke`) in code formatting, so readers can search for them.
- Every code sample must be something that works against the current ValidFi `main`. Don't document planned behavior without marking it as planned.
- Mark unfinished areas explicitly, as the ZK page does with its phase table, rather than describing them as complete.

## Site configuration

All site-wide settings are in [`docs/.vitepress/config.mts`](docs/.vitepress/config.mts):

| Setting | Value | Why |
| --- | --- | --- |
| `base` | `/docs/` | The site is served at `guardzero144.github.io/docs/`. **Change this if the repo is renamed or a custom domain is added.** |
| `cleanUrls` | `true` | `/sdk/` rather than `/sdk/index.html` |
| `lastUpdated` | `true` | Shows the last git commit date on each page (needs full git history, so CI checks out with `fetch-depth: 0`) |
| `themeConfig.nav` / `sidebar` | see file | Top bar and left navigation |
| `themeConfig.editLink` | `GuardZero144/docs/edit/main/docs/:path` | Per-page "Edit on GitHub" |
| `themeConfig.search` | `local` | Built-in client-side search, no external service |

## Deployment

Deployment is automatic. [`deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main`, and can be started by hand from the Actions tab:

1. Check out the repo with full history.
2. Install Node 20 and run `npm ci`.
3. Run `npm run build`.
4. Upload `docs/.vitepress/dist` and publish it to GitHub Pages.

The build step runs the same link check as local builds, so **a PR with a broken link fails before it can be merged**.

GitHub Pages for this repo is set to **GitHub Actions** as its source (Settings → Pages). If the site ever stops updating, check that setting and the latest run under the Actions tab.

**Custom domain:** add a `docs/public/CNAME` file containing the domain, set it under Settings → Pages, and change `base` in `config.mts` to `/`.

## Keeping docs accurate

The REST and contract pages are written from ValidFi's source and can drift as it changes. When a PR in ValidFi touches one of these, the matching page should be updated here:

| When this changes in ValidFi | Update this page |
| --- | --- |
| A route or DTO in `backend/src/**/*.controller.ts` or `dto/` | `docs/api/index.md` |
| Login or token handling in `backend/src/auth/` | `docs/api/index.md`, and the SDK README |
| A contract function or type in `contracts/src/*.rs` | `docs/contracts/index.md` |
| An error variant in `contracts/src/errors.rs` | The error table in `docs/contracts/index.md`, and `src/errors.ts` in the SDK |
| Environment variables, scripts or setup steps | `docs/guide/getting-started.md` |
| Circuits or ZK phase status in `zk/` | `docs/zk/index.md` |
| A new contract, service or major dependency | `docs/guide/architecture.md` |
| The SDK's public API | `docs/sdk/index.md`, and the SDK README |

## Documentation status and wanted pages

| Area | Status |
| --- | --- |
| Introduction, architecture, local setup, contributing | ✅ Written |
| REST: auth, identities, verifications, data sharing, health authorities, credentials | ✅ Documented |
| REST: `access-control`, `permissions`, `audit`, `analytics`, `backup`, `indexer`, `credential-export`, `credential-versioning`, `credential-sharing-history`, `health` | ⏳ Not yet documented |
| Contracts: function lists and error codes | ✅ Documented (names only) |
| Contracts: per-function parameters, auth requirements and examples for `Verification`, `AccessControl`, `DataSharing`, `Auditing`, and `IdentityRegistry` | ⏳ Wanted |
| Request and response examples (JSON) for each REST route | ⏳ Wanted |
| Guides: "Issue your first credential", "Verify a credential as a venue", "Share a credential with a time limit" | ⏳ Wanted |
| ZK: circuit reference, proof generation walkthrough | ⏳ Waiting on ZK phases 2 and 3 |
| Security and privacy model: what is on-chain vs. on IPFS, what a verifier learns | ⏳ Wanted |
| Deployment guide (production) | ⏳ Wanted. Currently only in ValidFi's `DEPLOYMENT.md` |
| Glossary | ⏳ Wanted |

## Contributing

1. Pick an [open docs issue](https://github.com/GuardZero144/docs/issues), or open one for the page you want to add or fix. Comment to ask for it to be assigned to you before starting.
2. Fork the repo and branch from `main`.
3. Make the change. Run `npm run build` and `npm run dev` to check the build passes and the page renders as expected.
4. Open a PR that references the issue with `Closes #N`. Describe which ValidFi code the change was checked against.

Small fixes (a typo, a wrong route, a dead link) don't need an issue. Use the **Edit this page on GitHub** link on the live site.

**Review checklist**

- Claims match the current ValidFi `main`
- Code samples are runnable, with realistic placeholder values and no real secrets or keys
- New pages are in the sidebar
- `npm run build` passes with no dead links

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Dev site shows a 404 at `http://localhost:5173/` | The site lives under the base path. Open `http://localhost:5173/docs/`. |
| `npm run build` fails with `Found dead link` | An internal link points to a page that doesn't exist or has the wrong path. Links should be absolute (`/sdk/`) and have no `.md` extension. |
| Page missing from the left navigation | Add it to `sidebar` in `docs/.vitepress/config.mts`. |
| Page works locally but is unstyled or broken after deploy | `base` doesn't match the URL the site is served from. |
| "Last updated" shows the wrong date or is missing in CI | The checkout in `deploy.yml` needs `fetch-depth: 0`. |
| Deploy doesn't update the site | Check Settings → Pages → Source is **GitHub Actions**, then look at the latest run under the Actions tab. |

## Related repositories

| Repo | Contents |
| --- | --- |
| [ValidFi](https://github.com/GuardZero144/ValidFi) | Soroban contracts (Rust), NestJS backend, Next.js frontend, Circom circuits |
| [sdk](https://github.com/GuardZero144/sdk) | `@guardzero/sdk`, the TypeScript client for the backend API and the contracts |
| **docs** (this repo) | The documentation site |
