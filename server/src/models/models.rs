use super::schema::users;

/**
 * User structure
 * Represents users in database
 * id: User's ID
 * username: Username
 * userpass: user's password (HASHED)
 * salt: salt for the user's password
 * highscore: The users highest score (New users have no highscore)
 */
#[derive(QueryableByName, Queryable, Debug, Clone)]
#[table_name = "users"]
pub struct User {
    pub id: i32,
    pub username: String,
    pub userpass: String,
    pub salt: String,
    pub highscore: Option<i32>,
}

/**
 * NewUser structure
 * Used to insert a new user into the users database
 * username: Username
 * userpass: user's password (HASHED)
 * salt: salt for the user's password
 */
#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser {
    pub username: String,
    pub userpass: String,
    pub salt: String,
}



//Big Yikes! What does serialize even mean? 0.o
/**
 * Entry
 * Used to send data from database to the frontend
 * 
 * 
*/
#[derive(Debug, Serialize, Queryable, Clone, QueryableByName)]
pub struct Entry {
    username: String,
    highscore: i32
}