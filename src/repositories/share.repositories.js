import { db } from "../database/database.js";

async function insertNewShare({postId, userId}) {
    return db.query(`INSERT INTO share ("postId", "userId") VALUES ($1, $2);`, [ postId, userId ]);
}

async function countPostShares(postId) {
    return db.query(`SELECT COUNT(share.id) AS "shareCount" FROM share WHERE share."postId"=$1;`, [ postId ]);
}

async function getSharebyId(shareId) {
    return db.query(`
        SELECT 
            p."userId" AS "userId",
            u.name,
            u.picture,
            p.id AS "postId",
            p.description,
            p.url,
            s."createdAt",
            s.id AS "shareId",
            s."userId" AS "shareUserId",
            us."name" AS "shareUserName"
        FROM share s
        JOIN users us ON s."userId"=us.id
        JOIN posts p ON s."postId"=p.id
        JOIN users u ON p."userId"=u.id
        WHERE p."deletedAt" IS NULL AND s.id=$1;
        ;`, [ shareId ]);
}

async function deleteShare(shareId) {
    return db.query(`
        UPDATE share
        SET "deletedAt"=NOW()
        WHERE id=$1
        ;`, [shareId]);
}

export { insertNewShare, countPostShares, getSharebyId, deleteShare };