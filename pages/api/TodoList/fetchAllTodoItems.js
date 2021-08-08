const { connectToDatabase } = require("./mongodb");

export default async (req, res) => {
    const { db } = await connectToDatabase();
    // const listItems = await db.collection("listItems").find({})
    // .sort({ metacritic: -1 })
    // .limit(20)
    // .toArray();
    const doc = await db.collection("listItems").findOne({ _id: "user001" });
    // console.log(doc);
    return res.status(200).json(doc.items);
};