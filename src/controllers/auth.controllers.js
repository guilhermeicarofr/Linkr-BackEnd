import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  insertUser,
  getUserByEmail,
  getUserByName,
} from "../repositories/auth.repositories.js";

async function signUp(req, res) {
  const { email, name, password, picture } = res.locals.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const user = await getUserByEmail(email);
    if (user.rowCount !== 0) return res.sendStatus(409);
    const nameUser = await getUserByName(name);
    if (nameUser.rowCount !== 0) return res.sendStatus(409);
    await insertUser(email, name, passwordHash, picture);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
async function signIn(req, res) {
  const { email, password } = res.locals.body;
  try {
    const user = await getUserByEmail(email);
    if (
      user.rowCount !== 0 &&
      bcrypt.compareSync(password, user.rows[0].password)
    ) {
      const token = jwt.sign(
        {
          userId: user.rows[0].id,
          picture: user.rows[0].picture,
          name: user.rows[0].name,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).send(token);
    }
    res.sendStatus(401);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { signUp, signIn };
