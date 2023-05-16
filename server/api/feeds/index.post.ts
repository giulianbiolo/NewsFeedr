import DbManager from "~/server/managers/dbManager";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = DbManager.getInstance();

  try {
    db.putFeeds(body);
    return { statusCode: 200 };
  } catch (err) {
    return { err }
  }
})
