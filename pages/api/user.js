import clientPromise from "../../lib/mongodb";

export default async function user(req, res) {
  if (req.method !== "POST") return res.json({ status: "invalid" });
  const client = await clientPromise;
  const d = client.db("BookEvent");
  const db = d.collection("users");
  const body = JSON.parse(req.body);
  const user = await db.findOne({
    studentId: body.studentId,
    teamName: body.teamName,
  });
  if (!user)
    return res.json({
      valid: false,
      user: {},
    });

  res.json({
    valid: true,
    user,
  });
}
