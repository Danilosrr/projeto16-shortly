import db from "../db.js";
import bcrypt from "bcrypt";

export async function signUp (req, res) {
    const user = req.body;

    try {
        const hashPassword = await bcrypt.hashSync(user.password, 10);
        await db.query(`
        INSERT INTO users (email,name,password) VALUES ($1, $2, $3)
        `, [user.email, user.name , hashPassword]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error.detail)
        res.status(422).send(error);
    };
};