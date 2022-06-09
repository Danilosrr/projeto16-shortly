import db from "../db.js";
import bcrypt from "bcrypt";

export async function signUp (req, res) {
    const user = req.body;

    try {
        if (user.password === user.confirmPassword){
            const hashPassword = await bcrypt.hashSync(user.password, 10);
            await db.query(`
                INSERT INTO users (email,name,password) VALUES ($1, $2, $3)
            `, [user.email, user.name , hashPassword]);
            res.sendStatus(201);
        } else {
            res.status(401).send("senhas não coincidem");
        }
    } catch (error) {
        console.log(error);
        res.status(422).send(error.detail);
    };
};