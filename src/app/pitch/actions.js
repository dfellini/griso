"use server";

import { formatPitchEmail, validatePitch } from "@/lib/pitch";

const SEND_ERROR =
  "Sorry, your pitch didn't go through. Please try again, or email it to me at dan@bugmoto.com.";

export async function submitPitch(prevState, formData) {
  // Only bots fill in the hidden "website" field. Show them the normal success
  // message so they have no reason to try again.
  if (formData.get("website")) {
    return { status: "success" };
  }

  const { values, errors } = validatePitch(formData);

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", values, errors };
  }

  const { RESEND_API_KEY, PITCH_TO_EMAIL, PITCH_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !PITCH_TO_EMAIL || !PITCH_FROM_EMAIL) {
    console.error(
      "Pitch form: RESEND_API_KEY, PITCH_TO_EMAIL and PITCH_FROM_EMAIL must all be set.",
    );
    return { status: "error", values, message: SEND_ERROR };
  }

  const { subject, text } = formatPitchEmail(values);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: PITCH_FROM_EMAIL,
        to: [PITCH_TO_EMAIL],
        subject,
        text,
        ...(values.email && { reply_to: values.email }),
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(
        `Pitch form: Resend returned ${response.status}: ${await response.text()}`,
      );
      return { status: "error", values, message: SEND_ERROR };
    }
  } catch (error) {
    console.error("Pitch form: could not reach Resend.", error);
    return { status: "error", values, message: SEND_ERROR };
  }

  return { status: "success" };
}
