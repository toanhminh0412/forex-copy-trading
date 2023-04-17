import { mongoClient, mongoDb } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await mongoClient.connect();
            const db = mongoClient.db(mongoDb);
            const serviceCollection = db.collection('services');
            const services = await serviceCollection.find().toArray();
            console.log(services)
            res.status(200).json({ success: "true", services: services });
        } catch (err) {
            console.log(err.stack);
            res.status(400).json({ message: "Failed GET request for service" });
        } finally {
            await mongoClient.close();
        }
    }
    if (req.method === 'POST') {
        const newService = req.body.newService;
        const serviceId = req.body.serviceId;
        console.log(newService);
        try {
            await mongoClient.connect();
            const db = mongoClient.db(mongoDb);
            const serviceCollection = db.collection('services');
            if (newService && !serviceId) {
                await serviceCollection.insertOne(newService);
                const services = await serviceCollection.find().toArray();
                res.status(200).json({ success: "true", services: services });
            } else if (newService && serviceId) {
                await serviceCollection.findOneAndReplace(
                    {"_id": new ObjectId(serviceId)},
                    newService
                )
                const services = await serviceCollection.find().toArray();
                res.status(200).json({ success: "true", services: services });
            } else {
                res.status(400).json({ message: "Missing required arguments for POST request for services" })
            }
        } catch (err) {
            console.log(err.stack);
            res.status(400).json({ message: "Failed POST request for service" });
        } finally {
        await mongoClient.close();
        }
    }
}