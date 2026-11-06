import { SITE_URL } from "@/lib/site";

const PATHS = ["", "/about", "/partners", "/pitch"];

export default function sitemap() {
  return PATHS.map((path) => ({ url: `${SITE_URL}${path}` }));
}
