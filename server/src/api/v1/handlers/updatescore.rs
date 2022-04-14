use rocket::http::Status;
use rocket::response::{content, status};
use rocket::serde::json::Json;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct UpdateScoreForm {
    username: String,
    token: String,
    highscore: i32,
}

#[put("/newscore", format = "json", data = "<args>")]
pub async fn new_score(args: Json<UpdateScoreForm>) -> status::Custom<content::Json<String>> {
    if crate::tools::gentoken::valid_token(&args.token).await {
        crate::controllers::users::update_score(&args.username, args.highscore).await;

        return status::Custom(Status::Accepted, content::Json("".to_string()));
    }

    status::Custom(Status::Unauthorized, content::Json("".to_string()))
}
