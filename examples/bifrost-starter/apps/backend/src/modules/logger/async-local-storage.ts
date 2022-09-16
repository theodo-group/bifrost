import { AsyncLocalStorage } from 'async_hooks';

export const nodeStorage = new AsyncLocalStorage<{ traceId: string }>();
