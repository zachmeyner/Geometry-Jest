use dotenv::dotenv;
use hmac::{Hmac, Mac};
use jwt::SignWithKey;
use serde::Serialize;
use sha2::Sha256;

#[derive(Debug, Serialize)]
pub struct Claims {
    username: String,
    iat: u32,
}

pub async fn gen_auth_key(username: String, iat: u32) -> String {
    dotenv().ok();

    let config = crate::tools::config::Config::from_env().unwrap();

    let key: Hmac<Sha256> =
        Hmac::new_from_slice(String::as_bytes(&config.access_token_secret)).unwrap();
    let claims = Claims {
        username: username,
        iat: iat,
    };

    let token_string = claims.sign_with_key(&key).unwrap();
    token_string
}
