import { mongoClient, mongoDb } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log('Fetching all reviews');
    try {
      await mongoClient.connect();
      const db = mongoClient.db(mongoDb);
      const reviewCollection = db.collection('reviews');
      const reviews = await reviewCollection.find().toArray();
      res.status(200).json({ reviews: reviews });
    } catch (err) {
      res.status(400).json({ message: "Failed post a new review" })
    } finally {
      await mongoClient.close();
    }
    return;
  } 
  if (req.method === 'POST') {
    console.log("Handle POST request")
    const firstName = req.body.firstName;
    const lastInitial = req.body.lastInitial;
    const country = req.body.country;
    const content = req.body.content;
    try {
      await mongoClient.connect();
      const db = mongoClient.db(mongoDb);
      const reviewCollection = db.collection('reviews');
      const newReview = await reviewCollection.insertOne(
        {
          firstName: firstName,
          lastInitial: lastInitial,
          country: country,
          content: content,
          active: false,
          comment: ''
        }
      );
      res.status(200).json({ success: "true", message: "Posted a new review" });
    } catch (err) {
      console.log(err.stack);
      res.status(400).json({ message: "Failed post a new review" })
    } finally {
      await mongoClient.close();
    }
  }
}