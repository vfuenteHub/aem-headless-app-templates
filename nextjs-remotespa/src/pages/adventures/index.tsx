import Adventures from '@/components/pages/Adventures';
import NotFound from '@/components/pages/NotFound';
import { getAdventures } from '@/services/adventures';
import { _, createUrl, getPages } from '@/utils/helpers';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

const NOT_FOUND_HTTP_STATUS_CODE = 404;

const AEM_ROOT = `/content/${process.env.NEXT_PUBLIC_AEM_SITE}/us/en`;

export const getServerSideProps = (async ({
  res,
}: GetServerSidePropsContext) => {
  const pages = await getPages(AEM_ROOT);
  pages.push({ name: 'Adventures', href: '/adventures' });

  const adventures = await getAdventures();

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
}) satisfies GetServerSideProps<{
  errorCode: boolean | number;
  pages: any[];
  data: {
    adventures: any[];
  };
}>;

export default function Page({
  errorCode,
  data: { adventures },
  pages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (errorCode === NOT_FOUND_HTTP_STATUS_CODE) {
    return <NotFound pages={pages} />;
  }

  return <Adventures data={adventures} pages={pages} createUrl={createUrl} />;
}
