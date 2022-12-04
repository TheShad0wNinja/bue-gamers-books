import clientPromise from "../../lib/mongodb";

export default async function user(req, res) {
  if (req.method !== "POST") return res.json({ status: "invalid" });
  const client = await clientPromise;
  const db = client.db("BookEvent");
  const users = db.collection("users");
  const body = JSON.parse(req.body);

  const leaderboard = await users
    .aggregate([
      {
        $setWindowFields: {
          sortBy: { points: -1 },
          output: { rank: { $rank: {} } },
        },
      },
    ])
    .toArray();

  const user = leaderboard.find((obj) => obj.studentId === body.studentId);

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
