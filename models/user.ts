import { ObjectId } from "mongodb";

export default interface User {
  id?: ObjectId,
  email?: string,
  username?: string,
  password?: string,
}
