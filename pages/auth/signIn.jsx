import { signIn } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";

export default function SignIn({ setLogin }) {
  const [userInfo, setUserinfo] = useState({ teamName: "", studentId: "" });
  const [disableButton, setDisableButton] = useState(false);
  const [err, SetErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisableButton(true);
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
      <div className="flex w-96 flex-col items-center rounded-lg bg-neutral p-5 text-neutral-content">
        <h1 className="text-xl font-bold text-white">Sign In</h1>
        {err && <h1 className="text-xl font-bold text-error">{err}</h1>}
        <form onSubmit={handleSubmit} className="form-control w-full">
          <label className="label">
            <span className="label-text">Username:</span>
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
            <span className="label-text">Password:</span>
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
          <button
            type="submit"
            className="btn-primary btn mt-5"
            disabled={disableButton}
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
