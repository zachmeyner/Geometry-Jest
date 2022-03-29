use config::ConfigError;
use serde::Deserialize;

/**
 * Config structure
 * database_url: DATABASE_URL environment variable
 * access_token_string: ACCESS_TOKEN_STRING environment variable
 * refresh_token_string: REFRESH_TOKEN_STRING environment variable
 */
#[derive(Deserialize, Debug, Clone)]
pub struct Config {
    pub database_url: String,
    pub access_token_secret: String,
    pub refresh_token_secret: String,
}

/**
 * Used to bind environment variables to Config structure
 * Outputs a Result that is either the Config structure with the environment variables bound, or ConfigError
 */
impl Config {
    pub fn from_env() -> Result<Self, ConfigError> {
        let mut cfg = config::Config::new();
        cfg.merge(config::Environment::new())?;
        cfg.try_into()
    }
}
