use crate::diesel::RunQueryDsl;
use crate::models::models::NewUser;
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
        .expect("Help")
}
