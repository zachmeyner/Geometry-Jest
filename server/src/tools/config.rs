use config::ConfigError;
use serde::Deserialize;

#[derive(Deserialize, Debug, Clone)]
pub struct Config {
    pub database_url: String,
    pub access_token_secret: String,
    pub refresh_token_secret: String,
    // pub server: ServerConfig, // TODO: Add the rest later, wanna get db first
}

impl Config {
    pub fn from_env() -> Result<Self, ConfigError> {
        let mut cfg = config::Config::new();
        cfg.merge(config::Environment::new())?;
        cfg.try_into()
    }
}
