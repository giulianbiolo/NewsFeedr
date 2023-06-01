import Feed from "~/models/feed";
import DbFeedManager from "~/server/managers/db/feedManager";
import {getServerSession} from "#auth";
import HttpResponse from "~/models/http_response";

export default defineEventHandler(async (event): Promise<HttpResponse>  => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, } as HttpResponse;
  }

  const db = DbFeedManager.getInstance();

  try {
    const feeds: Feed[] = await db.getFeeds();
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
