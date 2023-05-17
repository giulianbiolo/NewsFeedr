import Magazine from "~/models/magazine";
import MagazineManager from "~/server/managers/db/magazineManager";

export default defineEventHandler(async (_event) => {
  const db = MagazineManager.getInstance();

  try {
    const magazines: Magazine[] = await db.getMagazines();
    return { statusCode: 200, magazines: magazines };
  } catch (err) {
    return { err }
  }
})
