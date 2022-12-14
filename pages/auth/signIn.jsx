import { signIn } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";

export default function SignIn({ setLogin }) {
  const [userInfo, setUserinfo] = useState({ teamName: "", studentId: "" });
  const [err, SetErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      teamName: userInfo.teamName,
      studentId: userInfo.studentId,
      redirect: false,
    });

    if (res.ok) Router.push("/");
    else SetErr(res.error);
  };

  return (
    <>
      <div className="flex w-96 flex-col items-center gap-3 rounded-lg bg-neutral p-5 text-neutral-content">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <h1 className="text-xl font-bold text-white">Sign In</h1>
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
          <button type="submit" className="btn-primary btn">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
