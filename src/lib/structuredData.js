import {
  CHANNEL_URL,
  INSTAGRAM_URL,
  LOGO_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const PERSON_ID = `${SITE_URL}/about#bug`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Dan Fellini",
  alternateName: "Bug",
  url: `${SITE_URL}/about`,
  jobTitle: "Motorcycle YouTube creator",
  sameAs: [CHANNEL_URL, INSTAGRAM_URL],
};

export const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  founder: { "@id": PERSON_ID },
  sameAs: [CHANNEL_URL, INSTAGRAM_URL],
};

export const website = {
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": ORGANIZATION_ID },
};

export function videoObject(video) {
  return {
    "@type": "VideoObject",
    name: video.fullTitle,
    description: video.description || video.fullTitle,
    thumbnailUrl: [video.thumbnail],
    uploadDate: video.publishedAt,
    ...(video.duration && { duration: video.duration }),
    embedUrl: video.embedUrl,
    url: `${SITE_URL}/videos/${video.id}`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}
