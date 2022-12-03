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
    if (userInfo.teamName.includes("=")) return setErr("Name cannot include =");

    if (!/^\d+$/.test(userInfo.studentId) || userInfo.studentId.length > 6)
      return setErr("Invalid Student ID");

    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        userInfo.phoneNum
      )
    )
      return setErr("Invalid Phone Number");

    const check = await fetch("/api/me", {
      method: "POST",
      body: JSON.stringify({
        studentId: userInfo.studentId,
      }),
    }).then((res) => res.json());

    if (check.valid) return setErr("Student Id already used before");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ ...userInfo, points: 0 }),
    });

    if (res.ok) signIn();
  };
  return (
    <>
      <div className="flex flex-col items-center p-5 w-96 bg-neutral text-neutral-content rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3 w-full"
        >
          <h1 className="text-xl text-white font-bold">Register</h1>
          {err && <h3 className="text-error">{err}</h3>}
          <label className="text-white w-full">
            Team/User Name:
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
          <label className="text-white w-full">
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
          <label className="text-white w-full">
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
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <a className="link link-accent" onClick={() => signIn()}>
          Already registered? Sign In
        </a>
      </div>
    </>
  );
}
