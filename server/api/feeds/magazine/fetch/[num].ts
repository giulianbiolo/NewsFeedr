import DbFeedManager from "~/server/managers/db/feedManager";
import DbMagazineManager from "~/server/managers/db/magazineManager";
import HttpFeedManager from "~/server/managers/http/feedManager";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, };
  }

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
