import Magazine from "~/models/magazine";
import DbManager from "./dbManager";

const dbName = "NewsFeedr";
const collectionName = "magazines";

class DbMagazineManager extends DbManager {
  protected static instance: DbMagazineManager;

  private constructor() {
    super();
  }

  static getInstance(): DbMagazineManager {
    if (!DbMagazineManager.instance) {
      DbMagazineManager.instance = new DbMagazineManager();
    }
    return DbMagazineManager.instance;
  }

  async getMagazines(): Promise<Magazine[]> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);
      const result = await collection.find({}).toArray() as Magazine[];
      return result;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the magazines, error: ${err}` });
    }
  }

  async getMagazine(progr: number): Promise<Magazine> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);
      const result = await collection.findOne({ progr: progr }) as Magazine;
      return result;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the magazines, error: ${err}` });
    }
  }

  async putMagazines(magazines: Magazine[]): Promise<void> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);

      for (const magazine of magazines) {
        await collection.insertOne(magazine);
      }
      return;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot put the magazines, error: ${err}` });
    }
  }
}

export default DbMagazineManager;
