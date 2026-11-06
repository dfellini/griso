"use client";

import { useActionState } from "react";

import { submitPitch } from "@/app/pitch/actions";
import { Button } from "@/components/Button";
import { PITCH_LIMITS, VIDEO_TYPES } from "@/lib/pitch";

const inputStyles =
  "w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400 aria-invalid:outline-red-500 dark:aria-invalid:outline-red-400";

function Field({ name, label, hint, error, children }) {
  return (
    <div>
      <label
        htmlFor={`pitch-${name}`}
        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {label}
        {hint && (
          <span className="font-normal text-zinc-500 dark:text-zinc-400">
            {" "}
            ({hint})
          </span>
        )}
      </label>
      <div className="mt-2 p-px">{children}</div>
      {error && (
        <p
          id={`pitch-${name}-error`}
          className="mt-2 text-sm text-red-600 dark:text-red-400"
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
      <div
        role="status"
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      >
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Thanks, I got your pitch!
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          I appreciate you taking the time to share it. Ride safe.
        </p>
      </div>
    );
  }

  const selectedType = state.values?.type ?? VIDEO_TYPES[0];

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
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
      </div>

      <Field
        name="email"
        label="Email"
        hint="only if you'd like a reply"
        error={state.errors?.email}
      >
        <input
          type="email"
          autoComplete="email"
          {...fieldProps("email", state)}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-[2fr_1fr]">
        <Field name="title" label="Video idea" error={state.errors?.title}>
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
              className={`${inputStyles} pr-9`}
            >
              {VIDEO_TYPES.map((type) => (
                <option
                  key={type}
                  value={type}
                  className="dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {type}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 8 6"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 h-auto w-2 -translate-y-1/2 fill-none stroke-zinc-500 dark:stroke-zinc-400"
            >
              <path
                d="M1.75 1.75 4 4.25l2.25-2.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Field>
      </div>

      <Field
        name="description"
        label="Describe your idea"
        error={state.errors?.description}
      >
        <textarea rows={6} required {...fieldProps("description", state)} />
      </Field>

      <Field
        name="why"
        label="Why would other riders want to watch?"
        hint="optional"
        error={state.errors?.why}
      >
        <textarea rows={3} {...fieldProps("why", state)} />
      </Field>

      <Field
        name="location"
        label="Location or bike involved"
        hint="optional"
        error={state.errors?.location}
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

      <label className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
        <input
          type="checkbox"
          name="credit"
          defaultChecked={state.values?.credit ?? false}
          className="mt-0.5 h-4 w-4 flex-none accent-teal-500"
        />
        OK to mention my name if this becomes a video
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}

      {state.status === "invalid" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          Please fix the highlighted fields and try again.
        </p>
      )}

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending…" : "Send my pitch"}
        </Button>
        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
          By submitting, you&rsquo;re OK with me using your idea in a video,
          without payment. Your email is only used to reply to you.
        </p>
      </div>
    </form>
  );
}
