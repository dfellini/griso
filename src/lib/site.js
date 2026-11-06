export const SITE_URL = "https://www.bugmoto.com";
export const SITE_NAME = "BugMoto";
export const CHANNEL_URL = "https://youtube.com/@bugmotochannel";
export const INSTAGRAM_URL = "https://www.instagram.com/bugmotochannel/";
export const LOGO_URL = `${SITE_URL}/icon.png`;

const DEFAULT_PREVIEW_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Bug standing in riding gear next to a loaded Moto Guzzi motorcycle on a coastal road",
};

/**
 * Metadata for a page, with its canonical URL. Setting `openGraph` on a page
 * replaces the layout's whole `openGraph` object, and stops subpages inheriting
 * app/opengraph-image.jpg, so this repeats the shared fields and the image.
 */
export function pageMetadata({ title, description, path, absoluteTitle }) {
  const fullTitle = absoluteTitle ?? `${title} - ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [DEFAULT_PREVIEW_IMAGE],
    },
  };
}
