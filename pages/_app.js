import "../styles/globals.css";
import Nav from "../components/Nav";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
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
      <SessionProvider session={pageProps.session}>
        <Nav />
        <div className="container flex flex-col justify-center items-center mx-auto p-5">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp;
