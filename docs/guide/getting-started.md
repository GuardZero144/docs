# Running ValidFi locally

## Prerequisites

- Node.js 18+
- Rust with the `wasm32-unknown-unknown` target, and the [Stellar CLI](https://developers.stellar.org/docs/tools/cli)
- PostgreSQL and Redis
- A Pinata account and a Groq API key, for the IPFS and AI features

## 1. Clone

```bash
git clone https://github.com/GuardZero144/ValidFi.git
cd ValidFi
```

## 2. Contracts

```bash
cd contracts
cargo test
cargo build --target wasm32-unknown-unknown --release
```

Deploy to testnet with the Stellar CLI and note each contract ID for the backend `.env`.

## 3. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

Key variables:

| Variable | Default / example |
| --- | --- |
| `PORT` | `3001` |
| `API_PREFIX` | `api/v1` |
| `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` | PostgreSQL connection |
| `REDIS_HOST`, `REDIS_PORT` | Redis connection |
| `SOROBAN_NETWORK_URL` | `https://soroban-testnet.stellar.org` |
| `SOROBAN_NETWORK_PASSPHRASE` | `Test SDF Network ; September 2015` |
| `IDENTITY_REGISTRY_CONTRACT_ID`, `VERIFICATION_CONTRACT_ID`, `ACCESS_CONTROL_CONTRACT_ID`, `DATA_SHARING_CONTRACT_ID` | From step 2 |
| `PINATA_API_KEY`, `PINATA_API_SECRET` | Pinata credentials |
| `GROQ_API_KEY` | Groq credentials |
| `JWT_SECRET`, `ENCRYPTION_KEY` | Secrets; never commit real values |

Outside `NODE_ENV=development`, the backend runs pending TypeORM migrations on startup.

## 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

## 5. ZK circuits

```bash
cd zk
npm install
npm test
```

See [`DEPLOYMENT.md`](https://github.com/GuardZero144/ValidFi/blob/main/DEPLOYMENT.md) in ValidFi for production deployment.
