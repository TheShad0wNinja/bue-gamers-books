import "../styles/globals.css";
import Nav from "../components/Nav";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BUE Gamers</title>
        <meta name="description" content="BUE Gamers x CSED Book Over" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Nav />
        <div className="container mx-auto flex flex-col items-center justify-center p-5">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp;
