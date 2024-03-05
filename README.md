# Geometry-Jest
CS408 Semester Project

Geometry Jest is to be a web based game for learning about the interactions between points lines and planes.

## Basic Info

The website has a backend server built in Rust using the Rocket Framework. The server interacts with a mySQL database using Diesel. The frontend is built in JS with React.

## Build Instructions
Install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) onto your computer. I think it's best if we do all builds in there. It works on all versions of Windows 10 Home.

### Prerequisites

1. Rust
    1. If you're on WSL run 
        ```bash
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
        rustup default nightly
        ```
        in the terminal. This will install rust and set it to the nightly release (might be required for rocket, also cooler).
    2. (Optional) Install cargo watch with 
        ```bash
        cargo install cargo-watch
        ```
        This will let you edit code and have the server running at the same time, when you save the server will rebuild automatically (more on that later).

        I  needed to run sudo apt-get install libmysqlclient-dev to do cargo run 
2. NodeJS (npm)
    1. Install and update npm/NodeJS with 
        ```bash
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        ```
    2.  Restart after running this command then run 
        ```bash
        nvm install 17
        ```
        This will install nvm (Node Version Manager) and NodeJS 17.x.
        
    3.  To confirm that npm and NodeJS were installed you can run
        ```bash
        npm --verison
        node -v
        ```
        These commands will return the npm version (currently 8.x) and NodeJS version (17.x) respectively.
   4. Install required packages
        ```
        npm install
        ```
3. MySQL
    1. Create a mySQL table with columns

        | id | username | userpass | salt | highscore |
        
        Where id is a Primary Key int, username is a varchar(12) userpass is a char(64), salt is a char(32), and highscore is int.
        

### Frontend
----
Go into the frontend directory.

To test the frontend with no backend support run
```bash
npm ci
npm start
```
This will start a the frontend portion of the webpage on [localhost:3000](localhost:3000).

To build the frontend fully run
```bash
npm run build
```
This will create a `build` directory that the backend will need to host the webpages.

### Server
---
Go into the server directory

Edit `.env.example` file and remove `.example` to suit your use.

My .env file 
```.env
DATABASE_URL=jdbc:mysql://localhost:3306/geojest
SERVER.HOST=127.0.0.1
SERVER.PORT=8000
```
To run the server run the command
```bash
cargo run
```
This will do nothing but run the server. This is dependent on a build being present at `../frontend/build` being present. 

If you would like to run the server and have it automatically rebuild on changes use 
```bash
cargo watch -x run
```
This is of course reliant on `cargo-watch` being installed. 
