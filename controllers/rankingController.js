import db from "../db.js";

export async function getRanking (req, res) {
    const queryRanking = await db.query(`
        SELECT users.id,
        users.name,
        t2."linksCount",
        t1."visitsCount"
        FROM "users" 
        JOIN (
            SELECT SUM("views") AS "visitsCount","usersId" 
            FROM "shortenedUrls"
            GROUP BY "shortenedUrls"."usersId"
        ) AS t1 ON t1."usersId" = "users".id
        JOIN (
            SELECT COUNT("shortUrl") AS "linksCount", "usersId"
            FROM "shortenedUrls"
            GROUP BY "usersId"
        ) AS t2 ON t2."usersId" = "users".id
        ORDER BY "visitsCount" DESC LIMIT 10
    `)
    return res.status(200).send(queryRanking.rows);
}