import { db } from "../database/database.js";

async function insertNewShare({postId, userId}) {
    return db.query(`INSERT INTO share ("postId", "userId") VALUES ($1, $2);`, [ postId, userId ]);
}

export { insertNewShare };