import { getAllAdventures } from '@/api/adventure';
import Adventures from '@/components/pages/Adventures';
import NotFound from '@/components/pages/NotFound';
import { _, createUrl, getPages } from '@/utils/helpers';
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from 'next';

const NOT_FOUND_HTTP_STATUS_CODE = 404;

const AEM_ROOT = `/content/${process.env.NEXT_PUBLIC_AEM_SITE}/us/en`;

const Page = ({
  errorCode,
  data,
  pages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (errorCode === NOT_FOUND_HTTP_STATUS_CODE) {
    return <NotFound pages={pages} />;
  }

  return (
    <Adventures data={data?.adventures} pages={pages} createUrl={createUrl} />
  );
};

export default Page;

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const pages = await getPages(AEM_ROOT);
  pages.push({ name: 'Adventures', href: '/adventures' });

  const response = await getAllAdventures();
  const adventures = response?.data?.adventureList?.items || [];

  const errorCode = _.isEmpty(adventures) ? NOT_FOUND_HTTP_STATUS_CODE : false;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {
      errorCode,
      pages,
      data: { adventures },
    },
  };
};
