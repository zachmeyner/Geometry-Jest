use super::schema::users;

#[derive(Queryable)]
struct Users {
    pub id: i32,
    pub username: String,
    pub userpass: String,
    pub salt: String,
    pub highscore: i32,
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser {
    pub username: String,
    pub userpass: String,
    pub salt: String,
}
