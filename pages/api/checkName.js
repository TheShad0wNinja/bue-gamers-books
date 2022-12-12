import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.json({ status: "invalid" });
  const client = await clientPromise;
  const db = client.db("BookEvent");
  const users = db.collection("users");
  const body = JSON.parse(req.body);

  const user = await users.findOne({ teamName: body.teamName });

  if (user)
    return res.json({
      valid: true,
    });

  res.json({
    valid: false,
  });
}
