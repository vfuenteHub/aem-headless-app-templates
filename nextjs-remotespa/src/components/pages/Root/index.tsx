// @ts-nocheck
import Layout from '@/components/templates/Layout';
import { setTitle } from '@/utils/helpers';
import Head from 'next/head';
import { useMemo } from 'react';
import { ResponsiveGrid } from '~/aem/components/ResponsiveGrid';

const Root = ({ data, pages }: Page.Props) => {
  const title = useMemo(
    () => setTitle(data?.model.title),
    [data?.model?.title]
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout pages={pages}>
        <section>
          <div className="px-2 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-2 lg:py-6">
            <ResponsiveGrid
              key={data?.pagePath}
              model={data?.model}
              pagePath={data?.pagePath}
              itemPath="root/responsivegrid"
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Root;
