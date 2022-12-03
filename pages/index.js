import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import QR from "../components/QR";
import { useState } from "react";

export default function Home() {
  const [points, setPoints] = useState();
  const session = useSession();
  const isLoading = session.status === "loading";
  const authed = session.status === "authenticated" ? true : false;
  if (authed) {
    fetch("/api/me", {
      method: "POST",
      body: JSON.stringify({ studentId: session.data.user.studentId }),
    })
      .then((e) => e.json())
      .then((e) => setPoints(e.user.points));
  }
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
      {isLoading ? (
        <Loader />
      ) : authed ? (
        <>
          <h2 className="text-white font-bold text-xl">{points} Points</h2>
          <QR
            name={session.data.user.teamName}
            studentId={session.data.user.studentId}
          />
        </>
      ) : (
        <main className="container flex gap-10 justify-center items-center mx-auto ">
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
        </main>
      )}
    </>
  );
}
