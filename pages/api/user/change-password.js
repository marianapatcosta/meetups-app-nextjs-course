import { getSession } from "next-auth/client";
import { connectDatabase, hashPassword, verifyPassword } from "../../../utils";

// POST /api/user/change-password
const handler = async (req, res) => {
  if (req.method !== "PATCH") return;

  const session = await getSession({ req: req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  const userEmail = session.user.email; // we returned email encoded in jwt after successful login

  const { oldPassword, newPassword } = JSON.parse(req.body);
  let dbConnection;

  try {
    dbConnection = await connectDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Connecting to the database failed." });
  }

  const { client, db } = dbConnection;
  try {
    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      client.close();
      return res.status(404).json({ message: "User not found." });
    }

    const arePasswordsEqual = await verifyPassword(oldPassword, user.password);

    if (!arePasswordsEqual) {
      client.close();
      return res.status(403).json({ message: "Invalid password." });
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await db
      .collection("users")
      .updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

    client.close();
  } catch (error) {
    client.close();
    return res.status(500).json({ message: "Password update failed." });
  }
  res.status(200).json({ message: "Password successful updated!" });
};

export default handler;
