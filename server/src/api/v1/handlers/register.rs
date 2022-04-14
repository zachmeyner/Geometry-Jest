use rocket::http::Status;
use rocket::response::{content, status};
use rocket::serde::json::Json;
use serde::Deserialize;

/**
 * Regustration info for new user
 * JSON input recieved from frontend
 * username: input username
 * password: input password
 */
#[derive(Debug, Deserialize)]
pub struct RegInfo {
    username: String,
    password: String,
}

/**
 * Register info for a new user who has a score
 * JSON input recieved from frontend
 * username: input username
 * password: input password
 * score: score the user has achieved
 */
#[derive(Debug, Deserialize)]
pub struct RegWithScore {
    username: String,
    password: String,
    score: i32,
}

/**
 * Takes in a username and password, salts then hashes the password.
 * * All usernames coming from the frontend will be lowercase only.
 */
#[post("/register", format = "json", data = "<reg>")]
pub async fn register(reg: Json<RegInfo>) -> status::Custom<content::Json<&'static str>> {
    let go: bool = crate::controllers::users::user_does_not_exist(&reg.username).await;

    if go {
        let salt = crate::tools::createsalt::create_salt().await;

        // Salts the password with the characters from the 64 byte array
        let salted_string = format!("{}{}", reg.password, salt);

        // Hashes the Salted Password
        let hashed = crate::tools::hashstring::hash_string(salted_string).await;

        crate::controllers::users::create_user(&reg.username, &hashed, &salt, 0).await;

        status::Custom(Status::Accepted, content::Json(""))
    } else {
        status::Custom(Status::Conflict, content::Json(""))
    }
}

/**
 * Takes in a username, password, and score, salts then hashes the password.
 * * All usernames coming from the frontend will be lowercase only.
 */
#[post("/registerscore", format = "json", data = "<reg>")]
pub async fn register_with_score(
    reg: Json<RegWithScore>,
) -> status::Custom<content::Json<&'static str>> {
    let go: bool = crate::controllers::users::user_does_not_exist(&reg.username).await;

    if go {
        let salt = crate::tools::createsalt::create_salt().await;

        // Salts the password with the characters from the 64 byte array
        let salted_string = format!("{}{}", reg.password, salt);

        // Hashes the Salted Password
        let hashed = crate::tools::hashstring::hash_string(salted_string).await;

        crate::controllers::users::create_user(&reg.username, &hashed, &salt, reg.score).await;

        status::Custom(Status::Accepted, content::Json(""))
    } else {
        status::Custom(Status::Conflict, content::Json(""))
    }
}
