import { ExecutionContext } from '@nestjs/common';

const defaultRequest = {
  user: null,
};

export const getExecutionContextFromRequest = (
  overrideRequest: Record<string, unknown> = {},
): ExecutionContext => {
  return {
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({ ...defaultRequest, ...overrideRequest }),
    }),
  };
};
