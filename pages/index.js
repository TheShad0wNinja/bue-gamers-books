import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard";
import Drawer from "../components/Drawer";
import Nav from "../components/Nav";

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

  if (session.status === "loading")
    return (
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50]">
        <Loader />;
      </div>
    );
  else if (session.status === "unauthenticated")
    return (
      <>
        <Nav />
        <div className="m-10 flex flex-col items-center gap-10 rounded-md bg-base-200 py-10 drop-shadow-lg ">
          <span className="max-w-md text-center text-xl font-bold">
            <span className="text-4xl"> You have not logged in yet </span>
            Please login using proper credentials to access this app
          </span>
          <button
            onClick={() => {
              signIn();
            }}
            className="btn-primary btn"
          >
            Login
          </button>
        </div>
      </>
    );

  return (
    <>
      <Drawer refreshLeaderboard={refreshLeaderboard}>
        <div className="py-10 px-16">
          <Leaderboard data={leaderboard} />
        </div>
      </Drawer>
    </>
  );
}
