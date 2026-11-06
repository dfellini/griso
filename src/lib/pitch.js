export const VIDEO_TYPES = [
  "General",
  "How-to",
  "Review",
  "Travel",
  "Opinion",
  "Other",
];

export const PITCH_LIMITS = {
  name: 100,
  email: 254,
  youtube: 100,
  title: 120,
  description: 2000,
  why: 1000,
  location: 200,
};

const REQUIRED_MESSAGES = {
  name: "Please tell me your name.",
  title: "Please give your idea a short title.",
  description: "Please describe your idea.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Browsers submit textarea line breaks as \r\n, but the maxLength attribute
// counts them as one character. Normalizing keeps both length checks in step.
function readText(formData, field) {
  return String(formData.get(field) ?? "")
    .replace(/\r\n/g, "\n")
    .trim();
}

export function validatePitch(formData) {
  const values = {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    youtube: readText(formData, "youtube"),
    title: readText(formData, "title"),
    type: readText(formData, "type"),
    description: readText(formData, "description"),
    why: readText(formData, "why"),
    location: readText(formData, "location"),
    credit: formData.get("credit") === "on",
  };

  const errors = {};

  for (const [field, limit] of Object.entries(PITCH_LIMITS)) {
    if (values[field].length > limit) {
      errors[field] = `Please keep this to ${limit} characters or fewer.`;
    }
  }

  for (const [field, message] of Object.entries(REQUIRED_MESSAGES)) {
    if (!values[field]) {
      errors[field] = message;
    }
  }

  if (values.email && !errors.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "That email address doesn't look right.";
  }

  if (!VIDEO_TYPES.includes(values.type)) {
    errors.type = "Please choose a video type.";
  }

  return { values, errors };
}

export function formatPitchEmail(pitch) {
  const details = [
    `From: ${pitch.name}`,
    pitch.email && `Email: ${pitch.email}`,
    pitch.youtube && `YouTube: ${pitch.youtube}`,
    `Video type: ${pitch.type}`,
    pitch.location && `Location or bike: ${pitch.location}`,
    `OK to mention their name: ${pitch.credit ? "Yes" : "No"}`,
  ].filter(Boolean);

  const sections = [
    pitch.title,
    details.join("\n"),
    `THE IDEA\n${pitch.description}`,
    pitch.why && `WHY OTHER RIDERS WOULD WATCH\n${pitch.why}`,
  ].filter(Boolean);

  return {
    subject: `Video pitch: ${pitch.title.replace(/\s+/g, " ")}`,
    text: sections.join("\n\n"),
  };
}
