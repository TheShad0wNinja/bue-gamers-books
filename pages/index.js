import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard";
import AddPoints from "../components/AddPoints";

export default function Home() {
  const session = useSession();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (session.status === "authenticated") {
      fetch("/api/leaderboard")
        .then((e) => e.json())
        .then((e) => setLeaderboard(e));
    }
  }, [session]);

  const refreshLeaderboard = () => {
    fetch("/api/leaderboard")
      .then((e) => e.json())
      .then((e) => setLeaderboard(e));
  };

  if (session.status === "loading") return <Loader />;
  else if (session.status === "unauthenticated")
    return (
      <div className="container mx-auto flex items-center justify-center gap-10 ">
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

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center">
          <Link href={"/auth/register"}>
            <button className="btn-primary btn mb-8">Register User</button>
          </Link>
          <AddPoints refreshLeaderboard={refreshLeaderboard} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Leaderboard</h1>
          <Leaderboard data={leaderboard} />
        </div>
      </div>
    </>
  );
}
