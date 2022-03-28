// TODO: Get disel hooked up to mysql server given from .env file -Z
// TODO: Setup Rocket::config to get local ip and port from .env file -Z

#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate rocket_cors;
extern crate serde_derive;

use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use rocket::routes;
use rocket_cors::AllowedOrigins;
use std::str::FromStr;

// Module for apis.
mod api;
// Module for tools
mod tools;
// DB Models
mod models;
// DB Controllers
mod controllers;

pub fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let config = crate::tools::config::Config::from_env().unwrap();

    MysqlConnection::establish(&config.database_url)
        .expect(&format!("Error connecting to {}", &config.database_url))
}

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
        allowed_methods: ["Get", "Post", "Put"]
            .into_iter()
            .map(|s| FromStr::from_str(s).unwrap())
            .collect(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("Error creating CORS fairing");
    rocket::build()
        .mount(
            "/",
            routes![
                api::v1::handlers::landing::index,
                api::v1::handlers::landing::files,
                api::v1::handlers::register::register
            ],
        )
        .attach(cors)
}
