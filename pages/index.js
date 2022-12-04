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
  const [info, setInfo] = useState({ points: -1, rank: -1 });
  const [leader, setLeader] = useState([]);

  useEffect(() => {
    if (session.status === "authenticated") {
      fetch("/api/me", {
        method: "POST",
        body: JSON.stringify({ studentId: session.data.user.studentId }),
      })
        .then((e) => e.json())
        .then((e) => setInfo({ points: e.user.points, rank: e.user.rank }));
      fetch("/api/leaderboard")
        .then((e) => e.json())
        .then((e) => setLeader(e));
    }
  }, [session.status]);

  if (session.status === "loading") return <Loader />;
  if (session.status === "unauthenticated")
    return (
      <div className="container flex gap-10 justify-center items-center mx-auto ">
        <Link href="auth/register">
          <button className="btn btn-primary">Register</button>
        </Link>

        <button
          onClick={() => {
            signIn();
          }}
          className="btn btn-accent"
        >
          Login
        </button>
      </div>
    );

  return (
    <>
      <Head>
        <title>BUE Gamers</title>
        <meta
          name="description"
          content="BUE Gamers x Dentistry Book Festival"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-xl text-secondary">
        Show your QR code to the booth staff in order to gain your points
      </h2>
      <br />
      <QR
        name={session.data.user.teamName}
        studentId={session.data.user.studentId}
      />
      <br />
      <div className="bg-base-200 rounded-md text-gray-200 px-10 py-4 border-primary border-2">
        <h1>
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
      <Leaderboard data={leader} />
    </>
  );
}
