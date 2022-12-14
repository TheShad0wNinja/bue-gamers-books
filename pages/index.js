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
    console.log(session);

    if (session.status === "authenticated") {
      fetch("/api/leaderboard")
        .then((e) => e.json())
        .then((e) => setLeaderboard(e));
    }
  }, [session]);

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
      <Link href={"/auth/register"}>
        <button className="btn-primary btn">Register new user</button>
      </Link>
      <br />
      <AddPoints />
      <Leaderboard data={leaderboard} />
    </>
  );
}
