import { telemetryConfig } from 'helpers';
import { interractiveMain } from 'main';

telemetryConfig.forceDisableTelemetry = true;

interractiveMain();
