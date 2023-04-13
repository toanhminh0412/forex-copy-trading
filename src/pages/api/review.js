import { mongoClient, mongoDb } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const show = req.query.show;
    console.log('Fetching reviews');
    try {
      await mongoClient.connect();
      const db = mongoClient.db(mongoDb);
      const reviewCollection = db.collection('reviews');
      if (show !== undefined) {
        const reviews = await reviewCollection.find({show: true}).toArray();
        res.status(200).json({ reviews: reviews });
      } else {
        const reviews = await reviewCollection.find().toArray();
        res.status(200).json({ reviews: reviews });
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: "Failed get all reviews" })
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
    const reviewId = req.body.reviewId;
    const comment = req.body.comment;
    const toggleReview = req.body.toggleReview;
    console.log(toggleReview)
      try {
        await mongoClient.connect();
        const db = mongoClient.db(mongoDb);
        const reviewCollection = db.collection('reviews');
        if (firstName && lastInitial && country && content) {
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
        } else if (reviewId && comment !== undefined) {
          const newReview = await reviewCollection.findOneAndUpdate(
            {"_id": new ObjectId(reviewId)},
            {$set : {"comment": comment}}
          )
          if (newReview) {
            res.status(200).json({ success: "true", message: "Commented on review successfully" })
          } else {
            res.status(400).json({ message: "Failed to comment on review" })
          }
        } else if (reviewId && toggleReview !== undefined) {
          const newReview = await reviewCollection.findOneAndUpdate(
            {"_id": new ObjectId(reviewId)},
            {$set : {"show": toggleReview}}
          )
          if (newReview) {
            res.status(200).json({ success: "true", message: "Toggled review successfully" })
          } else {
            res.status(400).json({ message: "Failed to toggle review" })
          }
        } else {
          res.status(400).json({ message: "Missing required arguments for POST request" })
        }
      } catch (err) {
        console.log(err.stack);
        res.status(400).json({ message: "Failed POST request" });
      } finally {
        await mongoClient.close();
      }
  }
}