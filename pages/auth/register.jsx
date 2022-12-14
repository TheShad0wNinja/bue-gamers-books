import { useState } from "react";
import Router from "next/router";

export default function Register() {
  const [err, setErr] = useState("");
  const [userInfo, setUserinfo] = useState({
    teamName: "",
    studentId: "",
    phoneNum: "",
  });
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.teamName || !userInfo.phoneNum || !userInfo.studentId)
      return setErr("All fields need to be filled");

    if (userInfo.teamName.length > 32)
      return setErr("Name needs to be less than 32 characters");

    if (!/^\d+$/.test(userInfo.studentId) || userInfo.studentId.length != 6)
      return setErr("Invalid Student ID");

    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        userInfo.phoneNum
      )
    )
      return setErr("Invalid Phone Number");

    setDisableButton(true);

    const checkUser = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        studentId: userInfo.studentId,
        teamName: userInfo.teamName,
      }),
    }).then((res) => res.json());

    if (checkUser.teamName) {
      setDisableButton(false);
      return setErr("Team Name already used before");
    }

    if (checkUser.studentId) {
      setDisableButton(false);
      return setErr("Student Id already used before");
    }

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ ...userInfo, points: 0 }),
    });

    if (res.ok) Router.push("/");
  };
  return (
    <>
      <div className="flex w-96 flex-col items-center rounded-lg bg-neutral p-5 text-neutral-content">
        <h1 className="text-xl font-bold text-white">Register</h1>
        {err && <h3 className="text-error">{err}</h3>}
        <form onSubmit={handleSubmit} className="form-control w-full">
          <label className="label">
            <span className="label-text">Team Name:</span>
          </label>
          <input
            type="text"
            placeholder="Team Name"
            name="team"
            className="input w-full"
            value={userInfo.teamName}
            onChange={({ target }) =>
              setUserinfo({ ...userInfo, teamName: target.value.trim() })
            }
          />
          <label className="label">
            <span className="label-text">Student ID:</span>
          </label>
          <input
            type="text"
            name="id"
            placeholder="Student Id"
            className="input w-full"
            value={userInfo.studentId}
            onChange={({ target }) =>
              setUserinfo({ ...userInfo, studentId: target.value })
            }
          />
          <label className="label">
            <span className="label-text">Phone Number:</span>
          </label>
          <input
            type="text"
            name="number"
            placeholder="Phone Number"
            className="input w-full "
            value={userInfo.phoneNum}
            onChange={({ target }) =>
              setUserinfo({ ...userInfo, phoneNum: target.value })
            }
          />
          <button
            type="submit"
            className="btn-primary btn mt-5"
            disabled={disableButton}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
