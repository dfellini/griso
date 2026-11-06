import { SITE_URL } from "@/lib/site";
import { getAllVideos, summarize } from "@/lib/youtube";

export const revalidate = 3600;

const PATHS = ["", "/videos", "/about", "/partners", "/pitch"];

// Next.js writes these values into the XML as they are, so a title with an "&"
// would otherwise make the whole sitemap invalid.
function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function sitemap() {
  const pages = PATHS.map((path) => ({ url: `${SITE_URL}${path}` }));

  let videos = [];

  try {
    videos = await getAllVideos();
  } catch (error) {
    console.error("Sitemap: could not load videos from YouTube.", error);
  }

  return [
    ...pages,
    ...videos.map((video) => ({
      url: `${SITE_URL}${video.path}`,
      lastModified: video.publishedAt,
      videos: [
        {
          title: escapeXml(video.fullTitle),
          thumbnail_loc: escapeXml(video.thumbnail),
          description: escapeXml(
            summarize(video.description, video.fullTitle, 2000),
          ),
          player_loc: escapeXml(video.embedUrl),
          publication_date: video.publishedAt,
        },
      ],
    })),
  ];
}
