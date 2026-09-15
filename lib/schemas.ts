import { z } from "zod";

export const leadPayloadSchema = z.object({
  sourcePage: z.string().min(1),
  sourceType: z.enum(["contact", "newsletter", "dpa"]),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number").optional(),
  serviceArea: z.enum(["Nashville", "Memphis"]).optional(),
  message: z.string().optional(),
});

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  serviceArea: z.enum(["Nashville", "Memphis"], {
    message: "Select a service area",
  }),
  message: z.string().optional(),
});

export const newsletterFormSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
