import clientPromise, { mongoDb } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const username = req.query.username;
    const password = req.query.password;
    const userId = req.query.userId;
    const logOut = req.query.logOut;
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(mongoDb);
        const userCollection = db.collection("users");
        
        // Login
        if (username && password) {
            const user = await userCollection.findOneAndUpdate(
                {username: username, password: password},
                {$set : {"session": new Date().getTime()}}
            );
            if (user) {
                res.status(200).json({ userId: user.value._id, isAdmin: user.value.isAdmin })
            } else {
                res.status(404).json({ message: "Login info is incorrect" })
            }
        
        // Logout
        } else if (userId && logOut){
            const user = await userCollection.findOneAndUpdate(
                {"_id": new ObjectId(userId)},
                {$set : {"session": 0}}
            );
            if (user) {
                res.status(200).json({ success: "true", message: "Logged out successfully" })
            } else {
                res.status(404).json({ success: "false", message: "User not found to be logged out" })
            }

        // Check if user session expires (> 8 hour)
        } else if (userId) {
            const user = await userCollection.findOne(
                {"_id": new ObjectId(userId)},
            );
            const session = user.session;

            // User session expires
            if (session === 0 || new Date().getTime() - session > 28800000) {
                res.status(200).json({ message: "User session expired" })
            // User session doesn't expire, update session to the current time
            } else {
                await userCollection.updateOne(
                    {"_id": new ObjectId(userId)},
                    {$set : {"session": new Date().getTime()}}
                )
                const user = await userCollection.findOne(
                    {"_id": new ObjectId(userId)},
                );
                res.status(200).json({ active: "true", message: "User session is active", isAdmin: user.isAdmin })
            }
        
        // Missing required params
        } else {
            res.status(400).json({ message: "Request doesn't include necessary parameters" })
        }
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({ message: "Failed to authenticate user" })
    } 
    // finally {
    //     await mongoClient.close();
    // }
}