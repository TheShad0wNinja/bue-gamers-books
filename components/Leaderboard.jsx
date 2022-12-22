import ProfileIcon from "../components/ProfileIcon";

export default function Leaderboard({ data }) {
  return (
    <>
      <div className="rounded-md border-2 border-accent shadow-md">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>ID</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((col, idx) => (
              <tr key={`row${idx}`}>
                <th>{idx + 1}</th>
                <th className="flex flex-nowrap gap-2">
                  <ProfileIcon /> {col.teamName}
                </th>
                <th>{col.studentId}</th>
                <th>{col.points}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
