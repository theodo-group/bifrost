import { telemetryConfig } from 'helpers';
import { main } from 'main';

telemetryConfig.forceDisableTelemetry = true;

main('app');
