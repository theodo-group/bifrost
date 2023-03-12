import fetch from 'node-fetch';

import packageJson from '../../package.json';

const TELEMETRY_WEBHOOK =
  'https://hook.eu1.make.com/4x7gy2rim0cr25qxmaf83km863xp2eju';

export const telemetryConfig = {
  forceDisableTelemetry: false,
};
const isTelemetryDisabled = (): boolean =>
  process.env.BIFROST_TELEMETRY === '0' ||
  telemetryConfig.forceDisableTelemetry;

export const logCreateApp = async (projectName: string): Promise<void> => {
  const body = {
    version: packageJson.version,
    appName: projectName,
    initializedExample:
      'https://github.com/theodo-group/bifrost/tree/main/examples/bifrost-starter',
  };
  if (isTelemetryDisabled()) {
    return;
  }

  try {
    await fetch(TELEMETRY_WEBHOOK, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return;
  }
};
