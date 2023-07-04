import { getExecutionContextFromRequest } from './testUtils';
import { RolesGuard } from '../role.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;

  it('should throw if no roles are provided', () => {
    expect(() => new RolesGuard([])).toThrow();
  });

  it('should return false if user do not exist', () => {
    const executionContext = getExecutionContextFromRequest();
    guard = new RolesGuard(['user']);

    const result = guard.canActivate(executionContext);
    expect(result).toBeFalsy();
  });

  it('should return false if user has not the expected role', () => {
    const executionContext = getExecutionContextFromRequest({
      user: {
        roles: ['user'],
      },
    });
    guard = new RolesGuard(['admin']);

    const result = guard.canActivate(executionContext);
    expect(result).toBeFalsy();
  });

  it('should return true if user has the expected role', () => {
    const executionContext = getExecutionContextFromRequest({
      user: {
        roles: ['user'],
      },
    });
    guard = new RolesGuard(['user']);

    const result = guard.canActivate(executionContext);
    expect(result).toBeTruthy();
  });
});
