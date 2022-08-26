import style from './AppCrashFallback.module.css';

export const AppCrashFallback = () => (
  <main className={style.container}>
    <div className={style.pageContent}>
      <h1>Sorry, this is not working properly.</h1>
      <br />
      <p>We know about this issue and are working to fix it.</p>
      <br />
      <p>In the meantime, here is what you can do:</p>
      <ul className={style.helperList}>
        <li>Refresh the page (sometimes it helps).</li>
        <li>Try again in 30 minutes.</li>
      </ul>
    </div>
  </main>
);
