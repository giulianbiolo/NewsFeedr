import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://admin:admin@cluster0.r4bplmk.mongodb.net/?retryWrites=true&w=majority";

class DbManager {
  protected static instance: DbManager;
  client: MongoClient

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

  static getInstance(): DbManager {
    if (!DbManager.instance) {
      DbManager.instance = new DbManager();
    }
    return DbManager.instance;
  }
}

export default DbManager;
