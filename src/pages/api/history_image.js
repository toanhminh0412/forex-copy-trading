import clientPromise, { mongoDb } from "../../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const mongoClient = await clientPromise;
            const db = mongoClient.db(mongoDb);
            const imageCollection = db.collection("history_images");
            const images = await imageCollection.find().toArray();
            res.status(200).json({
                success: 'true',
                historyImages: images
            })
        } catch (err) {
            console.log(err.stack);
            res.status(400).json({ message: "Failed to get/post history images" })
        }
    } else if (req.method === 'POST') {
        const month = req.body.month;
        const imageURL = req.body.imageURL;
        const deletedImages = req.body.deletedImages;

        try {
            const mongoClient = await clientPromise;
            const db = mongoClient.db(mongoDb);
            const imageCollection = db.collection("history_images");

            // Upload a new history image
            if (month && imageURL) {
                console.log("Upload a new history image")
                const imageRecord = await imageCollection.findOne({"month": month});
                if (imageRecord) {
                    await imageCollection.updateOne(
                        {"month": month},
                        {$set : {"images": [...imageRecord.images, imageURL]}}
                    )
                } else {
                    await imageCollection.insertOne(
                        {
                            month: month,
                            images: [imageURL]
                        }
                    )
                }
                res.status(201).json({ success: "true", message: "Posted a new image" });
            } else if (deletedImages) {
              console.log(deletedImages);
              for (const [month, images] of Object.entries(deletedImages)) {
                const imageRecord = await imageCollection.findOne({"month": month});
                const currentImages = imageRecord.images;
                await imageCollection.findOneAndUpdate(
                  {"month": month},
                  {$set : {"images": currentImages.filter(image => !images.includes(image))}}
                );
              }
              const images = await imageCollection.find().toArray();
              res.status(200).json({
                success: 'true',
                historyImages: images
              })
            } else {
                res.status(400).json({ message: "Missing required parameters for POST request" })
            }
        } catch (err) {
            console.log(err.stack);
            res.status(400).json({ message: "Failed to get/post history images" })
        }
    }   
}