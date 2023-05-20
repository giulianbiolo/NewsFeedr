import DbFeedManager from "~/server/managers/db/feedManager";
import {getServerSession} from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, };
  }

  const body = await readBody(event);
  const db = DbFeedManager.getInstance();

  try {
    db.putFeeds(body);
    return { statusCode: 200 };
  } catch (err) {
    return { err }
  }
})
