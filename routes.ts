/**
 *An array of routes that are accessible to the public
 * These routes do not require authentication
 * @types {string[]}
 */

export  const publicRoutes = [
    "/",
    "/auth/new-verification"
];

/**
 *An array of routes that are used for authentication
 * These routes will redirect logged-in users to /settings
 * @types {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];

/**
 *The prefix for API authentication routes
 *that starts with this prefix are used for Api authentication purposes
 * @types {string[]}
 */
export const apiAuthPrefix = "/api/auth";
export const adminPrefix = "/admin";
export const sellerPrefix = "/seller";
export const customerPrefix = "/customer";
/**
 *The default redirect path after logging in
 * @types {string[]}
 */
export const DEFAULT_ADMIN_LOGIN_REDIRECT = "/admin/dashboard";
export const DEFAULT_SELLER_LOGIN_REDIRECT = "/seller/settings";
export const DEFAULT_CUSTOMER_LOGIN_REDIRECT = "/customer/settings";
//