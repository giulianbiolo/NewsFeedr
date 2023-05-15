import { Feed } from "~/models/feed";
import dbManager from "~/managers/dbManager";

export default defineEventHandler(async (event) => {
  let num = event.context.params?.num;

  if (num === undefined) {
    throw createError({ statusCode: 400, statusMessage: "num is required" });
  }

  const db = new dbManager();
  const feeds: Feed[] = await db.getFeeds();

  let intNum = parseInt(num);
  if (intNum < 0 || intNum > feeds.length) {
    throw createError({ statusCode: 400, statusMessage: "num is out of range" });
  }

  return {
    feeds: feeds.slice(0, intNum),
  }
})
