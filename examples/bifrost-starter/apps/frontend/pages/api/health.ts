// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Record<never, unknown>>,
): void => {
  res.status(200).end();
};

export default handler;
