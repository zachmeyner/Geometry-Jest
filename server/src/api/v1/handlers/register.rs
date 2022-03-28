use rand::distributions::{Alphanumeric, Distribution};
// use hex;
use rand::thread_rng;
use rocket::http::Status;
use rocket::response::{content, status};
use rocket::serde::json::Json;
use serde::Deserialize;
use sha2::{Digest, Sha256};

#[derive(Debug, Deserialize)]
pub struct RegInfo<'r> {
    username: &'r str,
    password: &'r str,
}

// Takes in a username and password, salts then hashes the password.
// This will also automatically log the user in and create a JWT.
// TODO Add JWT Signing after auto-login.
// TODO Add username and password to datebase after generation.
#[post("/register", format = "json", data = "<reg>")]
pub async fn register(reg: Json<RegInfo<'_>>) -> status::Custom<content::Json<&'static str>> {
    let mut rng = thread_rng();

    // FIll Array of unsigned 8 bit ints with valid ascii characters (32 -> 127)
    let salt: String = Alphanumeric
        .sample_iter(&mut rng)
        .take(32)
        .map(char::from)
        .collect();

    // Salts the password with the characters from the 64 byte array
    let salted_string = format!("{}{}", reg.password, salt);

    // Hashes the Salted Password
    let mut hasher = Sha256::new();
    hasher.update(salted_string.as_bytes());
    let _hash = hasher.finalize();

    println!(
        "{:#?} \n {:#?}",
        salted_string.as_bytes(),
        hex::encode(_hash)
    );

    // * Temporary output until everything starts coming together

    status::Custom(Status::Accepted, content::Json("{ \"Success?\": true }"))
}
