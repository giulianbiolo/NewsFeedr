import { ObjectId } from "mongodb";
import Magazine from "./magazine";

export default interface Feed {
  id?: ObjectId,
  progr_magazine?: number,
  title?: string,
  description?: string,
  link?: string,
  pubDate?: Date,
  magazine: Magazine[],
}
