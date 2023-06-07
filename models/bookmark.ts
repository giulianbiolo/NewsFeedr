import { ObjectId } from "mongodb";

export default interface Bookmark {
  _id?: ObjectId,
  userId?: ObjectId,
  feedId?: ObjectId,
}
