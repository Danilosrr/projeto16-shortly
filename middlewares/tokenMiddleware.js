import db from "../db.js";

export async function verifyToken (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    const queryUser = await db.query(`
        SELECT users.id, users."email", users."name" 
        FROM sessions JOIN users ON users.id = sessions."usersId" 
        WHERE "token" = $1
    `, [token]);

    if (queryUser.rowCount === 0) {
        return res.status(401).send('missing authorization');
    } else {
        res.locals.user = queryUser.rows[0];
        next();
    };
};