use rocket::http::Status;
use rocket::response::{content, status};
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct LoginForm<'r> {
    username: &'r str,
    pw: &'r str,
    iat: u32,
}

#[derive(Debug, Serialize)]
pub struct Claims<'r> {
    username: &'r str,
    iat: u32,
}

// TODO: Create a POST request that recieves username and password and attempt to login using those credientials
// TODO This will acquire a lot more integration with Diesel and MySQL than we have at the current time, which is 0.
#[post("/login", format = "json", data = "<args>")]
pub async fn login(args: Json<LoginForm<'_>>) -> status::Custom<content::Json<String>> {
    let go: bool = crate::controllers::users::check_if_exists(args.username).await;

    if go {
        let token_str =
            crate::tools::gentoken::gen_auth_key(args.username.to_string(), args.iat).await;

        let ret = format!("{{ \"Token\": \"{}\" }}", token_str);

        status::Custom(Status::Accepted, content::Json(ret))
    } else {
        status::Custom(Status::Unauthorized, content::Json("".to_string()))
    }
}
