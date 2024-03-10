/**
 *An arry of routes that are accessible to the public
 * These routes do not require authentication
 * @types {string[]}
 */

export  const publicRoutes = [
    "/",
    "/auth/new-verification"

];

/**
 *An arry of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @types {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
];

/**
 *The prefix for API authentication routes
 * routes that starts with this prefix are used for Api authentication purposes
 * @types {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *The default redirect path after logging in
 * @types {string[]}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";