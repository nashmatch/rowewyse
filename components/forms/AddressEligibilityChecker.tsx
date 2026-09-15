"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Search, ShieldCheck } from "lucide-react";

interface ProgramResult {
  name: string;
  type: string;
  summary: string;
}

export function AddressEligibilityChecker() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProgramResult[] | null>(null);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const res = await fetch("/api/dpa-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      if (!res.ok) throw new Error("Unable to check eligibility right now.");
      const data = (await res.json()) as { programs: ProgramResult[] };
      setResults(data.programs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-slate-blue/25 bg-white/50 p-8">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="dpa-address" className="sr-only">
            Property address
          </label>
          <input
            id="dpa-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter a Shelby County address"
            className="w-full border border-slate-blue/30 bg-cream px-4 py-3.5 text-sm text-navy placeholder:text-slate-blue/60 focus:border-navy focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-navy px-7 py-3.5 font-subhead text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-navy/90 disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
          Check Eligibility
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-clay">{error}</p>}

      {results && (
        <div className="mt-8 space-y-4">
          <p className="eyebrow text-ink-muted">Potential Program Matches</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((program) => (
              <div key={program.name} className="flex gap-3 border border-slate-blue/20 bg-cream p-5">
                <ShieldCheck className="mt-0.5 shrink-0 text-taupe-gold" size={20} strokeWidth={1.5} />
                <div>
                  <p className="font-display text-base text-navy">{program.name}</p>
                  <p className="eyebrow mt-1 text-ink-muted">{program.type}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{program.summary}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs italic text-ink-muted">
            These results are illustrative program categories, not a confirmed eligibility
            determination. Connect with our team to review your specific qualification.
          </p>
        </div>
      )}
    </div>
  );
}
