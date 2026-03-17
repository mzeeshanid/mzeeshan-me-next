import Document, { Head, Html, Main, NextScript } from "next/document";

const colorPaletteScript = `
  (function() {
    try {
      var key = 'mzeeshan:accent-palette';
      var allowed = ['gray','red','orange','yellow','green','teal','blue','cyan','purple','pink'];
      var saved = window.localStorage.getItem(key);
      var palette = allowed.indexOf(saved) >= 0 ? saved : 'green';
      window.__INITIAL_COLOR_PALETTE__ = palette;
      document.documentElement.dataset.colorPalette = palette;
    } catch (e) {}
  })();
`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: colorPaletteScript }} />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7172772388497840"
            crossOrigin="anonymous"
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
