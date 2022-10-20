import { db } from "../database/database.js";

async function insertUser(email, name, password, picture) {
  return db.query(
    "INSERT INTO users (email,name,password,picture) VALUES ($1,$2,$3,$4)",
    [email, name, password, picture]
  );
}
async function getUserByEmail(email) {
  return db.query("SELECT * FROM users WHERE email = $1", [email]);
}
async function getUserByName(name) {
  return db.query("SELECT * FROM users WHERE name = $1", [name]);
}

export { insertUser, getUserByEmail, getUserByName };
