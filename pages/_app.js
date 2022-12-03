import "../styles/globals.css";
import Nav from "../components/Nav";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
