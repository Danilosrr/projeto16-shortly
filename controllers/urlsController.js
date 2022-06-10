import db from "../db.js";
import { nanoid } from "nanoid";

export async function shortenedUrl (req, res) {
    const { id:usersId } = res.locals.user;
    const { url } = req.body;
    const shortUrl = nanoid(8);

   try {
        await db.query(`
            INSERT INTO "shortenedUrls" ("usersId",url,"shortUrl") 
            VALUES ($1, $2, $3) 
        `, [usersId,url,shortUrl]);
        res.status(201).send({shortUrl}); 
   } catch (error) {
        console.log(error);
        res.status(422).send(error.detail);
   }; 
};

export async function getIdUrl (req, res) {
    const id = req.params.id;
    
    const queryUrls = await db.query(`
        SELECT "usersId","shortUrl",url 
        FROM "shortenedUrls" 
        WHERE id=$1
    `, [id]);

    if (queryUrls.rowCount === 0){
        res.sendStatus(404);
    } else {
        res.status(200).send(queryUrls.rows[0]);
    };
};

export async function goToUrl (req, res) {
    const shortUrl = req.params.shortUrl;

    const queryUrls = await db.query(`
        SELECT url 
        FROM "shortenedUrls" 
        WHERE "shortUrl"=$1
    `, [shortUrl]);

    if (queryUrls.rowCount === 0){
        res.sendStatus(404);
    } else {
        await db.query(`
            UPDATE "shortenedUrls" 
            SET views = views+1 
            WHERE "shortUrl"=$1
        `, [shortUrl]);
        res.redirect(queryUrls.rows[0].url);
    };
};

export async function deleteUrl (req, res) {
    const urlId = req.params.id;
    const { id:usersId } = res.locals.user;
    
    const queryUserId = await db.query(`
        SELECT "usersId" 
        FROM "shortenedUrls" 
        WHERE "shortenedUrls".id=$1
    `, [urlId]);

    if ( queryUserId.rowCount === 0) {
        return res.status(404).send("Url doesnt exist");
    } else if (queryUserId.rows[0].usersId === usersId) {
        await db.query(`
            DELETE FROM "shortenedUrls"
            WHERE id=$1
        `, [urlId]);
        return res.status(204).send("url deleted");
    } else {
        return res.sendStatus(401);
    };
};