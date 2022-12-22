import { useState } from "react";

export default function AddPoints({ refreshLeaderboard }) {
  const [userInfo, setUserinfo] = useState({
    teamName: "",
    studentId: "",
    points: 0,
  });
  const [err, setErr] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async () => {
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
      {err && <h3 className="text-error">{err}</h3>}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Team Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter name here"
          className="input-bordered input"
          value={userInfo.teamName}
          onChange={({ target }) =>
            setUserinfo({ ...userInfo, teamName: target.value })
          }
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Student ID</span>
        </label>
        <input
          type="text"
          placeholder="Enter id here"
          className="input-bordered input"
          value={userInfo.studentId}
          onChange={({ target }) =>
            setUserinfo({ ...userInfo, studentId: target.value })
          }
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Points</span>
        </label>
        <input
          className="input-bordered input"
          type="number"
          placeholder="Points"
          value={userInfo.points}
          onChange={({ target }) =>
            setUserinfo({ ...userInfo, points: target.value })
          }
        />
      </div>
      <div className="form-control mt-6">
        <button
          className="btn-primary btn"
          disabled={disableButton}
          onClick={() => handleSubmit()}
        >
          Add Points
        </button>
      </div>
    </>
  );
}
