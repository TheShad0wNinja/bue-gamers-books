import clientPromise from "../../lib/mongodb";

export default async function user(req, res) {
  if (req.method !== "POST") return res.json({ status: "invalid" });

  const client = await clientPromise;
  const db = client.db("BookEvent");
  const users = db.collection("users");
  const body = JSON.parse(req.body);

  let studentId = "",
    teamName = "";
  if (body.studentId) {
    studentId = await users.findOne({ studentId: body.studentId });
    studentId = studentId ? studentId.studentId : "";
  }
  if (body.teamName) {
    teamName = await users.findOne({ teamName: body.teamName });
    teamName = teamName ? teamName.teamName : "";
  }

  return res.json({
    teamName,
    studentId,
  });
}
