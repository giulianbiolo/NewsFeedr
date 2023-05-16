import { ObjectId } from "mongodb";

export default class Feed {
  constructor(
    public id?: ObjectId,
    public title?: string,
    public description?: string,
    public link?: string,
    public pubDate?: Date,
  ) {}
}
