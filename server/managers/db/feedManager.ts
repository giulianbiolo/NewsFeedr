import Feed from "~/models/feed";
import DbManager from "./dbManager";
import { lookup } from "dns";

const dbName = "NewsFeedr";
const collectionName = "rssFeeds";

class DbFeedManager extends DbManager {
  protected static instance: DbFeedManager;

  private lookup = {
    $lookup: {
      from: 'magazines',
      localField: 'progr_magazine',
      foreignField: 'progr',
      as: 'magazine',
    }
  };
  private sort = { $sort: { pubDate: -1 }, };

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
      const result = await collection.aggregate([this.lookup, this.sort]).toArray() as Feed[];

      return result;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the feeds, error: ${err}` });
    }
  }

  async getLastNFeeds(n: number): Promise<Feed[]> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);
      const pipeline = [ this.lookup, this.sort, { $limit: n }, ];
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

  async searchFeeds(keyword: string): Promise<Feed[]> {
    if (keyword == null || keyword == '') {
      return this.getFeeds();
    }

    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);

    const query = {
      $or: [
        { progr_magazine: { $regex: keyword, $options: 'i' } },
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { link: { $regex: keyword, $options: 'i' } },
        { pubDate: { $regex: keyword, $options: 'i' } },
      ],
    };

    const feeds = collection.aggregate([this.lookup, { $match: query }, this.sort]);
    return feeds.toArray() as Promise<Feed[]>;
  }

}

export default DbFeedManager;
