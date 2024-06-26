import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const LOCALE = 'en';

export default function Document() {
  return (
    <Html className="no-js" lang={LOCALE}>
      <Head>
        <Script
          id="app-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.replace('no-js', 'js');`,
          }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
