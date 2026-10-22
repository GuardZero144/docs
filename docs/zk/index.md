# Zero-knowledge proofs

ValidFi's ZK layer lets a holder prove facts about a vaccination credential, such as "I hold a valid credential for vaccine X", without revealing the credential itself.

**Stack:** Circom 2, SnarkJS, Groth16, Poseidon hashing.

Source: [`zk/`](https://github.com/GuardZero144/ValidFi/tree/main/zk)

## Status

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Utility circuits (comparators, range checks, Poseidon wrappers), Merkle membership proofs, test harness | ✅ Complete |
| 2 | Date-range verification, vaccine type matching | Planned |
| 3 | Booster verification, main `VaccinationProof` circuit | Planned |

## Layout

```
zk/circuits/
├── utils/   comparators.circom, rangeCheck.circom, poseidon.circom
└── core/    verification circuits
```

## Flow

1. The issuer commits to the credential (a Poseidon hash), which is stored as `proof_hash` on-chain.
2. The holder generates a Groth16 proof locally with SnarkJS from the private credential plus public inputs (vaccine type, date bounds).
3. The verifier checks the proof against the on-chain commitment and learns only the boolean result.
