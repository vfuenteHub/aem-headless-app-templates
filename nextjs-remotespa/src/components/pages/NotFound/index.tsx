import Layout from '@/components/templates/Layout';
import { setTitle } from '@/utils/helpers';
import Head from 'next/head';
import { useMemo } from 'react';
import Typography from '~/ui/components/atoms/Typography';

const NotFound = ({ pages }: Page.Props) => {
  const title = useMemo(() => setTitle('404'), []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout pages={pages}>
        <section>
          <div className="bg-white">
            <div className="max-w-2xl px-4 py-10 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
              <Typography
                className="text-2xl font-extrabold tracking-tight text-gray-900"
                component="h2"
              >
                404
              </Typography>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default NotFound;
