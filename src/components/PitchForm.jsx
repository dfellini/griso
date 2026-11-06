"use client";

import { useActionState } from "react";

import { submitPitch } from "@/app/pitch/actions";
import { Button } from "@/components/Button";
import { PITCH_LIMITS, VIDEO_TYPES } from "@/lib/pitch";

const inputStyles =
  "w-full appearance-none rounded-none border-2 border-ink bg-white px-3.5 py-3 text-[19px] leading-snug font-medium text-ink focus:outline-4 focus:outline-offset-0 focus:outline-moto-red aria-invalid:border-moto-error aria-invalid:bg-red-50";

function Field({ name, label, hint, error, className, children }) {
  return (
    <div className={className}>
      <label
        htmlFor={`pitch-${name}`}
        className="mb-2 block font-condensed text-[22px] leading-tight font-bold tracking-[0.02em]"
      >
        {label}
        {hint && ` (${hint})`}
      </label>
      {children}
      {error && (
        <p
          id={`pitch-${name}-error`}
          className="mt-2 text-[17px] font-semibold text-moto-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function fieldProps(name, state) {
  const error = state.errors?.[name];

  return {
    id: `pitch-${name}`,
    name,
    defaultValue: state.values?.[name] ?? "",
    maxLength: PITCH_LIMITS[name],
    className: inputStyles,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `pitch-${name}-error` : undefined,
  };
}

export function PitchForm() {
  const [state, formAction, isPending] = useActionState(submitPitch, {
    status: "idle",
  });

  if (state.status === "success") {
    return (
      <div role="status" className="max-w-2xl">
        <h2 className="display text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.05]">
          Thanks, I got your pitch!
        </h2>
        <p className="mt-5 text-[22px] leading-snug font-medium">
          I appreciate you taking the time to share it. Ride safe.
        </p>
      </div>
    );
  }

  const selectedType = state.values?.type ?? VIDEO_TYPES[0];

  return (
    <form
      action={formAction}
      className="grid items-end gap-x-7 gap-y-6 sm:grid-cols-2"
    >
      <Field name="name" label="Your name" error={state.errors?.name}>
        <input
          type="text"
          autoComplete="name"
          required
          {...fieldProps("name", state)}
        />
      </Field>
      <Field
        name="youtube"
        label="YouTube handle"
        hint="if you have one"
        error={state.errors?.youtube}
      >
        <input type="text" {...fieldProps("youtube", state)} />
      </Field>

      <Field
        name="email"
        label="Email"
        hint="only if you'd like a reply"
        error={state.errors?.email}
        className="sm:col-span-2"
      >
        <input
          type="email"
          autoComplete="email"
          {...fieldProps("email", state)}
        />
      </Field>

      <Field
        name="title"
        label="Video idea in a nutshell (just a few words)"
        error={state.errors?.title}
      >
        <input type="text" required {...fieldProps("title", state)} />
      </Field>
      <Field name="type" label="Video type" error={state.errors?.type}>
        {/* A select doesn't pick up a new defaultValue after React resets the
            form, so the key remounts it with the submitted value. */}
        <div className="relative">
          <select
            key={selectedType}
            required
            {...fieldProps("type", state)}
            defaultValue={selectedType}
            className={`${inputStyles} pr-10`}
          >
            {VIDEO_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 8 6"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 h-auto w-3 -translate-y-1/2 fill-none stroke-ink"
          >
            <path d="M1.75 1.75 4 4.25l2.25-2.5" strokeWidth="1.5" />
          </svg>
        </div>
      </Field>

      <Field
        name="description"
        label="Describe your idea"
        error={state.errors?.description}
        className="sm:col-span-2"
      >
        <textarea rows={5} required {...fieldProps("description", state)} />
      </Field>

      <Field
        name="why"
        label="Why would other riders want to watch?"
        hint="optional"
        error={state.errors?.why}
        className="sm:col-span-2"
      >
        <textarea rows={2} {...fieldProps("why", state)} />
      </Field>

      <Field
        name="location"
        label="Location or bike involved"
        hint="optional"
        error={state.errors?.location}
        className="sm:col-span-2"
      >
        <input type="text" {...fieldProps("location", state)} />
      </Field>

      {/* Hidden from people. Only bots fill this in. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="pitch-website">Website</label>
        <input
          id="pitch-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className="flex min-h-11 items-center gap-3 text-[19px] leading-snug font-medium sm:col-span-2">
        <input
          type="checkbox"
          name="credit"
          defaultChecked={state.values?.credit ?? false}
          className="h-[26px] w-[26px] flex-none accent-moto-red-dark"
        />
        OK to mention my name if this becomes a video
      </label>

      {state.status === "error" && (
        <p
          role="alert"
          className="text-[19px] font-semibold text-moto-error sm:col-span-2"
        >
          {state.message}
        </p>
      )}

      {state.status === "invalid" && (
        <p
          role="alert"
          className="text-[19px] font-semibold text-moto-error sm:col-span-2"
        >
          Please fix the highlighted fields and try again.
        </p>
      )}

      <div className="flex flex-col items-start gap-3.5 sm:col-span-2">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer text-[26px] sm:w-auto"
        >
          {isPending ? "Sending…" : "Send my pitch"}
        </Button>
        <p className="text-base leading-normal text-zinc-700">
          By submitting, you&rsquo;re OK with me using your idea in a video,
          without payment. Your email is only used to reply to you.
        </p>
      </div>
    </form>
  );
}
