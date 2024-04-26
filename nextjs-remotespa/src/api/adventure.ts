import HeadlessClient from '~/aem/libs/HeadlessClient';
import { hide, show } from '~/ui/plugins/Loaders/store';

const AEM_GRAPHQL_ENDPOINT = 'wknd-shared';

const { client } = new HeadlessClient({
  serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
  endpoint: '/content/_cq_graphql/wknd-shared/endpoint.json',
  auth: [
    process.env.AEM_AUTHORIZATION_USER!,
    process.env.AEM_AUTHORIZATION_PASSWORD!,
  ],
});

export const getAllAdventures = async (variables = {}) => {
  show();

  let adventures = [];

  try {
    adventures =
      (await client.runPersistedQuery(
        `${AEM_GRAPHQL_ENDPOINT}/adventures-all`,
        variables
      )) || [];
  } catch (e) {
    console.error(e);
  }

  hide();

  return adventures;
};

export const getAdventurePaths = async () => {
  show();

  let adventures = [];

  try {
    const res = await getAllAdventures();
    adventures = res?.data?.adventureList?.items || [];
  } catch (e) {
    console.error(e);
  }

  hide();

  return adventures?.map(({ slug }: any) => ({
    params: {
      path: [slug],
    },
  }));
};

export const getAdventureBySlug = async (variables = {}) => {
  show();

  let adventure = {};

  try {
    adventure =
      (await client.runPersistedQuery(
        `${AEM_GRAPHQL_ENDPOINT}/adventure-by-slug`,
        variables
      )) || {};
  } catch (e) {
    console.error(e);
  }

  hide();

  return adventure;
};
