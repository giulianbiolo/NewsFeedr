import { Feed } from "~/models/feed";
import dbManager from "~/managers/dbManager"

export default defineEventHandler(async (_event) => {
  const db = new dbManager(); 
  const feeds: Feed[] = await db.getFeeds();

  return {
    feeds: feeds
  }
})
