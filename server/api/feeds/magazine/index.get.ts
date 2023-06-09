import Magazine from "~/models/magazine";
import MagazineManager from "~/server/managers/db/magazineManager";
import { getServerSession } from "#auth";
import HttpResponse from "~/models/http_response";

export default defineEventHandler(async (event): Promise<HttpResponse> => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, } as HttpResponse;
  }

  const db = MagazineManager.getInstance();

  try {
    const magazines: Magazine[] = await db.getMagazines();
    return { statusCode: 200, data: magazines } as HttpResponse;
  } catch (err) {
    const httpError = err as HttpResponse;
    return {
      statusCode: httpError.statusCode,
      error: httpError.statusMessage,
      statusMessage: httpError.statusMessage
    };
  }
})
