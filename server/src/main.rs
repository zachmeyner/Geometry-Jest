#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate rocket_cors;
extern crate serde_derive;

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

/**
 * Main launch function for the webserver
 * Bind allowed origins for CORS
 * Mounts the routes in the server and attaches CORS
 */
#[launch]
fn rocket() -> _ {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://0.0.0.0:8000",
        "https://geometryjest.zacharymeyner.com/",
        "https://cs323.cs.edinboro.edu/~geometryJest/",
    ]);
    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: ["Get", "Post", "Put", "Options"]
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
                api::v1::handlers::landing::leaderboard,
                api::v1::handlers::register::register,
                api::v1::handlers::register::register_with_score,
                api::v1::handlers::login::login,
                api::v1::handlers::updatescore::new_score,
            ],
        )
        .attach(cors)
}
