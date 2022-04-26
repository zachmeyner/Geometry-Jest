use dotenv::dotenv;
use rocket::fs::NamedFile;
use rocket::http::Status;
use rocket::response::{content, status};
use std::io;
use std::path::{Path, PathBuf};

// Retrieves frontend js for the webpage
#[get("/<file..>")]
pub async fn files(file: PathBuf) -> Option<NamedFile> {
    dotenv().ok();
    let config = crate::tools::config::Config::from_env().unwrap();

    NamedFile::open(Path::new(config.front_end_dir.as_str()).join(file))
        .await
        .ok()
}

// Renders the webpage :)
#[get("/")]
pub async fn index() -> io::Result<NamedFile> {
    dotenv().ok();
    let config = crate::tools::config::Config::from_env().unwrap();
    let path = format!("{}/index.html", config.front_end_dir);

    NamedFile::open(path.as_str()).await
}

// Sends the frontend the leaderboard stats.
#[post("/leaderboard")]
pub async fn leaderboard() -> status::Custom<content::Json<String>> {
    let high_scores = crate::controllers::users::get_top().await;

    let ret_string = serde_json::to_string(&high_scores).unwrap();

    status::Custom(Status::Accepted, content::Json(ret_string))
}
