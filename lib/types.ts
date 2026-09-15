export type ServiceArea = "Nashville" | "Memphis";

export type LeadSource = "contact" | "newsletter" | "dpa";

/**
 * Shared shape for every lead-generating form (Contact, Resources newsletter
 * signup, DPA eligibility check). One type, one submit path (/api/lead), one
 * D1 table — so wiring up ReChat later only has to happen in one place.
 */
export interface LeadPayload {
  sourcePage: string;
  sourceType: LeadSource;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  serviceArea?: ServiceArea;
  message?: string;
}

export interface LeadRecord extends LeadPayload {
  id: string;
  createdAt: string;
  syncedToRechat: boolean;
}
