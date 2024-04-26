import type { NextApiRequest, NextApiResponse } from 'next';

const { DOMParser } = require('@xmldom/xmldom');

const URL = process.env.NEXT_PUBLIC_URL;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { path = '' } = req?.query;

  const pageRes = await fetch(`${URL}/${path}`);
  const pageText = await pageRes.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(pageText, 'text/html');

  let data = {};

  try {
    const nextPropsContent = doc.getElementById('__NEXT_DATA__').textContent;
    data = JSON.parse(nextPropsContent);
  } catch (e) {
    console.error(e);
  }

  res.status(200).setHeader('Cache-Control', 's-maxage=10').json(data);
};

export default handler;
