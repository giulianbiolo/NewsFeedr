import Feed from "~/models/feed";
import Magazine from "~/models/magazine";
import DbFeedManager from "~/server/managers/db/feedManager";
import DbMagazineManager from "~/server/managers/db/magazineManager";
import HttpFeedManager from "~/server/managers/http/feedManager";
import { getServerSession } from "#auth";
import HttpResponse from "~/models/http_response";

export default defineEventHandler(async (event): Promise<HttpResponse> => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, } as HttpResponse;
  }

  const magazineManager = DbMagazineManager.getInstance();

  let magazines: Magazine[];
  try {
    magazines = await magazineManager.getMagazines();
  } catch (err) {
    return { err } as HttpResponse;
  }

  let allFeeds: Feed[] = [];

  for (let magazine of magazines) {
    try {
      const httpFeedManager = new HttpFeedManager(magazine.url || "");
      const feeds = await httpFeedManager.getFeeds();

      // Save feeds on the database
      const dbFeedManager: DbFeedManager = DbFeedManager.getInstance();
      for (let feed of feeds) {
        feed.progr_magazine = magazine.progr;
      }
      dbFeedManager.putFeeds(feeds);

      allFeeds = allFeeds.concat(feeds);
    } catch (err) { }
  }

  return { statusCode: 200, data: allFeeds } as HttpResponse;
})
