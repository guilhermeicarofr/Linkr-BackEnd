import { db } from "../database/database.js";

async function insertNewShare({postId, userId}) {
    return db.query(`INSERT INTO share ("postId", "userId") VALUES ($1, $2);`, [ postId, userId ]);
}

async function countPostShares(postId) {
    return db.query(`SELECT COUNT(share.id) AS "shareCount" FROM share WHERE share."postId"=$1;`, [ postId ]);
}

export { insertNewShare, countPostShares };