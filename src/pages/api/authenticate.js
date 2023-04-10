import { mongoClient, mongoDb } from "../../../lib/mongodb";

export default function handler(req, res) {
    res.status(200).json({ message: 'Logging in' })
}