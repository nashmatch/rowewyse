import { NextResponse } from "next/server";

/**
 * Stubbed Shelby County down payment assistance eligibility check.
 * TODO: replace with a real lookup once a Shelby County DPA eligibility
 * API/dataset is available — swap the body of this handler for that call,
 * keyed by the submitted `address`. The response shape (`programs`) is
 * intentionally stable so AddressEligibilityChecker needs no changes.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { address?: string } | null;
  const address = body?.address;

  if (!address || typeof address !== "string" || address.trim().length < 3) {
    return NextResponse.json({ error: "Enter a valid address." }, { status: 400 });
  }

  const programs = [
    {
      name: "City of Memphis HOME Program",
      type: "Forgivable Second Mortgage",
      summary:
        "Up to $10,000 toward down payment and closing costs for qualifying first-time buyers within city limits.",
    },
    {
      name: "THDA Great Choice Home Loan",
      type: "State-Level Assistance",
      summary:
        "Tennessee Housing Development Agency down payment assistance paired with a low fixed-rate first mortgage.",
    },
    {
      name: "Shelby County DPA Grant",
      type: "County Grant Program",
      summary: "Grant funding for buyers purchasing within unincorporated Shelby County, subject to income limits.",
    },
    {
      name: "Employer-Assisted Housing",
      type: "Employer Program",
      summary: "Matched savings or forgivable loan assistance offered through select Memphis-area employers.",
    },
  ];

  return NextResponse.json({ address, programs });
}
