import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import QR from "../components/QR";
import { useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard";

export default function Home() {
  const session = useSession();
  const [status, setStatus] = useState("loading");
  const [info, setInfo] = useState({ points: -1, rank: -1 });
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    console.log(session);

    if (session.status === "authenticated") {
      fetch("/api/me", {
        method: "POST",
        body: JSON.stringify({ studentId: session.data.user.studentId }),
      })
        .then((e) => e.json())
        .then((e) => setInfo({ points: e.user.points, rank: e.user.rank }));
      fetch("/api/leaderboard")
        .then((e) => e.json())
        .then((e) => setLeaderboard(e))
        .then(() => setStatus("auth"));
    } else if (session.status === "unauthenticated") setStatus("unauth");
  }, [session]);

  if (status === "loading") return <Loader />;
  else if (status === "unauth")
    return (
      <div className="container mx-auto flex items-center justify-center gap-10 ">
        <Link href="auth/register">
          <button className="btn-primary btn">Register</button>
        </Link>

        <button
          onClick={() => {
            signIn();
          }}
          className="btn-accent btn"
        >
          Login
        </button>
      </div>
    );
  else
    return (
      <>
        <h2 className="text-xl text-secondary">
          Show your QR code to the booth staff in order to gain your points
        </h2>
        <br />
        <QR
          name={session.data.user.teamName}
          studentId={session.data.user.studentId}
        />
        <br />
        <div className="truncate rounded-md border-2 border-primary bg-base-200 px-10 py-4 text-gray-200">
          <h1 className="max-w-xs">
            <strong>Username:</strong> {session.data.user.teamName}
          </h1>
          <h1>
            <strong>Student ID:</strong> {session.data.user.studentId}
          </h1>
          <h1>
            <strong>Points:</strong> {info.points}
          </h1>
          <h1>
            <strong>Rank:</strong> {info.rank}
          </h1>
        </div>
        <br />
        <Leaderboard data={leaderboard} />
      </>
    );
}
