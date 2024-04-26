import type { ModelClient } from '@adobe/aem-spa-page-model-manager';
import CustomModelClient from '~/aem/libs/CustomModelClient';

const modelClient = new CustomModelClient({
  host: process.env.NEXT_PUBLIC_AEM_HOST,
  options: {
    headers: {
      Authorization: `Basic ${btoa(
        `${process.env.AEM_AUTHORIZATION_USER}:${process.env.AEM_AUTHORIZATION_PASSWORD}`
      )}`,
    },
  },
}) as ModelClient & any;

export default modelClient;
