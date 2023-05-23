import User from "~/models/user";
import DbManager from "./dbManager";

const dbName = "NewsFeedr";
const collectionName = "usersCredentials";

class DbAuthManager extends DbManager {
  protected static instance: DbAuthManager;

  private constructor() {
    super();
  }

  static getInstance(): DbAuthManager {
    if (!DbAuthManager.instance) {
      DbAuthManager.instance = new DbAuthManager();
    }
    return DbAuthManager.instance;
  }

  async findOne(credentials: User): Promise<User | null> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);
      const query = { email: credentials.email }
      const result = await collection.findOne(query) as User | null;

      if (!result || result == {} as User) {
        return null;
      } else {
        return result;
      }
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the user, error: ${err}` });
    }
  }

  async register(credentials: User): Promise<void> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);

      if (await collection.findOne({ email: credentials.email }) == null) {
        await collection.insertOne(credentials);
      }

      return;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot register the user, error: ${err}` });
    }
  }
}

export default DbAuthManager;
