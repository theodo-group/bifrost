'use client';

import Error from 'next/error';
import { FC } from 'react';

// Render the default Next.js 404 page

const NotFound: FC = () => {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
};

export default NotFound;
