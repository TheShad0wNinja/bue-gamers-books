import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Register() {
  const [err, setErr] = useState("");
  const [userInfo, setUserinfo] = useState({
    teamName: "",
    studentId: "",
    phoneNum: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.teamName || !userInfo.phoneNum || !userInfo.studentId)
      return setErr("All fields need to be filled");

    if (userInfo.teamName.includes("=")) return setErr("Name cannot include =");

    if (userInfo.teamName.length > 32)
      return setErr("Name needs to be less than 32 characters");

    if (!/^\d+$/.test(userInfo.studentId) || userInfo.studentId.length > 6)
      return setErr("Invalid Student ID");

    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        userInfo.phoneNum
      )
    )
      return setErr("Invalid Phone Number");

    const checkId = await fetch("/api/me", {
      method: "POST",
      body: JSON.stringify({
        studentId: userInfo.studentId,
      }),
    }).then((res) => res.json());

    if (checkId.valid) return setErr("Student Id already used before");

    const checkName = await fetch("/api/checkName", {
      method: "POST",
      body: JSON.stringify({
        teamName: userInfo.teamName,
      }),
    }).then((res) => res.json());

    if (checkName.valid)
      return setErr("Name already exists, please choose another one");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ ...userInfo, points: 0 }),
    });

    if (res.ok) signIn();
  };
  return (
    <>
      <div className="flex w-96 flex-col items-center rounded-lg bg-neutral p-5 text-neutral-content">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-3"
        >
          <h1 className="text-xl font-bold text-white">Register</h1>
          {err && <h3 className="text-error">{err}</h3>}
          <label className="w-full text-white">
            User/Team Name (if you wish to play as a team, have just one person
            register):
            <input
              type="text"
              placeholder="Team Name"
              name="team"
              className="input w-full max-w-xs"
              value={userInfo.teamName}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, teamName: target.value })
              }
            />
          </label>
          <label className="w-full text-white">
            Student ID:
            <input
              type="text"
              name="id"
              placeholder="Student Id"
              className="input w-full max-w-xs"
              value={userInfo.studentId}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, studentId: target.value })
              }
            />
          </label>
          <label className="w-full text-white">
            Phone Number:
            <input
              type="text"
              name="number"
              placeholder="Phone Number"
              className="input w-full max-w-xs"
              value={userInfo.phoneNum}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, phoneNum: target.value })
              }
            />
          </label>
          <button type="submit" className="btn-primary btn">
            Register
          </button>
        </form>
        <a className="link-accent link" onClick={() => signIn()}>
          Already registered? Sign In
        </a>
      </div>
    </>
  );
}
