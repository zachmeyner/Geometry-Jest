use rand::distributions::{Alphanumeric, Distribution};
use rand::thread_rng;

pub async fn create_salt() -> String {
    let mut rng = thread_rng();

    // FIll Array of unsigned 8 bit ints with valid ascii characters (32 -> 127)
    let salt: String = Alphanumeric
        .sample_iter(&mut rng)
        .take(32)
        .map(char::from)
        .collect();

    salt
}
