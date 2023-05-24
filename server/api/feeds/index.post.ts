import DbFeedManager from "~/server/managers/db/feedManager";
import { getServerSession } from "#auth";
import HttpResponse from "~/models/http_response";

export default defineEventHandler(async (event): Promise<HttpResponse> => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, } as HttpResponse;
  }

  const body = await readBody(event);
  const db = DbFeedManager.getInstance();

  try {
    await db.putFeeds(body);
    return { statusCode: 200 } as HttpResponse;
  } catch (err) {
    return { err } as HttpResponse;
  }
})
