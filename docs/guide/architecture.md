# Architecture

```
 Wallet (Freighter / Albedo / LOBSTR)
        │ sign
        ▼
 ┌──────────────┐   REST + JWT   ┌──────────────┐   RPC   ┌───────────────────┐
 │  Frontend    │ ─────────────▶ │  Backend     │ ──────▶ │ Soroban contracts │
 │  Next.js 15  │                │  NestJS      │         │ (Rust)            │
 └──────────────┘                └──────┬───────┘         └───────────────────┘
        │  ZK proofs (SnarkJS)          │
        ▼                               ├── PostgreSQL (TypeORM)
 ┌──────────────┐                       ├── Redis (cache)
 │ Circom/Groth16│                      ├── IPFS via Pinata (encrypted documents)
 └──────────────┘                       └── Groq (document analysis, fraud checks)
```

## On-chain

Contracts live in `contracts/src` and build into a single crate (`securedata-contracts`, soroban-sdk 21.7):

| Contract | Responsibility |
| --- | --- |
| `IdentityRegistry` | Registers identities (owner, document hash, IPFS CID), marks them verified or revoked, and owns the upgrade mechanism |
| `VaccinationVerification` | Issues, verifies and revokes vaccination credentials; reports vaccination status |
| `Verification` | Submits and approves or rejects identity verification proofs; tracks revocations |
| `AccessControl` | Grants, extends and revokes time-limited access to resources |
| `DataSharing` | Shares documents and credentials between addresses with expiry and re-share rules |
| `Auditing` | Audit log, activity tracking and issuer authorization checks |

### Upgrades

`IdentityRegistry` uses a proxy pattern with a **24-hour timelock** (`schedule_upgrade` → `execute_upgrade`), a migration registry, state-hash consistency checks, and an emergency pause (`emergency_pause_upgrades`).

## Off-chain

- **Backend** (`backend/`): NestJS REST API under the `API_PREFIX` (default `api/v1`) on port `3001`. It handles wallet-signature login, JWT auth, PostgreSQL persistence, Redis caching, IPFS uploads and contract calls.
- **Frontend** (`frontend/`): Next.js 15, Tailwind, shadcn/ui, with Freighter for the wallet.
- **ZK** (`zk/`): Circom circuits proved with SnarkJS and Groth16. See [ZK overview](/zk/).
