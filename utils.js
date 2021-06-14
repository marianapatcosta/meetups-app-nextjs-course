import { MongoClient } from "mongodb";
import { hash, compare } from "bcryptjs";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@devconnector.ihogm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );

  const db = client.db();
  return { client, db };
};

export const hashPassword = async (password) => {
  return await hash(password, 12);
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
