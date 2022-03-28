use crate::diesel::RunQueryDsl;
use crate::models::models::{NewUser, User};
use crate::models::schema::users;
use diesel::mysql::MysqlConnection;

pub fn create_user(
    conn: &MysqlConnection,
    username: String,
    password: String,
    salt: String,
) -> usize {
    let new_user = NewUser {
        username: username,
        userpass: password,
        salt: salt,
    };

    diesel::insert_into(users::table)
        .values(&new_user)
        .execute(conn)
        .expect("Failed to create user.")
}

pub fn check_if_exists(conn: &MysqlConnection, username: &'_ str) -> bool {
    let query = format!("SELECT * FROM users WHERE username = '{}';", username);

    let data = diesel::sql_query(query).load::<User>(conn).unwrap();

    if data.len() == 0 {
        true
    } else {
        false
    }
}
