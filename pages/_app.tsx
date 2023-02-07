import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { AppWrapper } from "../context/state";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
      <ToastContainer />
      <Analytics />
    </AppWrapper>
  );
}
