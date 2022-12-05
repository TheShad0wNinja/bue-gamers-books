import { signIn } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";

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
      <div className="flex flex-col gap-3 items-center p-5 w-96 bg-neutral text-neutral-content rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <h1 className="text-xl text-white font-bold">Sign In</h1>
          {err && <h1 className="font-bold text-error text-xl">{err}</h1>}
          <label className="text-white w-full">
            Team/User Name:
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
          <label className="text-white w-full">
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
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        <Link className="link link-accent" href="/auth/register">
          Haven't registered yet? Register now
        </Link>
      </div>
    </>
  );
}
