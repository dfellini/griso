/**
 * Renders schema.org data for search engines. Video titles and descriptions
 * end up in here, so "<" is escaped to stop them closing the script tag.
 */
export function JsonLd({ data }) {
  const json = JSON.stringify({ "@context": "https://schema.org", ...data });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
