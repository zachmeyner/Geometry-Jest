use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use dotenv::dotenv;

pub async fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let config = crate::tools::config::Config::from_env().unwrap();

    MysqlConnection::establish(&config.database_url)
        .expect(&format!("Error connecting to {}", &config.database_url))
}
