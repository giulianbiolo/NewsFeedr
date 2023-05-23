import Feed from "~/models/feed";
import DbFeedManager from "~/server/managers/db/feedManager";
import {getServerSession} from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, };
  }

  const db = DbFeedManager.getInstance();

  try {
    const feeds: Feed[] = await db.getFeeds();
    return { statusCode: 200, data: feeds };
  } catch (err) {
    return { err }
  }
})
