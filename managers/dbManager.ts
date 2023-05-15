import { MongoClient } from 'mongodb'
import { Feed } from '~/models/feed'

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
      const query = {};
      const result = await collection.find(query).toArray();
      return result.map(feed => ({
        id: feed._id.toString(),
        title: feed.title,
        body: feed.body,
        link: feed.link,
      }));
    } catch (err) {
      console.error(err)
      return []
    }
  }
}

export default dbManager;
