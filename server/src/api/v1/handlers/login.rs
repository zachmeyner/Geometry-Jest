use rocket::http::Status;
use rocket::response::{content, status};
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};

/**
 * Login Form Structure
 * JSON input recieved from frontend
 * username: input username
 * pw: input password
 * iat: UNIX timestamp for when user sent login request
 */

#[derive(Debug, Deserialize, Serialize)]
pub struct LoginForm {
    username: String,
    pw: String,
    iat: f64,
}

#[derive(Debug, Serialize)]
pub struct LoginReturn {
    token: String,
    current_points: i32,
}

/**
 * Takes in username, password, and 32 bit UNIX timestamp of login
 * See if the user is a valid user in the database
 * If user is a valid user in the database check if the password is correct
 * If the password is correct return JWT
 * * Username coming from the frontend should be lowercase only
 */
#[post("/login", format = "json", data = "<args>")]
pub async fn login(args: Json<LoginForm>) -> status::Custom<content::Json<String>> {
    let go: bool = crate::controllers::users::user_does_not_exist(args.username.clone()).await;

    if !go {
        let salt = crate::controllers::users::get_salt(args.username.clone()).await;
        let hashpass = crate::controllers::users::get_hashpass(args.username.clone()).await;

        let salted_string = format!("{}{}", args.pw, salt);

        let hashed = crate::tools::hashstring::hash_string(salted_string).await;

        if hashed == hashpass {
            let ret_struct = LoginReturn {
                token: crate::tools::gentoken::gen_auth_key(args.username.to_string(), args.iat)
                    .await,
                current_points: crate::controllers::users::get_points(args.username.clone()).await,
            };

            let ret_string = serde_json::to_string(&ret_struct).unwrap();

            // let token_str =
            // crate::tools::gentoken::gen_auth_key(args.username.to_string(), args.iat).await;
            // let points = crate::controllers::users::get_points(args.username).await;

            // let ret = format!(
            //     "{{ \"Token\": \"{}\",\n\"CurrentPoints\": {} }}",
            //     token_str, points
            // );

            status::Custom(Status::Accepted, content::Json(ret_string))
        } else {
            status::Custom(Status::Unauthorized, content::Json("".to_string()))
        }
    } else {
        status::Custom(Status::Unauthorized, content::Json("".to_string()))
    }
}
