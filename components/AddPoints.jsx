import { useState } from "react";

export default function AddPoints({ refreshLeaderboard }) {
  const [userInfo, setUserinfo] = useState({
    teamName: "",
    studentId: "",
    points: 0,
  });
  const [err, setErr] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.teamName || !userInfo.studentId || !userInfo.teamName)
      return setErr("Missing fields");

    setDisableButton(true);
    const checkUser = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        studentId: userInfo.studentId,
        teamName: userInfo.teamName,
      }),
    }).then((res) => res.json());

    if (!checkUser.teamName || !checkUser.studentId) {
      setDisableButton(false);
      return setErr("Invalid user info");
    }

    const query = encodeURI(
      `/api/points?teamName=${userInfo.teamName}&studentId=${userInfo.studentId}&points=${userInfo.points}`
    );

    await fetch(query);
    setUserinfo({
      teamName: "",
      studentId: "",
      points: 0,
    });
    setDisableButton(false);
    refreshLeaderboard();
  };

  return (
    <>
      <div className="flex w-96 flex-col items-center gap-3 rounded-lg bg-neutral p-5 text-neutral-content">
        <h1 className="text-xl font-bold text-white">Add Points</h1>
        {err && <h1 className="text-xl font-bold text-error">{err}</h1>}
        <form onSubmit={handleSubmit} className="form-control w-full ">
          <label className="label">
            <span className="label-text">Team Name:</span>
          </label>
          <input
            className="input w-full"
            type="text"
            placeholder="Team Name"
            value={userInfo.teamName}
            onChange={({ target }) =>
              setUserinfo({ ...userInfo, teamName: target.value })
            }
          />
          <label className="label">
            <span className="label-text">Student ID:</span>
          </label>
          <input
            className="input w-full"
            type="text"
            placeholder="Student Id"
            value={userInfo.studentId}
            onChange={({ target }) =>
              setUserinfo({ ...userInfo, studentId: target.value })
            }
          />
          <label className="label">
            <span className="label-text">Points:</span>
          </label>
          <input
            className="input w-full"
            type="number"
            placeholder="Points"
            value={userInfo.points}
            onChange={({ target }) =>
              setUserinfo({ ...userInfo, points: target.value })
            }
          />
          <button
            type="submit"
            className="btn-primary btn mt-5"
            disabled={disableButton}
          >
            Add Points
          </button>
        </form>
      </div>
    </>
  );
}
