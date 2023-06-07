import Feed from "~/models/feed";
import DbManager from "./dbManager";

const dbName = "NewsFeedr";
const collectionName = "rssFeeds";

class DbFeedManager extends DbManager {
  protected static instance: DbFeedManager;

  private sort = { $sort: { pubDate: -1 }, };
  private setMagazineField = {
    $set: {
      magazine: { $arrayElemAt: ["$magazine", 0] }
    }
  };
  private lookupMagazines = {
    $lookup: {
      from: 'magazines',
      localField: 'progr_magazine',
      foreignField: 'progr',
      as: 'magazine',
    }
  };
  private setIsBookmarkedField = {
    $addFields: {
      isBookmarked: {
        $cond: {
          if: { $gt: [{ $size: "$bookmark" }, 0] },
          then: true,
          else: false
        }
      }
    }
  }

  private constructor() {
    super();
  }

  static getInstance(): DbFeedManager {
    if (!DbFeedManager.instance) {
      DbFeedManager.instance = new DbFeedManager();
    }
    return DbFeedManager.instance;
  }

  private getLookupFunctionForBookmarks(userId: string) {
    return {
      $lookup: {
        from: "bookmarks",
        let: { feedId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$feedId", { $toString: "$$feedId" }] },
                  { $eq: ["$userId", userId] }
                ]
              }
            }
          }
        ],
        as: "bookmark"
      },
    };
  }

  async getFeeds(userId: string): Promise<Feed[]> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);

      const bookmarksLookup = this.getLookupFunctionForBookmarks(userId);

      const pipeline = [this.lookupMagazines, this.setMagazineField, bookmarksLookup, this.setIsBookmarkedField, this.sort];
      const result = await collection.aggregate(pipeline).toArray() as Feed[];

      return result;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the feeds, error: ${err}` });
    }
  }

  async getLastNFeeds(n: number): Promise<Feed[]> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(collectionName);
      const pipeline = [this.lookupMagazines, this.setMagazineField, this.sort, { $limit: n },];
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
      const pipeline: object[] = [this.lookupMagazines, this.setMagazineField, this.sort, { $match: { progr_magazine: progr_magazine } }];
      const result = await collection.aggregate(pipeline).toArray() as Feed[];
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

  async searchFeeds(keyword: string, userId: string): Promise<Feed[]> {
    if (keyword == null || keyword == '') {
      return this.getFeeds(userId);
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

    const pipeline = [this.lookupMagazines, { $match: query }, this.setMagazineField, this.sort];
    const feeds = collection.aggregate(pipeline);
    return feeds.toArray() as Promise<Feed[]>;
  }

}

export default DbFeedManager;
