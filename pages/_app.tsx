import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, createContext } from "react";
import Script from "next/script";

import * as ga from "../lib/ga";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Provider } from "../styles/provider";
import { ColorPaletteProvider } from "../src/contexts/useColorPalette";

// Store Strapi Global object in context
export const GlobalContext = createContext<Record<string, any>>({});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { global } = pageProps;
  const isGoogleAnalyticsEnabled =
    process.env.NODE_ENV === "production" &&
    Boolean(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);

  useEffect(() => {
    if (!isGoogleAnalyticsEnabled) {
      return;
    }

    const handleRouteChange = (url: string) => {
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
  }, [isGoogleAnalyticsEnabled, router.events]);

  return (
    <GlobalContext.Provider value={global}>
      <Provider>
        <ColorPaletteProvider>
          <Component {...pageProps} />
          {isGoogleAnalyticsEnabled ? (
            <GoogleAnalytics
              gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}
            />
          ) : null}
        </ColorPaletteProvider>
      </Provider>
      <Script
        id="adsense"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7172772388497840"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </GlobalContext.Provider>
  );
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
/*
MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  return { ...appProps };
};
*/
export default MyApp;
