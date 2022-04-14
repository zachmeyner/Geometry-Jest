use dotenv::dotenv;
use hmac::{Hmac, Mac};
use jwt::{SignWithKey, VerifyWithKey};
use serde::{Deserialize, Serialize};
use sha2::Sha256;

/**
 * Claims Structure
 * Used to create HMAC hash for user
 * username: input username from LoginForm
 * iat: UNIX timestamp from LoginForm
 */
#[derive(Debug, Serialize, Deserialize)]
pub struct LoginClaim {
    username: String,
    iat: f64,
    expat: f64,
}

/**
 * Create an JWT for a user
 * Takes in a username and u32 (UNIX timestamp)
 * Creates an HMAC key from ACCESS_TOKEN_SECRET environment variable
 * Signs username and login time with that key
 * Outputs the signed key as a string
 */
pub async fn gen_auth_key(username: &String, iat: f64) -> String {
    dotenv().ok();

    let config = crate::tools::config::Config::from_env().unwrap();

    let key: Hmac<Sha256> =
        Hmac::new_from_slice(String::as_bytes(&config.access_token_secret)).unwrap();
    let claims = LoginClaim {
        username: username.to_string(),
        iat: iat,
        expat: iat + 900000f64,
    };

    let token_string = claims.sign_with_key(&key).unwrap();
    token_string
}

pub async fn valid_token(token: &String) -> bool {
    dotenv().ok();

    let failed = LoginClaim {
        username: "THIS OPERATION HAS FAILED".to_string(),
        iat: 0f64,
        expat: 0f64,
    };

    let config = crate::tools::config::Config::from_env().unwrap();

    let key: Hmac<Sha256> =
        Hmac::new_from_slice(String::as_bytes(&config.access_token_secret)).unwrap();

    let claims: LoginClaim = token.verify_with_key(&key).unwrap_or(failed);

    if claims.username == "THIS OPERATION HAS FAILED".to_string() {
        false
    } else if claims.expat
        < std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .expect("error")
            .as_millis() as f64
    {
        false
    } else {
        true
    }
}
