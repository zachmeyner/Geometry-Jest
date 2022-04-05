use crate::diesel::RunQueryDsl;
use crate::models::models::{NewUser, User};
use crate::models::schema::users;
use diesel::types::Char;

/**
 * Function used to add a new user to the database
 * Takes username, password, and salt for username to add to the database
 */
pub async fn create_user(username: String, password: String, salt: String) {
    let new_user = NewUser {
        username: username,
        userpass: password,
        salt: salt,
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
 * ? Should this be reversed? Give me your opinion by leaving a comment in discord
 */
pub async fn user_does_not_exist(username: &'_ str) -> bool {
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
pub async fn get_salt(username: &'_ str) -> String {
    let conn = crate::tools::establish::establish_connection().await;

    let data = diesel::sql_query("SELECT * FROM users WHERE username = ?;")
        .bind::<Char, _>(username)
        .load::<User>(&conn)
        .unwrap();

    return data[0].salt.clone();
}

/**
 * Gets hashed password for given username
 * Takes in username to check the database
 * Outputs string that is the users hashed password
 * * This function should NEVER be called before user_does_not_exist
 */
pub async fn get_hashpass(username: &'_ str) -> String {
    let conn = crate::tools::establish::establish_connection().await;

    let data = diesel::sql_query("SELECT * FROM users WHERE username = ?;")
        .bind::<Char, _>(username)
        .load::<User>(&conn)
        .unwrap();

    return data[0].userpass.clone();
}

/**
 * Gets the points for a given user
 * Takes in username to check the database
 * Outputs high score from the users database row
 * * This function should never be called before user_does_not_exist
 */
pub async fn get_points(username: &'_ str) -> i32 {
    let conn = crate::tools::establish::establish_connection().await;

    let data = diesel::sql_query("SELECT * FROM users WHERE username = ?;")
        .bind::<Char, _>(username)
        .load::<User>(&conn)
        .unwrap();

    data[0].highscore.unwrap_or(0)
}
