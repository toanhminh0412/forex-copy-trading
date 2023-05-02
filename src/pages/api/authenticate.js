import clientPromise, { mongoDb } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const username = req.query.username;
        const password = req.query.password;
        const userId = req.query.userId;
        const logOut = req.query.logOut;
        const deleteAccount = req.query.deleteAccount;
        try {
            const mongoClient = await clientPromise;
            const db = mongoClient.db(mongoDb);
            const userCollection = db.collection("users");
            
            // Login
            if (username && password) {
                let user = await userCollection.findOne({
                    username: username, password: password
                });
                if (user && user.status === "Dormant") {
                    res.status(400).json({ message: "User account was deactivated" })
                    return;
                }
                if (user) {
                    user = await userCollection.findOneAndUpdate(
                        {username: username, password: password},
                        {$set : {"session": new Date().getTime()}}
                    );
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
            
            // Delete an user account
            } else if (userId && deleteAccount) {
                await userCollection.deleteOne(
                    {"_id": new ObjectId(userId)}
                )
                const accounts = await userCollection.find().toArray();
                res.status(200).json({ success: true, message: "Delete account successfully!", accounts:accounts })

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
            
            // Get all user accounts
            } else {
                const accounts = await userCollection.find().toArray();
                res.status(200).json({ success: true, message: "Fetch all accounts successfully", accounts: accounts })
            }
        } catch (err) {
            console.log(err.stack);
            res.status(400).json({ message: "Failed to interact with user database" })
        }
        return;
    }

    if (req.method === "POST") {
        const newAccount = req.body.newAccount;
        const accountId = req.body.accountId;
        const isAdmin = req.body.isAdmin;
        const status = req.body.status;
        try {
            const mongoClient = await clientPromise;
            const db = mongoClient.db(mongoDb);
            const userCollection = db.collection("users");

            // Create a new account
            if (newAccount) {
                const existingAccounts = await userCollection.find({username:newAccount.username}).toArray();
                if (existingAccounts.length > 0) {
                    res.status(400).json({ message: "An account with this username already exists" })
                    return;
                }
                await userCollection.insertOne(newAccount);
                const accounts = await userCollection.find().toArray();
                res.status(201).json({ success: true, accounts: accounts, message: "Created account successfully" })
            
            // Edit an account admin and status
            } else if (accountId && isAdmin !== undefined && status) {
                await userCollection.updateOne(
                    {"_id": new ObjectId(accountId)},
                    {$set : {"isAdmin": isAdmin, "status": status}}
                )
                const accounts = await userCollection.find().toArray();
                res.status(200).json({ success: true, accounts: accounts, message: "Edit account successfully" })
            } else {
                res.status(400).json({ message: "Missing required parameters for POST request to /api/authenticate" })
            }
        } catch (err) {
            console.log(err.stack);
            res.status(400).json({ message: "Failed to interact with user database" })
        }
        return;
    }
}