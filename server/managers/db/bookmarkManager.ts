import Bookmark from "~/models/bookmark";
import DbManager from "./dbManager";

const dbName = "NewsFeedr";
const collectionName = "bookmarks";

class DbBookmarksManager extends DbManager {
  protected static instance: DbBookmarksManager;
  protected database;
  protected collection;

  private constructor() {
    super();
    this.database = this.client.db(dbName);
    this.collection = this.database.collection(collectionName);
  }

  static getInstance(): DbBookmarksManager {
    if (!DbBookmarksManager.instance) {
      DbBookmarksManager.instance = new DbBookmarksManager();
    }
    return DbBookmarksManager.instance;
  }

  async addBookmark(bookmark: Bookmark): Promise<void> {
    if (await this.collection.findOne({ userId: bookmark.userId, feedId: bookmark.feedId }) != null) {
      throw createError({ statusCode: 500, statusMessage: `Bookmark already exists` });
    }

    await this.collection.insertOne(bookmark);
    return;
  }

  async removeBookmark(bookmark: Bookmark): Promise<void> {
    if (await this.collection.findOne({ userId: bookmark.userId, feedId: bookmark.feedId }) == null) {
      throw createError({ statusCode: 500, statusMessage: `Bookmark does not exist` });
    }

    await this.collection.deleteOne({ userId: bookmark.userId, feedId: bookmark.feedId });
    return;
  }
}

export default DbBookmarksManager;
