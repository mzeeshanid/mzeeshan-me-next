import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, createContext } from "react";

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
    router.events.on("routeChangeComplete", handleRouteChange);
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
    </GlobalContext.Provider>
  );
}

export default MyApp;
