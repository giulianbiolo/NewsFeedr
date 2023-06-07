import { ObjectId } from "mongodb";

export default interface User {
  _id?: ObjectId,
  email?: string,
  name?: string,
  surname?: string,
  password?: string,
}
