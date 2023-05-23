import Feed from "~/models/feed";
import DbFeedManager from "~/server/managers/db/feedManager";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, };
  }

  let num = event.context.params?.num;
  const db = DbFeedManager.getInstance();

  if (num === undefined) {
    throw createError({ statusCode: 400, statusMessage: "num is required" });
  }

  let feeds: Feed[] = [];
  try {
    feeds = await db.getLastNFeeds(parseInt(num));
    return { status: 200, body: feeds };
  } catch (err) {
    return err;
  }
})
