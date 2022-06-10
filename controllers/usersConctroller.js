import db from "../db.js";

export async function getUsers (req, res) {
    const { id:usersId } = res.locals.user;
    const id = req.params.id;

    if (usersId == id) {
        const queryUserUrls = await db.query(`
            SELECT t1."usersId", 
            t1."name", 
            t2."sum" AS "totalViews", 
            t1."urlId", 
            t1."shortUrl", 
            t1.url,  
            t1."views" AS "visitCount" 
            FROM ( 
                SELECT "users".*, "shortenedUrls".id AS "urlId", "usersId", url, "shortUrl", "views"  
                FROM "users" JOIN "shortenedUrls" 
                ON users.id="shortenedUrls"."usersId"
            ) AS t1
            JOIN (
                SELECT SUM("views"),"usersId" 
                FROM "shortenedUrls" WHERE "shortenedUrls"."usersId" = $1
                GROUP BY "shortenedUrls"."usersId" 
            ) AS t2
            ON t1."usersId" = t2."usersId"
        `, [usersId]);
        
        if (queryUserUrls.rowCount === 0) {
            return res.sendStatus(404);
        } else {
            return res.status(200).send(responseQuery(queryUserUrls.rows));  
        };

    } else {
        return res.status(401).send('missing authorization')
    }
};

function responseQuery(rows){
    let response = 
    {
        "id": rows[0].usersId,
        "name": rows[0].name,
        "visitCount": rows[0].totalViews,
        "shortenedUrls": [
            rows.map(el => ({
                id: el.urlId,
                shortUrl: el.shortUrl,
                url: el.url,
                visitCount: el.visitCount,
                })
            )
        ]  
    }
    return response
};