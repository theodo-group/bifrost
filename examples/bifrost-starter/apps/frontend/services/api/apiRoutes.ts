export const ApiRoutes = {
  logout: '/auth/jwt/logout',
  login: '/auth/jwt/create',
  refresh: '/auth/jwt/refresh',
  me: '/users/me',
  users: '/users/',
} as const;
