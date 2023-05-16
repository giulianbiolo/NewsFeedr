import { MongoClient, ObjectId } from 'mongodb'
import Feed from '~/models/feed';

const uri = "mongodb+srv://admin:admin@cluster0.r4bplmk.mongodb.net/?retryWrites=true&w=majority";
const dbName = "NewsFeedr";
const rssFeedsCollection = "rssFeeds";

class dbManager {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(uri);
    this.client.connect()
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error(err));
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (err) {
      console.error(err)
    }
  }

  async getFeeds(): Promise<Feed[]> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(rssFeedsCollection);
      const result = await collection.find({}).toArray() as Feed[];
      return result;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot get the feeds, error: ${err}` });
    }
  }

  async putFeeds(feeds: Feed[]): Promise<void> {
    try {
      const database = this.client.db(dbName);
      const collection = database.collection(rssFeedsCollection);

      for (const feed of feeds) {
        await collection.insertOne(feed);
      }
      return;
    } catch (err) {
      throw createError({ statusCode: 500, statusMessage: `Cannot put the feeds, error: ${err}` });
    }
  }
}

export default dbManager;
