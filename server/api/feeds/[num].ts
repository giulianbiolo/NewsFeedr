import Feed from "~/models/feed";
import DbFeedManager from "~/server/managers/db/feedManager";
import { getServerSession } from "#auth";
import HttpResponse from "~/models/http_response";

export default defineEventHandler(async (event): Promise<HttpResponse> => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, } as HttpResponse;
  }

  let num = event.context.params?.num;
  const db = DbFeedManager.getInstance();

  if (num === undefined) {
    throw createError({ statusCode: 400, statusMessage: "num is required" });
  }

  let feeds: Feed[] = [];
  try {
    feeds = await db.getLastNFeeds(parseInt(num));
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
