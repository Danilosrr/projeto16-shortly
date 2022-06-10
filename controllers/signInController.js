import db from "../db.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export async function signIn (req, res) {
    const user = req.body;

    try {
        const queryPassword = await db.query(`
            SELECT id,"password" FROM "users" WHERE users.email = $1
        `, [user.email]);
        const { password, id:usersId } = queryPassword.rows[0];

        if (bcrypt.compareSync(user.password, password)) {
            const token = nanoid();
            const insertSession = await db.query(`
                INSERT INTO "sessions" ("usersId",token,"createdAt") VALUES ($1, $2, DEFAULT) 
            `, [usersId, token]);
            return res.status(200).send(token);
        } else {
            console.log(user.password,bcrypt.compareSync(password, user.password))
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send(error.detail);
    };
};