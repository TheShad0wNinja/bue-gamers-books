export default function Leaderboard({ data }) {
  return (
    <>
      <h1 className="text-white text-xl">Leaderboard</h1>
      <div className="overflow-x-auto border-2 border-accent rounded-xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Num</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((col, idx) => (
              <tr key={`row${idx}`}>
                <th>{idx + 1}</th>
                <th>{col.teamName}</th>
                <th>{col.points}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
