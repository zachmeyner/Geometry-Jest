-- Your SQL goes here
CREATE TABLE users(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    username VARCHAR(12) NOT NULL COMMENT 'Username',
    userpass CHAR(32) NOT NULL COMMENT 'Salted Password',
    salt CHAR(32) NOT NULL COMMENT 'Salt for the users password',
    highscore int COMMENT 'Plyaers high score'
) DEFAULT CHARSET ascii COMMENT '';