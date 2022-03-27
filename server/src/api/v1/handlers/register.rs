use ascii::{AsciiStr, AsciiString};
use hex;
use rand::{thread_rng, Rng};
use rocket::http::{ContentType, Header, Status};
use rocket::response::{content, status};
use rocket::serde::json::Json;
use serde::Deserialize;
use sha2::{Digest, Sha256};

#[derive(Debug, Deserialize)]
pub struct RegInfo<'r> {
    username: &'r [u8],
    password: &'r [u8],
}

// Takes in a username and password, salts then hashes the password.
// This will also automatically log the user in and create a JWT.
// TODO Add JWT Signing after auto-login.
// TODO Add username and password to datebase after generation.
#[post("/register", format = "json", data = "<reg>")]
pub async fn register(reg: Json<RegInfo<'_>>) -> status::Custom<content::Json<&'static str>> {
    let mut rng = thread_rng();
    let ascii_pass = AsciiString::from_ascii(reg.password).unwrap();

    // FIll Array of unsigned 8 bit ints with valid ascii characters (32 -> 127)
    let mut salt: [u8; 32] = [0; 32];
    for i in 0..32 {
        salt[i] = rng.gen_range(32..126);
    }

    // Salts the password with the characters from the 64 byte array
    let salt_string_slice = AsciiStr::from_ascii(&salt).unwrap();
    let salted_string = ascii_pass + salt_string_slice;

    // Hashes the Salted Password
    let mut hasher = Sha256::new();
    hasher.update(AsciiStr::as_bytes(&salted_string));
    let hash = hasher.finalize();

    // println!("{:#?} \n {:#?}", salt_string_slice, hex::encode(hash));

    // * Temporary output until everything starts coming together

    status::Custom(Status::Accepted, content::Json("{ \"Success?\": true }"))
}
