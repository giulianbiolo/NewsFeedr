import Feed from "~/models/feed";
import Magazine from "~/models/magazine";
import DbFeedManager from "~/server/managers/db/feedManager";
import DbMagazineManager from "~/server/managers/db/magazineManager";

export default defineEventHandler(async (event) => {
  let num = event.context.params?.num;
  const magazineManager = DbMagazineManager.getInstance();
  const feedManager = DbFeedManager.getInstance();

  if (num === undefined) {
    throw createError({ statusCode: 400, statusMessage: "num is required" });
  }

  let magazine: Magazine;
  try {
    magazine = await magazineManager.getMagazine(parseInt(num));
  } catch (err) {
    return err;
  }

  try {
    const feeds: Feed[] = await feedManager.getFeedForMagazine(magazine.progr || 0);
    return { statusCode: 200, data: feeds };
  } catch (err) {
    return err;
  }

})
