use rocket::fs::NamedFile;
use std::io;
use std::path::{Path, PathBuf};
use dotenv::dotenv;

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
