import { FC } from 'react';

import style from './CrashFallback.module.css';

export const CrashFallback: FC<{ reset?: () => void }> = ({ reset }) => (
  <div className={style.fallbackContent}>
    <h2>Sorry, this is not working properly.</h2>
    <br />
    <p>We know about this issue and are working to fix it.</p>
    <br />
    <p>In the meantime, here is what you can do:</p>
    <ul className={style.helperList}>
      {reset && (
        <li>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              reset
            }
          >
            Try again
          </button>
        </li>
      )}
      <li>Refresh the page (sometimes it helps).</li>
      <li>Try again in 30 minutes.</li>
    </ul>
  </div>
);
