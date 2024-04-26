import { getResponsivegridModel } from '@/api/model';
import NotFound from '@/components/pages/NotFound';
import Root from '@/components/pages/Root';
import { _, getPages } from '@/utils/helpers';
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

  return <Root data={data} pages={pages} />;
};

export default Page;

export const getServerSideProps = async ({
  res,
  query,
}: GetServerSidePropsContext) => {
  const pages = await getPages(AEM_ROOT);
  pages.push({ name: 'Adventures', href: '/adventures' });

  const { page = ['home'] } = query;
  const pagePath = `${AEM_ROOT}/${(page as string[])?.join('/')}`;
  const model = await getResponsivegridModel(pagePath);

  const errorCode = _.isEmpty(model) ? NOT_FOUND_HTTP_STATUS_CODE : false;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {
      errorCode,
      pages,
      data: {
        model,
        pagePath,
      },
    },
  };
};
