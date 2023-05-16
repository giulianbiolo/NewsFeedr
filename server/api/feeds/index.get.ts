import DbManager from "~/managers/dbManager";
import Feed from "~/models/feed";

export default defineEventHandler(async (_event) => {
  const db = DbManager.getInstance();

  try {
    const feeds: Feed[] = await db.getFeeds();
    return { statusCode: 200, feeds: feeds };
  } catch (err) {
    return { err }
  }
})
