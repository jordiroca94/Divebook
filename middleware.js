export { default } from "next-auth/middleware";

// Protected pages
export const config = { matcher: ["/profile"] };
