import clientPromise from "../../lib/mongodb";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (!token) return res.json({ valid: false });

  const {
    query: { teamName, studentId, points },
  } = req;

  const client = await clientPromise;
  const db = client.db("BookEvent");
  const users = db.collection("users");

  if (!teamName || !studentId || !points) return res.json({ valid: false });

  await users.updateOne({ studentId }, { $inc: { points: parseInt(points) } });

  res.json({ valid: true });
}
