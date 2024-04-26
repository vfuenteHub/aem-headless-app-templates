import AdventureCard from '@/components/organisms/Card';
import Layout from '@/components/templates/Layout';
import { setTitle } from '@/utils/helpers';
import Head from 'next/head';
import { useMemo } from 'react';
import Typography from '~/ui/components/atoms/Typography';

const Adventures = ({ data, pages, createUrl }: Page.Props) => {
  const title = useMemo(() => setTitle('Adventures'), []);

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
                Your next adventures can be one of these...
              </Typography>

              <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {data?.map(
                  ({
                    slug,
                    title,
                    price,
                    tripLength,
                    primaryImage: { _dynamicUrl, _path },
                  }: any) => (
                    <AdventureCard
                      key={slug}
                      slug={slug}
                      title={title}
                      price={price}
                      duration={tripLength}
                      imageSrc={createUrl?.call(this, _dynamicUrl || _path)!}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Adventures;
