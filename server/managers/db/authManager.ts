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
    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);
    const query = { email: credentials.email }
    const result = await collection.findOne(query) as User | null;

    if (!result || result == {} as User) {
      return null;
    } else {
      return result;
    }
  }

  async register(credentials: User): Promise<void> {
    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);

    if (await collection.findOne({ email: credentials.email }) != null) {
      throw createError({ statusCode: 500, statusMessage: `Email already registered, try another` });
    }

    await collection.insertOne(credentials);
    return;
  }

  async password_reset(credentials: User): Promise<void> {
    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);

    const query = { email: credentials.email };
    const update = { $set: { password: credentials.password } };

    if (await collection.findOne(query) == null) {
      throw createError({
        statusCode: 500,
        statusMessage: `User with email "${credentials.email}" not found!`
      });
    }

    await collection.updateOne(query, update);
    return;
  }
}

export default DbAuthManager;
