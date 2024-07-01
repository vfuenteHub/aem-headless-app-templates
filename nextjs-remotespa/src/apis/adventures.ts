import { HeadlessClient } from '~/aem/libs/HeadlessClient';

const AEM_HOST = `${process.env.NEXT_PUBLIC_AEM_HOST}`;
const BASE = 'wknd-shared';
const OPTIONS = {
  credentials: 'include',
};

const { client } = new HeadlessClient({
  serviceURL: AEM_HOST,
  endpoint: '/content/_cq_graphql/wknd-shared/endpoint.json',
  auth: [
    process.env.AEM_AUTHORIZATION_USER!,
    process.env.AEM_AUTHORIZATION_PASSWORD!,
  ],
});

export const getAllAdventures = (variables = {}) =>
  client.runPersistedQuery(`${BASE}/adventures-all`, variables, OPTIONS);

export const getAdventureBySlug = (variables = {}) =>
  client.runPersistedQuery(`${BASE}/adventure-by-slug`, variables, OPTIONS);
