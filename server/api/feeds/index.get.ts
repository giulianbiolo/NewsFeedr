import Feed from "~/models/feed";
import DbFeedManager from "~/server/managers/db/feedManager";

export default defineEventHandler(async (_event) => {
  const db = DbFeedManager.getInstance();

  try {
    const feeds: Feed[] = await db.getFeeds();
    return { statusCode: 200, data: feeds };
  } catch (err) {
    return { err }
  }
})
