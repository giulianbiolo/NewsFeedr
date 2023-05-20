import Magazine from "~/models/magazine";
import MagazineManager from "~/server/managers/db/magazineManager";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 'unauthenticated!', statusCode: 403, };
  }

  const db = MagazineManager.getInstance();

  try {
    const magazines: Magazine[] = await db.getMagazines();
    return { statusCode: 200, magazines: magazines };
  } catch (err) {
    return { err }
  }
})
