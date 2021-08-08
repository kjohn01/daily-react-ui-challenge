const { connectToDatabase } = require("./mongodb");

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const doc = await db.collection("listItems").findOneAndUpdate(
        { _id: "user001" },
        { $set: { items: req.body} },
        { returnNewDocument: true }
    );
    return res.status(200).json(doc.value.items);
};