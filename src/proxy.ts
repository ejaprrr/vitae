import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // matchovat pouze internacionalizovane cesty
  matcher: ["/", "/(cs|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
