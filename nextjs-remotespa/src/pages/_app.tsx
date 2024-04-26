import { GoogleTagManager, sendGTMEvent } from '@next/third-parties/google';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useReportWebVitals } from 'next/web-vitals';
import { useCallback, useEffect } from 'react';

import { ModelManager } from '@adobe/aem-spa-page-model-manager';

import modelClient from '@/controllers/model';
import '@/controllers/model/components';

import Loading from '@/components/molecules/Loading';
import Loaders from '~/ui/plugins/Loaders';

import '@/styles/global.scss';

const URL = process.env.NEXT_PUBLIC_URL;

const TITLE = process.env.NEXT_PUBLIC_AEM_TITLE;
const DESCRIPTION = process.env.NEXT_PUBLIC_AEM_DESCRIPTION;

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!;

ModelManager.initializeAsync({ modelClient });

const App = ({ Component, pageProps }: AppProps) => {
  const { events } = useRouter();

  useReportWebVitals(metric => {
    sendGTMEvent({
      event: 'web_vitals',
      webVitalsData: {
        name: metric.name,
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1e3 : metric.value
        ), // values must be integers
        event_label: metric.id, // id unique to current page load
        non_interaction: true, // avoids affecting bounce rate.
      },
    });
  });

  const trackPage = useCallback(
    (url: string) =>
      sendGTMEvent({
        event: 'pageView',
        page: url,
      }),
    []
  );

  useEffect(() => {
    events.on('routeChangeComplete', trackPage);

    return () => {
      events.off('routeChangeComplete', trackPage);
    };
  }, [events, trackPage]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>

        <meta name="description" content={DESCRIPTION} />

        <link rel="icon" href="/favicon.ico" />

        <meta property="og:image" content={`${URL}/logo.svg`} />
        <meta name="og:title" content={TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="cq:pagemodel_router" content="disabled" />
      </Head>

      <Loaders fallback={<Loading />}>
        <Component {...pageProps} />
      </Loaders>

      <GoogleTagManager gtmId={GTM_ID} />
    </>
  );
};

export default App;
