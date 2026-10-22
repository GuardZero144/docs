# SDK

[`@guardzero/sdk`](https://github.com/GuardZero144/sdk) is the TypeScript client for ValidFi.

```bash
npm install github:GuardZero144/sdk   # npm release coming
```

## Backend API

```ts
import { ValidFiApi } from '@guardzero/sdk';

const api = new ValidFiApi({ baseUrl: 'http://localhost:3001/api/v1' });
await api.auth.login({ walletAddress, signature, message }); // stores the JWT

await api.identities.list({ page: 1, limit: 20 });
await api.verifications.approve(verificationId);
await api.dataSharing.byOwner(walletAddress);
```

| Namespace | Backend route |
| --- | --- |
| `api.auth` | `/auth` |
| `api.identities` | `/identities` |
| `api.verifications` | `/verifications` |
| `api.dataSharing` | `/data-sharing` |
| `api.healthAuthorities` | `/health-authorities` |
| `api.credentials` | `/credentials` |

Errors throw `ApiError` (`status`, `message`, `body`).

## Contracts

```ts
import { SorobanClient, TESTNET, VaccinationVerificationContract } from '@guardzero/sdk';

const soroban = new SorobanClient(TESTNET);
const vaccination = new VaccinationVerificationContract(soroban, contractId);

await vaccination.checkVaccinationStatus(1n, walletAddress);            // read (simulated)
await vaccination.verifyCredential(1n, verifier, { source: verifier, signer }); // write (signed)
```

A `signer` is any function `(xdr, networkPassphrase) => Promise<signedXdr>`. With Freighter:

```ts
import { signTransaction } from '@stellar/freighter-api';

const signer = async (xdr: string, networkPassphrase: string) =>
  (await signTransaction(xdr, { networkPassphrase })).signedTxXdr;
```

Contract failures throw `ContractError` with a typed `code`. See [error codes](/contracts/#error-codes).
