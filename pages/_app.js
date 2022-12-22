import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Drawer from "../components/Drawer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BUE Gamers</title>
        <meta name="description" content="BUE Gamers x CSED Book Over" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
