# Smart contracts

Source: [`contracts/src`](https://github.com/GuardZero144/ValidFi/tree/main/contracts/src) · soroban-sdk `21.7.7`

## VaccinationVerification

| Function | Auth | Description |
| --- | --- | --- |
| `submit_credential(issuer, patient_id, vaccine_type, dose_number, total_doses, lot_number, administered_at, expiry_date, proof_hash, zk_proof) -> u64` | issuer | Issue a credential |
| `verify_credential(credential_id, verifier) -> bool` | verifier (whitelisted) | Mark a credential verified |
| `check_vaccination_status(credential_id) -> VaccinationStatus` | none | `Pending`, `Valid`, `Expired`, `Revoked` or `Invalid` |
| `is_fully_vaccinated(patient_id) -> bool` | none | |
| `revoke_credential(credential_id, issuer, reason)` | issuer | |
| `get_credential(credential_id)` / `get_credential_by_patient(patient_id)` | none | |
| `authorize_verifier(admin, verifier)` | admin | Add a verifier to the whitelist |

## IdentityRegistry

| Function | Description |
| --- | --- |
| `register_identity(owner, document_hash, ipfs_cid) -> u64` | Requires `owner` auth |
| `update_identity`, `revoke_identity`, `get_identity`, `mark_verified`, `is_verified` | Identity lifecycle |
| `schedule_upgrade`, `execute_upgrade`, `cancel_upgrade` | Timelocked (24 h) upgrades |
| `emergency_pause_upgrades`, `unpause_upgrades`, `is_upgrades_paused` | Emergency controls |
| `get_version`, `get_migration_record`, `get_state_hash` | Upgrade introspection |

## Verification

`submit_proof`, `approve_verification`, `reject_verification`, `get_verification`, `get_verification_by_identity`, `get_verification_status`, `revoke_verification`, `is_verification_revoked`, `get_revoked_verifications`, `is_verification_valid`, `validate_proof`

## AccessControl

`grant_access`, `revoke_access`, `check_access`, `get_permission`, `extend_access`, `get_access_history`

## DataSharing

`share_document`, `revoke_shared_document`, `get_shared_document`, `is_share_active`, `extend_share`, `share_credential`, `check_credential_access`, `get_shares_by_owner`, `get_shares_by_recipient`, `revoke_credential_share`, `extend_credential_share`, `re_share_credential`

## Error codes

| Code | Name | Code | Name |
| --- | --- | --- | --- |
| 1 | IdentityNotFound | 13 | InvalidImplementation |
| 2 | VerificationNotFound | 14 | MigrationFailed |
| 3 | PermissionNotFound | 15 | VersionMismatch |
| 4 | SharedDocumentNotFound | 16 | StorageCorrupted |
| 5 | Unauthorized | 17 | SuspiciousActivity |
| 6 | AlreadyInitialized | 18 | IssuerNotAuthorized |
| 7 | UpgradeNotInitialized | 19 | CredentialRevoked |
| 8 | InvalidUpgradeHash | 20 | CredentialNotFound |
| 9 | MigrationAlreadyRun | 21 | PermissionDenied |
| 10 | StateInconsistency | 22 | ShareExpired |
| 11 | UpgradeTimelockNotExpired | 23 | CannotReShare |
| 12 | ProxyNotInitialized | | |
