import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.json({ status: "invalid" });
  const client = await clientPromise;
  const db = client.db("BookEvent");
  const body = JSON.parse(req.body);
  await db.collection("users").insertOne(body);
  res.status(200).json({ message: "User Saved" });
}
