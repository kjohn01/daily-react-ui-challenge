const { connectToDatabase } = require("./mongodb");

export default async (req, res) => {
    const { client } = await connectToDatabase();
    const isConnected = await client.isConnected();
    return res.status(200).json(isConnected);
};