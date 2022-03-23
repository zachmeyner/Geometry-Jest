#[allow(dead_code)]
use rocket::serde::json::{json, Json, Value};
use serde::Deserialize;

static PLANE: &'static str = "plane";
static POINT: &'static str = "point";
static LINE: &'static str = "line";

// Struct for answer.
#[derive(Debug, Deserialize)]
pub struct UsrAns<'r> {
    question: u16,
    answer: &'r str,
}

// Check answer to given question (Done on backend so I have an excuse for more work to do)
// TODO: Make check call solve and return the solution to the frontend.
// ? Can you have multiple POSTs on the same address? Like can I have a post for /<login> here too that returns a cookie
#[post("/", format = "json", data = "<usrans>")]
pub async fn check(usrans: Json<UsrAns<'_>>) -> Value {
    println!("{:#?}", usrans);
    let sol = solve(&usrans);

    // * Temporary output until everything starts coming together
    json! ({ "correct": true })
}

// Function that compares the answer with question # to see if it's right.
// * Question number is based on original VB code. For instance [1][2][3] will be ques = 123
// Returns a boolean
// TODO: Rewrite all of his check cases in this match statement (If you have a better solution let me know)
fn solve(ans: &Json<UsrAns<'_>>) -> Option<bool> {
    // * In rust match is equivalent to switch
    match ans.question {
        111 => {
            if ans.answer == PLANE {
                Some(true)
            } else {
                Some(false)
            }
        }
        112 => {
            if ans.answer == LINE {
                Some(true)
            } else {
                Some(false)
            }
        }
        113 => {
            if ans.answer == LINE {
                Some(true)
            } else {
                Some(false)
            }
        }
        121 => {
            if ans.answer == LINE {
                Some(true)
            } else {
                Some(false)
            }
        }
        _ => None,
    }
}
