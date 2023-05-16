import Feed from "~/models/feed";
import DbManager from "~/server/managers/dbManager";

export default defineEventHandler(async (_event) => {
  const db = DbManager.getInstance();

  try {
    const feeds: Feed[] = await db.getFeeds();
    return { statusCode: 200, feeds: feeds };
  } catch (err) {
    return { err }
  }
})
