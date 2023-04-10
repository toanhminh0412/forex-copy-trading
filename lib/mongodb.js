import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI)
export const mongoDb = process.env.NEXT_PUBLIC_MONGO_DB