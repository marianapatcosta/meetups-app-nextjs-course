import { connectDatabase, hashPassword } from "../../../utils";
// POST /api/signup
const handler = async (req, res) => {
  if (req.method !== "POST") return;

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({ message: "Invalid email or password." });
  }

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

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      client.close();
      return res.status(422).json({ message: "User already exists." });
    }

    const usersCollection = db.collection("users");
    const hashedPassword = await hashPassword(password);
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
    });
    client.close();
  } catch (error) {
    client.close();
    return res.status(500).json({ message: "Creating user failed." });
  }
  res.status(201).json({ message: "Created user!" });
};

export default handler;
