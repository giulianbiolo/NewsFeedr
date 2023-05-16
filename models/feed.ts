import { ObjectId } from "mongodb";

export default class Feed {
  constructor(
    public id?: ObjectId,
    public title?: string,
    public body?: string,
    public link?: string,
    public dt_create?: Date,
  ) {}
}
