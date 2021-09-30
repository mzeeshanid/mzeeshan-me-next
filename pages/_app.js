import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

import * as ga from "../lib/ga";
import { DefaultSeo } from "next-seo";
import appGenericMeta from "../src/data/appGenericMeta";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const meta = appGenericMeta();

  return (
    <ChakraProvider>
      <DefaultSeo
        defaultTitle={meta.title}
        canonical={"https://www.mzeeshan.me/"}
        openGraph={{
          type: "website",
          locale: "en",
          url: "https://www.mzeeshan.me/",
          site_name: meta.title,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
