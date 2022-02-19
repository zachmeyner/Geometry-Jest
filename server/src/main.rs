#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
extern crate rocket_cors;

use dotenv::dotenv;
use rocket::fs::NamedFile;
// use rocket_contrib::serve::StaticFiles;
use std::io;
use std::path::{Path, PathBuf};
use std::str::FromStr;

// TODO: Get disel hooked up to mysql server given from .env file -Z
// TODO: Setup Rocket::config to get local ip and port from .env file -Z

// use rocket::http::Method;
use rocket_cors::AllowedOrigins;

// Retrieves frontend js for the webpage
#[get("/<file..>")]
async fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("../frontend/build/").join(file))
        .await
        .ok()
}

// Renders the webpage :)
#[get("/")]
async fn index() -> io::Result<NamedFile> {
    NamedFile::open("../frontend/build/index.html").await
}

// Function that launches the server.
// I spent way too many hours trying to figure out why cors couldn't attach just to learn that rocket_cors 0.5.2 didn't have Fairing implenmented for struct cors.
#[launch]
fn rocket() -> _ {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://0.0.0.0:8000",
    ]);
    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: ["Get", "Post"]
            .into_iter()
            .map(|s| FromStr::from_str(s).unwrap())
            .collect(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("Error creating CORS fairing");
    rocket::build()
        .mount("/", routes![index, files])
        .attach(cors)
}
