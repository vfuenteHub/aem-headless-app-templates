import Adventure from '@/components/pages/Adventure';
import NotFound from '@/components/pages/NotFound';
import { getAdventurePaths, getAdventures } from '@/services/adventures';
import { _, createUrl, getPages } from '@/utils/helpers';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

const NOT_FOUND_HTTP_STATUS_CODE = 404;

const AEM_ROOT = `/content/${process.env.NEXT_PUBLIC_AEM_SITE}/us/en`;

export const getStaticPaths = (async () => {
  const paths = await getAdventurePaths();

  return {
    paths,
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }: GetStaticPropsContext) => {
  const pages = await getPages(AEM_ROOT);
  pages.push({ name: 'Adventures', href: '/adventures' });

  const { path: [slug] = [''] } = { ...params };
  const adventure = await getAdventures(slug);

  const errorCode = _.isEmpty(adventure) ? NOT_FOUND_HTTP_STATUS_CODE : false;

  return {
    props: {
      errorCode,
      pages,
      data: { adventure },
    },
  };
}) satisfies GetStaticProps<{
  errorCode: boolean | number;
  pages: any[];
  data: {
    adventure: any;
  };
}>;

export default function Page({
  errorCode,
  data: { adventure },
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode === NOT_FOUND_HTTP_STATUS_CODE) {
    return <NotFound pages={pages} />;
  }

  return <Adventure data={adventure} pages={pages} createUrl={createUrl} />;
}
