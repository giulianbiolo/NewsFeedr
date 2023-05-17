import Feed from "~/models/feed";
import DbFeedManager from "~/server/managers/db/feedManager";
import DbMagazineManager from "~/server/managers/db/magazineManager";
import HttpFeedManager from "~/server/managers/http/feedManager";

export default defineEventHandler(async (event) => {
  let num = event.context.params?.num;
  const magazineManager = DbMagazineManager.getInstance();

  if (num === undefined) {
    throw createError({ statusCode: 400, statusMessage: "num is required" });
  }

  try {
    const magazine = await magazineManager.getMagazine(parseInt(num));
    const httpFeedManager = new HttpFeedManager(magazine.url || "");
    const feeds = await httpFeedManager.getFeeds();

    // Save feeds on the database
    const dbFeedManager: DbFeedManager = DbFeedManager.getInstance();
    for (let feed of feeds) {
      feed.progr_magazine = magazine.progr;
    }
    dbFeedManager.putFeeds(feeds);

    return { statusCode: 200, body: feeds };
  } catch (err) {
    return err;
  }
})
