const { connectToDatabase } = require("./mongodb");

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const doc = await db.collection("listItems").findOne({ _id: "user001" });
    return res.status(200).json(doc.items);
};