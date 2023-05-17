import DbFeedManager from "~/server/managers/db/feedManager";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = DbFeedManager.getInstance();

  try {
    db.putFeeds(body);
    return { statusCode: 200 };
  } catch (err) {
    return { err }
  }
})
