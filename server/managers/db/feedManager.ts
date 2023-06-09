import Feed from "~/models/feed";
import DbManager from "./dbManager";

const dbName = "NewsFeedr";
const collectionName = "rssFeeds";

class DbFeedManager extends DbManager {
  protected static instance: DbFeedManager;

  private constructor() {
    super();
  }

  static getInstance(): DbFeedManager {
    if (!DbFeedManager.instance) {
      DbFeedManager.instance = new DbFeedManager();
    }
    return DbFeedManager.instance;
  }

  async getFeeds(): Promise<Feed[]> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);
      const result = await collection.find({}).toArray() as Feed[];
      return result;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the feeds, error: ${err}` });
    }
  }

  async getLastNFeeds(n: number): Promise<Feed[]> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);
      const pipeline = [
        { $sort: { pubDate: -1 } },
        { $limit: n },
      ];
      const result = await collection.aggregate(pipeline).toArray() as Feed[];
      return result;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the feeds, error: ${err}` });
    }
  }

  async getFeedForMagazine(progr_magazine: number): Promise<Feed[]> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);
      const result = await collection.find({ progr_magazine: progr_magazine }).toArray() as Feed[];
      return result;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the feeds, error: ${err}` });
    }

  }

  async putFeeds(feeds: Feed[]): Promise<void> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);

      for (const feed of feeds) {
        if (await collection.findOne({ link: feed.link }) == null) {
          await collection.insertOne(feed);
        }
      }
      return;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot put the feeds, error: ${err}` });
    }
  }
}

export default DbFeedManager;
