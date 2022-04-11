use dotenv::dotenv;
use rocket::fs::NamedFile;
use rocket::http::Status;
use rocket::response::{content, status};
use std::io;
use std::path::{Path, PathBuf};
use crate::models::models::*;



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
#[get("/leaderboard")]
pub async fn leaderboard() -> status::Custom<content::Json< vector<crate::models::models::Entry> > > {
    let top = crate::controllers::users::get_top_ten().await;

    let top_return: vector<crate::models::models::Entry>;

    for i in top.len() {
        top_return[i].username = top[i].0;
        top_return[i].highscore = top[i].1;
    }

    status::Custom(Status::Accepted, top_return)
}
