import HttpResponse from "~/models/http_response";
import DbBookmarksManager from "~/server/managers/db/bookmarkManager";

export default defineEventHandler(async (event): Promise<HttpResponse> => {
  const body = await readBody(event);
  const db = DbBookmarksManager.getInstance();

  try {
    const result = await db.addBookmark(body);
    return { statusCode: 200, data: JSON.stringify(result) };
  } catch (err) {
    const httpError = err as HttpResponse;
    return {
      statusCode: httpError.statusCode,
      error: httpError.statusMessage,
      statusMessage: httpError.statusMessage
    };
  }

})
