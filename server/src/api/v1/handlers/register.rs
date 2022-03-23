use ascii::{AsciiStr, AsciiString};
use hex;
use openssl::sha::sha256;
use rand::{thread_rng, Rng};
use rocket::serde::json::{json, Json, Value};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct RegInfo<'r> {
    username: &'r [u8],
    password: &'r [u8],
}

// Takes in a username and password, salts then hashes the password.
// TODO Add username and password to datebase after generation.
#[post("/register", format = "json", data = "<reg>")]
pub async fn register(reg: Json<RegInfo<'_>>) -> Value {
    let mut rng = thread_rng();
    let ascii_pass = AsciiString::from_ascii(reg.password).unwrap();

    // FIll Array of unsigned 8 bit ints with valid ascii characters (32 -> 127)
    let mut salt: [u8; 64] = [0; 64];
    for i in 0..64 {
        salt[i] = rng.gen_range(32..126);
    }

    // Salts the password with the characters from the 64 byte array
    let salt_string_slice = AsciiStr::from_ascii(&salt).unwrap();
    let salted_string = ascii_pass + salt_string_slice;

    // Hashes the Salted Password
    let hash = sha256(AsciiStr::as_bytes(&salted_string));

    println!("{:#?} \n {}", reg, hex::encode(hash));

    // * Temporary output until everything starts coming together
    json!({"content": "success"})
}
