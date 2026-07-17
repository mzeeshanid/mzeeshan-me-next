import Document, { Head, Html, Main, NextScript } from "next/document";

// Reads accent-color cookie and stamps data-color-palette on <html> before
// first paint, so the palette CSS below can apply the correct variables
// without waiting for React to hydrate.
const PALETTE_SCRIPT = `(function(){
  var m=document.cookie.match(/(?:^|;\\s*)accent-color=([^;]+)/);
  var p=m?m[1]:'green';
  var ok=['gray','red','orange','yellow','green','teal','blue','cyan','purple','pink'];
  if(ok.indexOf(p)===-1)p='green';
  document.documentElement.setAttribute('data-color-palette',p);
})();`;

// Selectors use specificity (0,2,0) — :root pseudo-class (0,1,0) +
// [data-color-palette] attribute (0,1,0) — which beats Chakra's per-component
// colorPalette class (0,1,0), so these rules win during the hydration gap
// when React still has the default palette in state.
const PALETTE_CSS = `
:root[data-color-palette="gray"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-gray-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-gray-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-gray-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-gray-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-gray-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-gray-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-gray-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-gray-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-gray-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-gray-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-gray-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-gray-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-gray-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-gray-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-gray-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-gray-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-gray-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-gray-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-gray-border);
}
:root[data-color-palette="red"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-red-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-red-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-red-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-red-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-red-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-red-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-red-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-red-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-red-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-red-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-red-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-red-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-red-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-red-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-red-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-red-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-red-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-red-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-red-border);
}
:root[data-color-palette="orange"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-orange-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-orange-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-orange-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-orange-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-orange-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-orange-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-orange-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-orange-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-orange-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-orange-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-orange-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-orange-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-orange-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-orange-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-orange-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-orange-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-orange-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-orange-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-orange-border);
}
:root[data-color-palette="yellow"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-yellow-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-yellow-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-yellow-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-yellow-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-yellow-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-yellow-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-yellow-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-yellow-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-yellow-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-yellow-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-yellow-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-yellow-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-yellow-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-yellow-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-yellow-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-yellow-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-yellow-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-yellow-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-yellow-border);
}
:root[data-color-palette="green"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-green-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-green-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-green-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-green-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-green-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-green-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-green-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-green-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-green-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-green-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-green-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-green-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-green-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-green-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-green-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-green-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-green-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-green-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-green-border);
}
:root[data-color-palette="teal"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-teal-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-teal-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-teal-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-teal-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-teal-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-teal-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-teal-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-teal-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-teal-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-teal-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-teal-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-teal-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-teal-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-teal-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-teal-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-teal-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-teal-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-teal-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-teal-border);
}
:root[data-color-palette="blue"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-blue-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-blue-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-blue-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-blue-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-blue-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-blue-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-blue-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-blue-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-blue-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-blue-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-blue-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-blue-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-blue-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-blue-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-blue-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-blue-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-blue-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-blue-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-blue-border);
}
:root[data-color-palette="cyan"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-cyan-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-cyan-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-cyan-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-cyan-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-cyan-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-cyan-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-cyan-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-cyan-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-cyan-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-cyan-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-cyan-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-cyan-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-cyan-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-cyan-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-cyan-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-cyan-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-cyan-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-cyan-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-cyan-border);
}
:root[data-color-palette="purple"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-purple-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-purple-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-purple-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-purple-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-purple-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-purple-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-purple-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-purple-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-purple-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-purple-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-purple-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-purple-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-purple-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-purple-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-purple-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-purple-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-purple-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-purple-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-purple-border);
}
:root[data-color-palette="pink"] * {
  --chakra-colors-color-palette-50: var(--chakra-colors-pink-50);
  --chakra-colors-color-palette-100: var(--chakra-colors-pink-100);
  --chakra-colors-color-palette-200: var(--chakra-colors-pink-200);
  --chakra-colors-color-palette-300: var(--chakra-colors-pink-300);
  --chakra-colors-color-palette-400: var(--chakra-colors-pink-400);
  --chakra-colors-color-palette-500: var(--chakra-colors-pink-500);
  --chakra-colors-color-palette-600: var(--chakra-colors-pink-600);
  --chakra-colors-color-palette-700: var(--chakra-colors-pink-700);
  --chakra-colors-color-palette-800: var(--chakra-colors-pink-800);
  --chakra-colors-color-palette-900: var(--chakra-colors-pink-900);
  --chakra-colors-color-palette-950: var(--chakra-colors-pink-950);
  --chakra-colors-color-palette-contrast: var(--chakra-colors-pink-contrast);
  --chakra-colors-color-palette-fg: var(--chakra-colors-pink-fg);
  --chakra-colors-color-palette-subtle: var(--chakra-colors-pink-subtle);
  --chakra-colors-color-palette-muted: var(--chakra-colors-pink-muted);
  --chakra-colors-color-palette-emphasized: var(--chakra-colors-pink-emphasized);
  --chakra-colors-color-palette-solid: var(--chakra-colors-pink-solid);
  --chakra-colors-color-palette-focus-ring: var(--chakra-colors-pink-focus-ring);
  --chakra-colors-color-palette-border: var(--chakra-colors-pink-border);
}
`.trim();

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: PALETTE_SCRIPT }} />
          <style dangerouslySetInnerHTML={{ __html: PALETTE_CSS }} />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7172772388497840"
            crossOrigin="anonymous"
          />
          <script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="1zs9QMzDCPMDOE5p17fv1g"
            async
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
