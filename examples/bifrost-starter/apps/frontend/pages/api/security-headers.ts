// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import { z } from 'zod';

// const CSPReport = z.object({
//   'blocked-uri': z.string(),
//   disposition: z.string(),
//   'document-uri': z.string(),
//   'effective-directive': z.string(),
//   'original-policy': z.string(),
//   referrer: z.string(),
//   'script-sample': z.string(),
//   'violated-directive': z.string(),
//   'source-file': z.string(),
// });

type CSPReport = {
  'blocked-uri': string,
  'column-number': number,
  'disposition': string,
  'document-uri': string,
  'effective-directive': string,
  'line-number': number,
  'original-policy': string,
  'referrer': string,
  'script-sample': string,
  'source-file': string,
  'status-code': number,
  'violated-directive': string,
};


type CSPReportBody = {
  'csp-report': CSPReport;
};

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const slackWebhookURL = process.env.SLACK_WEBHOOK_CSP_REPORT_HEADER;
  const body = JSON.parse(req.body as string) as CSPReportBody;
  console.log("body : ", body)
  const cspReport = body['csp-report'];
  const trueResult = {
    'blocked-uri': cspReport['blocked-uri'],
    'disposition': cspReport['disposition'],
    'document-uri': cspReport['document-uri'],
    'effective-directive': cspReport['effective-directive'],
    'original-policy': cspReport['original-policy'],
    'referrer': cspReport['referrer'],
    'script-sample': cspReport['script-sample'],
    'source-file': cspReport['source-file'],
    'violated-directive': cspReport['violated-directive'],
  }

  // TODO: Add a Schema Validation step - MarineMB 02/12/2022

  if (req.method === 'POST' && slackWebhookURL !== undefined) {
    const res = await fetch(slackWebhookURL, {
      method: 'POST',
      body: JSON.stringify(trueResult),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('###### res')
    console.log(res)
  }

  res
    .status(res.statusCode)
    .json(res.json);
}