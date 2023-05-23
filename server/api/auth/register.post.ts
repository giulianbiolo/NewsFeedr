import DbAuthManager from "~/server/managers/db/authManager";
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = DbAuthManager.getInstance();

  try {
    const hashPassword = async (password: string): Promise<string> => {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    };

    body.password = await hashPassword(body.password);
    await db.register(body);

    return { statusCode: 200 };

  } catch (err) {
    return { err }
  }
})
