import { connectDatabase } from "../../utils";
// POST /api/new-meetup
const handler = async (req, res) => {
  if (req.method !== "POST") return;
  const data = req.body;
  let dbConnection;

  try {
    dbConnection = await connectDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Connecting to the database failed." });
  }

  try {
    const { client, db } = dbConnection;

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    client.close();
  } catch (error) {
    client.close();
    return res.status(500).json({ message: "Inserting meetup failed." });
  }
  res.status(201).json({ message: "Meetup inserted" });
};

export default handler;
