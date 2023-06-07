import { ObjectId } from "mongodb";

export default interface Magazine {
  _id?: ObjectId,
  progr?: number,
  name?: string,
  url?: string,
}
