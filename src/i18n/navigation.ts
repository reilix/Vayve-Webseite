import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Lokalisierte Navigation (Link/redirect/usePathname/useRouter).
 * <Link href="/ueber-uns"> wird automatisch zu /de/ueber-uns bzw. /en/about.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
