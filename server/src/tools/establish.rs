use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use dotenv::dotenv;

/**
 * Connect to the database
 * Database url is retrieved from environment variables
 * Outputs a connection to a mySQL database
 */
pub async fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let config = crate::tools::config::Config::from_env().unwrap();

    MysqlConnection::establish(&config.database_url)
        .expect(&format!("Error connecting to {}", &config.database_url))
}
