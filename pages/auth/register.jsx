import { useState } from "react";
import Router from "next/router";
import Nav from "../../components/Nav";

export default function Register() {
  const [err, setErr] = useState("");
  const [userInfo, setUserinfo] = useState({
    teamName: "",
    studentId: "",
    phoneNum: "",
  });
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async () => {
    console.log("Click");
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
      <Nav />
      <div className="card mx-auto mt-20 w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
        <div className="card-body ">
          <h1 className="card-title">Register a new user</h1>
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
                setUserinfo({ ...userInfo, teamName: target.value.trim() })
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
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="Enter number here"
              className="input-bordered input"
              value={userInfo.phoneNum}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, phoneNum: target.value })
              }
            />
          </div>
          <div className="form-control mt-6">
            <button
              className="btn-primary btn"
              onClick={() => handleSubmit()}
              disabled={disableButton}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
