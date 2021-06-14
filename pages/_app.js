import Head from "next/head";
import Layout from "../components/layout/Layout";
import { Provider } from "next-auth/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // the title and description inside header will be overidden for the pages that have their ouwn title/description
  return (
    // Provider will provide the session to all the app; setting session to pageProps.session
    // only in the pages that have session prop (ex profile page) session will be defined
    // this escapes useSession validation; if session is null, useSession will act; but in the cases we 
    // have session this way we improve performance and save an extra http req, which useSession sends to check auth
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <title>Meetups</title>
          <meta name="description" content="List meetups" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
