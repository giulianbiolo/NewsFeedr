import dbManager from "~/managers/dbManager";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = new dbManager();

  try {
    db.putFeeds(body);
    return {statusCode: 200};
  } catch (err) {
    return {err}
  }
})
