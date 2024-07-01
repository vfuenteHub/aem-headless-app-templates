// @ts-nocheck
import Layout from '@/components/templates/Layout';
import { setTitle } from '@/utils/helpers';
import { ResponsiveGrid } from '@adobe/aem-react-editable-components';
import Head from 'next/head';
import { useMemo } from 'react';

const Root = ({ data: { modelProps, pagePath }, pages }: Page.Props) => {
  const title = useMemo(() => setTitle(modelProps.title), [modelProps.title]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout pages={pages}>
        <section>
          <div className="px-2 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-2 lg:py-6">
            <ResponsiveGrid key={pagePath} {...modelProps} />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Root;
