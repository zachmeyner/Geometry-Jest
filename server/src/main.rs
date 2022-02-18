#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
extern crate rocket_cors;

use dotenv::dotenv;
use rocket::response::NamedFile;
//use rocket_contrib::serve::StaticFiles;
use std::io;
use std::path::{Path, PathBuf};

// TODO: See of cors is actually neccessary, everything commented out may or may not be needed. So for now I'm leaving it in.
// TODO: If we need the cors again it is as simple as delete these comments.

//use rocket::http::Method;
//use rocket_cors::{AllowedHeaders, AllowedOrigins, Cors, CorsOptions, Error};

/*fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://0.0.0.0:8000",
    ]);

    CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&[
            "Authorization",
            "Accept",
            "Access-Control-Allow-Origin",
        ]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("error while building CORS")
}*/

#[get("/<file..>")]
fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("../frontend/build/").join(file)).ok()
}

#[get("/")]
fn index() -> io::Result<NamedFile> {
    NamedFile::open("../frontend/build/index.html")
}

fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/", routes![index, files])
       // .attach(make_cors())
}

fn main() {
    rocket().launch();
}
