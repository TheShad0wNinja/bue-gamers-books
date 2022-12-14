import { useState } from "react";

export default function SignIn({ setLogin }) {
  const [userInfo, setUserinfo] = useState({
    teamName: "",
    studentId: "",
    points: 0,
  });
  const [err, SetErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.teamName || !userInfo.studentId || !userInfo.teamName)
      return SetErr("Missing fields");

    const user = await fetch("/api/me", {
      method: "POST",
      body: JSON.stringify({
        studentId: userInfo.studentId,
      }),
    }).then((res) => res.json());

    if (!user.valid) return SetErr("Invalid User");

    const query = encodeURI(
      `/api/points?teamName=${userInfo.teamName}&studentId=${userInfo.studentId}&points=${userInfo.points}`
    );

    fetch(query).then(() => setUserinfo({}));
  };

  return (
    <>
      <div className="flex w-96 flex-col items-center gap-3 rounded-lg bg-neutral p-5 text-neutral-content">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-3"
        >
          <h1 className="text-xl font-bold text-white">Add Points</h1>
          {err && <h1 className="text-xl font-bold text-error">{err}</h1>}
          <label className="w-full text-white">
            User/Team Name:
            <input
              className="input w-full"
              type="text"
              placeholder="Team Name"
              value={userInfo.teamName}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, teamName: target.value })
              }
            />
          </label>
          <label className="w-full text-white">
            Student ID:
            <input
              className="input w-full"
              type="text"
              placeholder="Student Id"
              value={userInfo.studentId}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, studentId: target.value })
              }
            />
          </label>
          <label className="w-full text-white">
            Points:
            <input
              className="input w-full"
              type="number"
              placeholder="Points"
              value={userInfo.points}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, points: target.value })
              }
            />
          </label>
          <button type="submit" className="btn-primary btn">
            Add Points
          </button>
        </form>
      </div>
    </>
  );
}
