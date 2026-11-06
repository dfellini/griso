import he from "he";

const CHANNEL_ID = "UC-GaHIsTlT1KUt5c4yWNUDA";
// The uploads playlist. Unlike search.list, this is always current: the search
// index can lag new uploads by days.
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace(/^UC/, "UU");
const API_URL = "https://www.googleapis.com/youtube/v3";
const VIDEO_ID_PATTERN = /^[\w-]{11}$/;
// A safety limit, comfortably above the channel's current size.
const MAX_PAGES = 20;

async function youtube(path, params, revalidate) {
  const query = new URLSearchParams({
    ...params,
    key: process.env.YOUTUBE_KEY ?? "",
  });
  const response = await fetch(`${API_URL}/${path}?${query}`, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`YouTube ${path} returned ${response.status}.`);
  }

  return response.json();
}

function toVideo(id, snippet, contentDetails) {
  const fullTitle = he.decode(snippet.title);
  const [title, series] = fullTitle.split(" | ");
  const { maxres, standard, high, medium } = snippet.thumbnails ?? {};

  return {
    id,
    title,
    series,
    fullTitle,
    description: snippet.description ?? "",
    thumbnail: (maxres ?? standard ?? high ?? medium)?.url,
    // 16:9 and light enough for long lists, unlike the letterboxed larger sizes.
    smallThumbnail: (high ?? medium ?? maxres)?.url,
    publishedAt: snippet.publishedAt,
    duration: contentDetails?.duration,
    path: `/videos/${id}`,
    youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
  };
}

function fromPlaylistItem({ snippet, status }) {
  if (status?.privacyStatus !== "public") {
    return null;
  }

  return toVideo(snippet.resourceId.videoId, snippet);
}

/** The newest uploads, for the home page. Throws if YouTube can't be reached. */
export async function getLatestVideos(count = 5) {
  const { items = [] } = await youtube(
    "playlistItems",
    {
      part: "snippet,status",
      playlistId: UPLOADS_PLAYLIST_ID,
      maxResults: String(count),
    },
    180,
  );

  return items.map(fromPlaylistItem).filter(Boolean);
}

/** Every public upload, newest first. Throws if YouTube can't be reached. */
export async function getAllVideos() {
  const videos = [];
  let pageToken;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const { items = [], nextPageToken } = await youtube(
      "playlistItems",
      {
        part: "snippet,status",
        playlistId: UPLOADS_PLAYLIST_ID,
        maxResults: "50",
        ...(pageToken && { pageToken }),
      },
      3600,
    );

    videos.push(...items.map(fromPlaylistItem).filter(Boolean));
    pageToken = nextPageToken;

    if (!pageToken) {
      break;
    }
  }

  return videos;
}

/**
 * One video, or null if the ID isn't a public video on this channel. The channel
 * check stops /videos/<anyone's video> from creating pages on this site.
 * Throws if YouTube can't be reached, so a cached page survives an outage
 * instead of turning into a 404.
 */
export async function getVideo(id) {
  if (!VIDEO_ID_PATTERN.test(id)) {
    return null;
  }

  const { items = [] } = await youtube(
    "videos",
    { part: "snippet,contentDetails,status", id },
    // A day, so crawling every video page can't use up the daily API quota.
    86400,
  );
  const [item] = items;

  if (
    !item ||
    item.snippet.channelId !== CHANNEL_ID ||
    item.status?.privacyStatus !== "public"
  ) {
    return null;
  }

  return {
    ...toVideo(item.id, item.snippet, item.contentDetails),
    embeddable: item.status?.embeddable !== false,
  };
}

export function formatVideoDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Turns YouTube's PT20M29S into 20:29. */
export function formatDuration(duration) {
  const match = duration?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);

  if (!match) {
    return null;
  }

  const [, hours, minutes = "0", seconds = "0"] = match;
  const rest = `${hours ? minutes.padStart(2, "0") : minutes}:${seconds.padStart(2, "0")}`;

  return hours ? `${hours}:${rest}` : rest;
}

/** A short plain-text summary for search results, cut at a word boundary. */
export function summarize(text, fallback, maxLength = 155) {
  const clean = text
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) {
    return fallback;
  }

  if (clean.length <= maxLength) {
    return clean;
  }

  const cut = clean.slice(0, maxLength - 1);

  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
