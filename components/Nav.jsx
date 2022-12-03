import { useSession } from "next-auth/react";

export default function Nav() {
  const session = useSession();
  const auth = session.status === "authenticated";
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {auth && (
          <h1 className="text-xl text-white font-bold">
            Team: {session.data.user.teamName}
          </h1>
        )}
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">BUE Gamers</a>
      </div>
      <div className="navbar-end">
        <h1 className="text-xl text-white font-bold">
          {auth && (
            <h1 className="text-xl text-white font-bold">
              Student ID: {session.data.user.studentId}
            </h1>
          )}
        </h1>
      </div>
    </div>
  );
}
