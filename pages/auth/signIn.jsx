import { signIn } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";
import Nav from "../../components/Nav";

export default function SignIn({ setLogin }) {
  const [userInfo, setUserinfo] = useState({ teamName: "", studentId: "" });
  const [disableButton, setDisableButton] = useState(false);
  const [err, SetErr] = useState("");

  const handleSubmit = async () => {
    setDisableButton(true);

    if (!userInfo.teamName || !userInfo.studentId)
      return SetErr("All fields need to be complete");

    const res = await signIn("credentials", {
      teamName: userInfo.teamName,
      studentId: userInfo.studentId,
      redirect: false,
    });

    setDisableButton(false);
    if (res.ok) Router.push("/");
    else SetErr(res.error);
  };

  return (
    <>
      <Nav />
      <div className="card mx-auto mt-20 w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 className="card-title">Sign In</h1>
          {err && <h1 className="text-xl font-bold text-error">{err}</h1>}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username here"
              className="input-bordered input"
              value={userInfo.teamName}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, teamName: target.value })
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password here"
              className="input-bordered input"
              value={userInfo.studentId}
              onChange={({ target }) =>
                setUserinfo({ ...userInfo, studentId: target.value })
              }
            />
          </div>
          <div className="form-control mt-6">
            <button
              className="btn-primary btn"
              disabled={disableButton}
              onClick={() => handleSubmit()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
