import App, { AppProps, AppContext } from "next/app";
import { useRouter } from "next/router";
import { useEffect, createContext } from "react";

import * as ga from "../lib/ga";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Provider } from "../styles/provider";
import {
  ColorPaletteProvider,
  parsePaletteCookie,
  type Palette,
} from "../src/contexts/useColorPalette";

// Store Strapi Global object in context
export const GlobalContext = createContext<Record<string, any>>({});

type MyAppProps = AppProps & { initialPalette: Palette };

function MyApp({ Component, pageProps, initialPalette }: MyAppProps) {
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
        <ColorPaletteProvider initialPalette={initialPalette}>
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

// Reads the accent-color cookie on every SSR request so the server renders
// with the correct palette — eliminating the green flash entirely.
// Pages with getStaticProps remain statically generated; only pages without it
// become SSR (the same trade-off that was already acknowledged in this file).
MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  const cookieHeader = ctx.ctx.req?.headers.cookie ?? "";
  const initialPalette = parsePaletteCookie(cookieHeader);
  return { ...appProps, initialPalette };
};

export default MyApp;
