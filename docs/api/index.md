# REST API

Base URL: `http://<host>:3001/api/v1` (set by `PORT` and `API_PREFIX`).

## Authentication

1. Sign a message with the user's Stellar wallet.
2. `POST /auth/login` with `{ walletAddress, signature, message }` and receive `{ access_token, walletAddress }`.
3. Send `Authorization: Bearer <access_token>` on protected routes.

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/auth/login` | Verifies the wallet signature and issues a JWT |
| POST | `/auth/verify` | `{ token }` returns the token payload |
| POST | `/auth/refresh` | `{ walletAddress }` returns a new token |

## Identities <Badge text="JWT" />

| Method | Path |
| --- | --- |
| POST | `/identities` |
| GET | `/identities?page=&limit=&verifiedOnly=` |
| GET | `/identities/revocations` |
| GET / PATCH / DELETE | `/identities/:id` |
| PATCH | `/identities/:id/revoke` |
| POST | `/identities/bulk-revoke` |
| GET | `/identities/:id/revocation-status` |
| GET | `/identities/:id/fraud-detection` |
| GET | `/identities/:id/verify-integrity` |

Create body: `{ walletAddress, documentHash, ipfsCid, verificationStatus?, metadata? }`

## Verifications <Badge text="JWT" />

| Method | Path |
| --- | --- |
| POST / GET | `/verifications` |
| GET / PATCH | `/verifications/:id` |
| PATCH | `/verifications/:id/approve` |
| PATCH | `/verifications/:id/reject` |
| GET | `/verifications/identity/:identityId` |

Create body: `{ identityId, walletAddress, proofHash, verificationCommitment, metadata? }`

## Data sharing <Badge text="JWT" />

| Method | Path |
| --- | --- |
| POST / GET | `/data-sharing` |
| GET / PATCH | `/data-sharing/:id` |
| PATCH | `/data-sharing/:id/revoke` |
| PATCH | `/data-sharing/:id/extend` |
| GET | `/data-sharing/:id/active` |
| GET | `/data-sharing/owner/:ownerAddress` |
| GET | `/data-sharing/recipient/:recipientAddress` |

Create body: `{ ownerAddress, recipientAddress, documentHash, encryptedKey, durationSeconds, metadata? }`

## Health authorities

| Method | Path |
| --- | --- |
| POST | `/health-authorities/connect` |
| GET | `/health-authorities`, `/health-authorities/active` |
| GET / PUT | `/health-authorities/:id` |
| POST | `/health-authorities/:id/verify`, `/health-authorities/:id/reconnect` |
| DELETE | `/health-authorities/:id/disconnect` |
| POST | `/health-authorities/credentials/request` |
| GET | `/health-authorities/credentials/:id` |
| GET | `/health-authorities/credentials/wallet/:walletAddress` |
| GET | `/health-authorities/credentials/authority/:authorityId` |
| POST | `/health-authorities/credentials/:id/retry` |
| PATCH | `/health-authorities/credentials/:id/revoke` |

## Credentials

| Method | Path |
| --- | --- |
| GET | `/credentials/search` |
| GET | `/credentials/status/:id` |
| POST | `/credentials/status/:id/revoke`, `/credentials/status/:id/verify` |
| GET | `/credentials/connections` |
| DELETE | `/credentials/:id` |
| POST | `/credentials/:id/verify-deletion` |

::: info Not yet documented
`access-control`, `permissions`, `audit`, `analytics`, `backup`, `indexer`, `credential-export`, `credential-versioning`, `credential-sharing-history`, `health`. Contributions are welcome.
:::
