import { ObjectId } from "mongodb";

export default interface Magazine {
  id?: ObjectId,
  progr?: number,
  name?: string,
  url?: string,
}
