import bcrypt from "bcrypt";

import { insertUser, getUserByEmail } from "../repositories/auth.repositories.js";

async function signUp(req, res) {
  const { email, name, password, picture } = res.locals.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const user = await getUserByEmail(email);
    if (user.rowCount !== 0) return res.sendStatus(409);
    await insertUser(email, name, passwordHash, picture);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { signUp };
