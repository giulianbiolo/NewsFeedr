import { ObjectId } from "mongodb";

export default interface Feed {
  id?: ObjectId,
  progr_magazine?: number,
  title?: string,
  description?: string,
  link?: string,
  pubDate?: Date,
}
