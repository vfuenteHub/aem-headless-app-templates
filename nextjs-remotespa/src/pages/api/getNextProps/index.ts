import type { NextApiRequest, NextApiResponse } from 'next';

const { DOMParser } = require('@xmldom/xmldom');
const parser = new DOMParser();

const URL = process.env.NEXT_PUBLIC_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path = '' } = req?.query;

  try {
    const pageRes = await fetch(`${URL}/${path}`);
    const pageText = await pageRes.text();

    const doc = parser.parseFromString(pageText, 'text/html');
    const nextPropsContent = doc.getElementById('__NEXT_DATA__').textContent;

    const data = JSON.parse(nextPropsContent);

    res.status(200).setHeader('Cache-Control', 's-maxage=10').json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load "__NEXT_DATA__"' });
  }
}
