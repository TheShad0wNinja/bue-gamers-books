import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("BookEvent");
  const users = db.collection("users");

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

  res.json(leaderboard);
}
