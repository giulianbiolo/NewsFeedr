import dbManager from "~/managers/dbManager";
import Feed from "~/models/feed";

export default defineEventHandler(async (event) => {
  let num = event.context.params?.num;
  const db = new dbManager();

  if (num === undefined) {
    throw createError({ statusCode: 400, statusMessage: "num is required" });
  }

  let feeds: Feed[] = [];
  try {
    feeds = await db.getFeeds();
  } catch (err) {
    return err;
  }

  let intNum = parseInt(num);
  if (intNum < 0 || intNum > feeds.length) {
    throw createError({ statusCode: 400, statusMessage: "num is out of range" });
  }

  return { statusCode: 200, feeds: feeds.slice(0, intNum), };
})
