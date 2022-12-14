export default function Leaderboard({ data }) {
  return (
    <>
      <h1 className="text-xl text-white">Leaderboard</h1>
      <div className="overflow-x-auto rounded-xl border-2 border-accent">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>Num</th>
              <th>Name</th>
              <th>ID</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((col, idx) => (
              <tr key={`row${idx}`}>
                <th>{idx + 1}</th>
                <th className="max-w-xs truncate md:max-w-md ">
                  {col.teamName}
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
