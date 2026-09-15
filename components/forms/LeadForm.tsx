"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  contactFormSchema,
  newsletterFormSchema,
  type ContactFormValues,
  type NewsletterFormValues,
} from "@/lib/schemas";
import type { LeadSource } from "@/lib/types";

type Variant = "contact" | "newsletter";
type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full border border-slate-blue/30 bg-cream px-4 py-3 text-sm text-navy placeholder:text-slate-blue/60 focus:border-navy focus:outline-none";
const labelClasses = "eyebrow mb-2 block text-navy/80";
const errorClasses = "mt-1 text-xs text-clay";

async function submitLead(sourceType: LeadSource, sourcePage: string, values: Record<string, unknown>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, sourceType, sourcePage }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? "Something went wrong. Please try again.");
  }
}

export function LeadForm({
  variant,
  sourcePage,
}: {
  variant: Variant;
  sourcePage: string;
}) {
  if (variant === "newsletter") {
    return <NewsletterForm sourcePage={sourcePage} />;
  }
  return <ContactLeadForm sourcePage={sourcePage} />;
}

function ContactLeadForm({ sourcePage }: { sourcePage: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    try {
      await submitLead("contact", sourcePage, values);
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 border border-taupe-gold bg-white/60 p-8">
        <CheckCircle2 className="text-navy" size={28} />
        <p className="font-display text-xl text-navy">Thank you for reaching out.</p>
        <p className="text-sm text-ink-muted">
          A member of ROWE | WYSE Partners will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs font-semibold uppercase tracking-widest text-navy underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClasses}>
            First Name*
          </label>
          <input id="firstName" className={inputClasses} {...register("firstName")} />
          {errors.firstName && <p className={errorClasses}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClasses}>
            Last Name*
          </label>
          <input id="lastName" className={inputClasses} {...register("lastName")} />
          {errors.lastName && <p className={errorClasses}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address*
          </label>
          <input id="email" type="email" className={inputClasses} {...register("email")} />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number*
          </label>
          <input id="phone" type="tel" className={inputClasses} {...register("phone")} />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={labelClasses}>Service Area*</legend>
        <div className="flex gap-6">
          {(["Nashville", "Memphis"] as const).map((area) => (
            <label key={area} className="flex items-center gap-2 text-sm text-navy">
              <input type="radio" value={area} {...register("serviceArea")} />
              {area}
            </label>
          ))}
        </div>
        {errors.serviceArea && <p className={errorClasses}>{errors.serviceArea.message}</p>}
      </fieldset>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea id="message" rows={5} className={inputClasses} {...register("message")} />
      </div>

      {status === "error" && <p className={errorClasses}>{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 bg-navy px-8 py-3.5 font-subhead text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-navy/90 disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 className="animate-spin" size={16} />}
        Send Inquiry
      </button>
    </form>
  );
}

function NewsletterForm({ sourcePage }: { sourcePage: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({ resolver: zodResolver(newsletterFormSchema) });

  const onSubmit = async (values: NewsletterFormValues) => {
    setStatus("submitting");
    try {
      await submitLead("newsletter", sourcePage, values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@email.com"
          className="w-full border border-cream/30 bg-transparent px-4 py-3.5 text-sm text-cream placeholder:text-cream/60 focus:border-taupe-gold focus:outline-none"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-taupe-gold">{errors.email.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-taupe-gold px-7 py-3.5 font-subhead text-sm font-semibold uppercase tracking-widest text-navy transition-colors hover:bg-taupe-gold/90 disabled:opacity-60"
      >
        {status === "success" ? "Subscribed" : status === "submitting" ? "Sending..." : "Subscribe"}
      </button>
    </form>
  );
}
