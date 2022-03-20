use rocket::fs::NamedFile;
use std::io;
use std::path::{Path, PathBuf};

// Retrieves frontend js for the webpage

#[get("/<file..>")]
pub async fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("../frontend/build/").join(file))
        .await
        .ok()
}

// Renders the webpage :)
#[get("/")]
pub async fn index() -> io::Result<NamedFile> {
    NamedFile::open("../frontend/build/index.html").await
}
