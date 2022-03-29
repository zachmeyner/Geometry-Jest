use rocket::http::Status;
use rocket::response::{content, status};
use rocket::serde::json::Json;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct RegInfo<'r> {
    username: &'r str,
    password: &'r str,
}

// Takes in a username and password, salts then hashes the password.
// This will also automatically log the user in and create a JWT.
// I am assuming that all usernames coming from the frontend will be lowercase only.
// TODO Add JWT Signing after auto-login.
#[post("/register", format = "json", data = "<reg>")]
pub async fn register(reg: Json<RegInfo<'_>>) -> status::Custom<content::Json<&'static str>> {
    if crate::controllers::users::check_if_exists(
        &crate::tools::establish::establish_connection(),
        reg.username,
    ) {
        let salt = crate::tools::createsalt::create_salt().await;

        // Salts the password with the characters from the 64 byte array
        let salted_string = format!("{}{}", reg.password, salt);

        // Hashes the Salted Password
        let hashed = crate::tools::hashstring::hash_string(salted_string).await;

        // println!("{:#?} \n {:?}", salted_string, _hash);

        // * Temporary output until everything starts coming together

        crate::controllers::users::create_user(
            &crate::tools::establish::establish_connection(),
            reg.username.to_string(),
            hashed,
            salt,
        );

        status::Custom(Status::Accepted, content::Json("{ \"Created\": true }"))
    } else {
        status::Custom(Status::Conflict, content::Json("{ \"Created\": false }"))
    }
}
