import Feed from "~/models/feed";
import Magazine from "~/models/magazine";
import DbFeedManager from "~/server/managers/db/feedManager";
import DbMagazineManager from "~/server/managers/db/magazineManager";
import { getServerSession } from "#auth";
import HttpResponse from "~/models/http_response";

export default defineEventHandler(async (event): Promise<HttpResponse> => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, } as HttpResponse;
  }

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
    return { err } as HttpResponse;
  }

  try {
    const feeds: Feed[] = await feedManager.getFeedForMagazine(magazine.progr || 0);
    return { statusCode: 200, data: feeds } as HttpResponse;
  } catch (err) {
    const httpError = err as HttpResponse;
    return {
      statusCode: httpError.statusCode,
      error: httpError.statusMessage,
      statusMessage: httpError.statusMessage
    };
  }

})
