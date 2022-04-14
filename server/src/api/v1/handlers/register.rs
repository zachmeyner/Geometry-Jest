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
 * Takes in a username and password, salts then hashes the password.
 * This will also automatically log the user in and create a JWT.
 * * All usernames coming from the frontend will be lowercase only.
 */
#[post("/register", format = "json", data = "<reg>")]
pub async fn register(reg: Json<RegInfo>) -> status::Custom<content::Json<&'static str>> {
    let go: bool = crate::controllers::users::user_does_not_exist(reg.username.clone()).await;

    if go {
        let salt = crate::tools::createsalt::create_salt().await;

        // Salts the password with the characters from the 64 byte array
        let salted_string = format!("{}{}", reg.password, salt);

        // Hashes the Salted Password
        let hashed = crate::tools::hashstring::hash_string(salted_string).await;

        crate::controllers::users::create_user(reg.username.to_string(), hashed, salt).await;

        status::Custom(Status::Accepted, content::Json(""))
    } else {
        status::Custom(Status::Conflict, content::Json(""))
    }
}
