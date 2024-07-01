import { fetchModel } from '@adobe/aem-react-editable-components';

const AEM_HOST = `${process.env.NEXT_PUBLIC_AEM_HOST}`;
const OPTIONS = {
  credentials: 'include',
};

export const getResponsivegridModelByPagePath = (
  pagePath: string,
  variables = {}
) => {
  const { headers = {}, ...rest } = { ...variables };

  return fetchModel({
    pagePath,
    itemPath: 'root/responsivegrid',
    host: AEM_HOST,
    options: {
      ...OPTIONS,
      ...rest,
      headers: {
        ...headers,
        Authorization: `Basic ${btoa(
          `${process.env.AEM_AUTHORIZATION_USER}:${process.env.AEM_AUTHORIZATION_PASSWORD}`
        )}`,
      },
    },
  });
};
