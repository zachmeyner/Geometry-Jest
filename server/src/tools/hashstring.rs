use hex;
use sha2::{Digest, Sha256};

/**
 * Hashed a string with SHA256
 * Takes in a string to hash
 * Hashes the string using SHA256
 * Outputs the hash in a hexidecimal string
 */
pub async fn hash_string(hsh: String) -> String {
    let mut hasher = Sha256::new();
    hasher.update(hsh.as_bytes());
    let hash = hasher.finalize();

    return hex::encode(hash);
}
