# Introduction

**ValidFi** is GuardZero's decentralized health credential platform, built on the [Stellar Soroban](https://developers.stellar.org/docs/build/smart-contracts/overview) smart contract platform.

Health authorities issue encrypted vaccination credentials that are anchored on-chain. Holders keep control of their data and can prove their vaccination status to venues, employers or travel authorities with zero-knowledge proofs. The verifier learns whether the claim is true and nothing else.

## Who this is for

- **Integrators** building on ValidFi: start with the [SDK](/sdk/).
- **Contributors** to ValidFi: read [Architecture](./architecture), then [Running locally](./getting-started) and [Contributing](./contributing).

## Repositories

| Repo | What's in it |
| --- | --- |
| [ValidFi](https://github.com/GuardZero144/ValidFi) | Soroban contracts (Rust), NestJS backend, Next.js frontend, Circom circuits |
| [sdk](https://github.com/GuardZero144/sdk) | `@guardzero/sdk`, the TypeScript client for the API and contracts |
| [docs](https://github.com/GuardZero144/docs) | This site |

::: warning Early stage
ValidFi is under active development. Some components described in the ValidFi README are still being built. Check the [open issues](https://github.com/GuardZero144/ValidFi/issues) for current status.
:::
