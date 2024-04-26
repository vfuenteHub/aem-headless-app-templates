import { getAdventureBySlug, getAdventurePaths } from '@/api/adventure';
import Adventure from '@/components/pages/Adventure';
import NotFound from '@/components/pages/NotFound';
import { _, createUrl, getPages } from '@/utils/helpers';
import { type GetStaticPropsContext, type InferGetStaticPropsType } from 'next';

const NOT_FOUND_HTTP_STATUS_CODE = 404;

const AEM_ROOT = `/content/${process.env.NEXT_PUBLIC_AEM_SITE}/us/en`;

const Page = ({
  errorCode,
  data,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (errorCode === NOT_FOUND_HTTP_STATUS_CODE) {
    return <NotFound pages={pages} />;
  }

  return (
    <Adventure data={data?.adventure} pages={pages} createUrl={createUrl} />
  );
};

export default Page;

export const getStaticPaths = async () => {
  const paths = await getAdventurePaths();

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const pages = await getPages(AEM_ROOT);
  pages.push({ name: 'Adventures', href: '/adventures' });

  const { path: [slug] = [''] } = { ...params };
  const res: any = await getAdventureBySlug({ slug });
  const adventure = res?.data?.adventureList?.items[0] || {};

  const errorCode = _.isEmpty(adventure) ? NOT_FOUND_HTTP_STATUS_CODE : false;

  return {
    props: {
      errorCode,
      pages,
      data: { adventure },
    },
  };
};
