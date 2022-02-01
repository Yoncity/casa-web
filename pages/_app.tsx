import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux";
// import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/src/stylesheets/datepicker.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Casa, Safe Crypto Locker</title>
        <link rel="icon" href="/assets/icons/casa.png" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
