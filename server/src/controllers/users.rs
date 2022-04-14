use crate::diesel::RunQueryDsl;
use crate::models::models::*;
use crate::models::schema::users;
use diesel::sql_types::Integer;
use diesel::types::Char;
use std::vec::Vec;

/**
 * Function used to add a new user to the database
 * Takes username, password, and salt for username to add to the database
 */
pub async fn create_user(username: &String, password: &String, salt: &String, score: i32) {
    let new_user = NewUser {
        username: username.to_string(),
        userpass: password.to_string(),
        salt: salt.to_string(),
        highscore: score,
    };

    let conn = crate::tools::establish::establish_connection().await;

    diesel::insert_into(users::table)
        .values(&new_user)
        .execute(&conn)
        .expect("Failed to create user.");
}

/**
 * Checks if a user exists in the database
 * Takes in the username to check the database for.
 * Returns true if the user is NOT in the database
 * Returns false if the user IS in the database
 */
pub async fn user_does_not_exist(username: &String) -> bool {
    let conn = crate::tools::establish::establish_connection().await;

    let data = diesel::sql_query("SELECT * FROM users WHERE username = ?;")
        .bind::<Char, _>(username)
        .load::<User>(&conn)
        .unwrap();

    if data.len() == 0 {
        true
    } else {
        false
    }
}

/**
 * Gets salt for a given username
 * Takes in username to check in the database
 * Outputs string that is the users salt
 * * This function should NEVER be called before user_does_not_exist
 */
pub async fn get_salt(username: &String) -> String {
    let conn = crate::tools::establish::establish_connection().await;

    let data = diesel::sql_query("SELECT salt FROM users WHERE username = ?;")
        .bind::<Char, _>(username)
        .load::<UserSalt>(&conn)
        .unwrap();

    return data[0].salt.clone();
}

/**
 * Gets hashed password for given username
 * Takes in username to check the database
 * Outputs string that is the users hashed password
 * * This function should NEVER be called before user_does_not_exist
 */
pub async fn get_hashpass(username: &String) -> String {
    let conn = crate::tools::establish::establish_connection().await;

    let data = diesel::sql_query("SELECT userpass FROM users WHERE username = ?;")
        .bind::<Char, _>(username)
        .load::<UserHash>(&conn)
        .unwrap();

    return data[0].userpass.clone();
}

/**
 * Gets the points for a given user
 * Takes in username to check the database
 * Outputs high score from the users database row
 * * This function should never be called before user_does_not_exist
 */
pub async fn get_points(username: &String) -> i32 {
    let conn = crate::tools::establish::establish_connection().await;

    let data = diesel::sql_query("SELECT * FROM users WHERE username = ?;")
        .bind::<Char, _>(username)
        .load::<UserScore>(&conn)
        .unwrap();

    data[0].highscore
}

/**
 * Gets the top ten highscores from the database
 * No input
 * Outputs a vector with the ten highest scores, and the username with it
 */
pub async fn get_top_ten() -> Vec<Entry> {
    let conn = crate::tools::establish::establish_connection().await;

    let mut data = diesel::sql_query(
        "SELECT username, highscore FROM users ORDER BY highscore desc LIMIT 10;",
    )
    .load::<Entry>(&conn)
    .unwrap();

    if data.len() < 10 {
        let default = Entry {
            username: "NO SCORE".to_string(),
            highscore: 0,
        };
        while data.len() != 10 {
            data.push(default.clone());
        }
    }
    data
}

pub async fn update_score(username: &String, new_score: i32) {
    let conn = crate::tools::establish::establish_connection().await;

    diesel::sql_query("UPDATE users SET highscore = ? WHERE username = ?;")
        .bind::<Integer, _>(new_score)
        .bind::<Char, _>(username)
        .execute(&conn)
        .unwrap();
}
