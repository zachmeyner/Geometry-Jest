#[allow(dead_code)]
use rocket::serde::json::{json, Json, Value};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct UsrAns<'r> {
    question: u8,
    answer: &'r str,
}

#[post("/", format = "json", data = "<usrans>")]
pub async fn check(usrans: Json<UsrAns<'_>>) -> Value {
    println!("{:#?}", usrans);

    json! ({ "correct": true })
}
