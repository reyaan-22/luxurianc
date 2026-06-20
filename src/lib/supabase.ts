/**
 * src/lib/supabase.ts
 * Supabase client — used for member signups and the founding counter.
 *
 * Required env vars in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// createClient throws if URL is empty — guard it so the site loads without env vars
export const supabase = supabaseUrl && supabaseAnon
  ? createClient(supabaseUrl, supabaseAnon)
  : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnon);

// ─── Types ────────────────────────────────────────────────────
export interface Member {
  id:         string;
  email:      string;
  full_name:  string;
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────

/** Join as a founding member. Calls /api/join which saves + emails. */
export async function joinCommunity(
  email: string,
  fullName: string
): Promise<{ error: string | null }> {
  try {
    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: fullName }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error ?? "unknown_error" };
    return { error: null };
  } catch {
    return { error: "network_error" };
  }
}

/** Get the total founding member count. */
export async function getMemberCount(): Promise<number> {
  if (!supabase) return 0;

  const { count } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true });

  return count ?? 0;
}

/** Get member counts grouped by country. */
export async function getMemberCountByCountry(): Promise<
  { country: string; count: number }[]
> {
  if (!supabase) return [];

  const { data } = await supabase
    .from("members")
    .select("country")
    .not("country", "is", null);

  if (!data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    if (row.country) counts[row.country] = (counts[row.country] ?? 0) + 1;
  }

  return Object.entries(counts).map(([country, count]) => ({ country, count }));
}
