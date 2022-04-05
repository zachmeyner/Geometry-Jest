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
#[get("/leaderboard")]
pub async fn leaderboard() -> status::Custom<content::Json<String>> {
    let top = crate::controllers::users::get_top_ten().await;

    // println!("{:#?}", top);
    let mut output_string: String = "{".to_string();

    for i in 0..top.len() {
        output_string = output_string
            + "\n\""
            + i.to_string().as_str()
            + "\": {\n"
            + "\"username\": "
            + "\""
            + &top[i].0
            + "\",\n\"score\": "
            + &top[i].1.to_string().as_str()
            + "\n}";

        if i != 9 {
            output_string = output_string + ","
        }
    }

    output_string = output_string + "\n}";

    status::Custom(Status::Accepted, content::Json(output_string))
}
