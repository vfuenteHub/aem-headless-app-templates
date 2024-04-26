import { fetchModel } from '@adobe/aem-react-editable-components';
import { hide, show } from '~/ui/plugins/Loaders/store';

const AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;

export const getResponsivegridModel = async (pagePath: string) => {
  show();

  let model = {};

  try {
    model = await fetchModel({
      pagePath,
      itemPath: 'root/responsivegrid',
      host: AEM_HOST,
      options: {
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.AEM_AUTHORIZATION_USER}:${process.env.AEM_AUTHORIZATION_PASSWORD}`
          )}`,
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  hide();

  return model;
};
