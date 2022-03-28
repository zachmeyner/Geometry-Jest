table! {
    users (id) {
        id -> Integer,
        username -> Varchar,
        userpass -> Char,
        salt -> Char,
        highscore -> Nullable<Integer>,
    }
}
