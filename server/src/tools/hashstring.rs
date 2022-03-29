use hex;
use sha2::{Digest, Sha256};

pub async fn hash_string(hsh: String) -> String {
    let mut hasher = Sha256::new();
    hasher.update(hsh.as_bytes());
    let hash = hasher.finalize();

    return hex::encode(hash);
}
