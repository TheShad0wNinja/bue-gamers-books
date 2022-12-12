import clientPromise from "../../lib/mongodb";

export default async function user(req, res) {
  if (req.method !== "POST") return res.json({ status: "invalid" });
  const client = await clientPromise;
  const db = client.db("BookEvent");
  const users = db.collection("users");
  const body = JSON.parse(req.body);

  const user = await users.findOne({ studentId: body.studentId });

  if (!user)
    return res.json({
      valid: false,
      user: {},
    });

  const rank = await users.find({ points: { $gt: user.points } }).count();

  res.json({
    valid: true,
    user: {
      ...user,
      rank: rank + 1,
    },
  });
}
