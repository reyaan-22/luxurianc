/**
 * POST /api/flxsh-notify
 * Adds email to FLXSH drop waitlist via Supabase + notifies via Resend.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body  = await req.json().catch(() => null);
  const email = body?.email?.toLowerCase().trim() ?? "";

  if (!email) {
    return NextResponse.json({ error: "missing_email" }, { status: 400 });
  }

  // ── Save to Supabase ─────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from("flxsh_waitlist")
      .insert({ email });

    if (error?.code === "23505") {
      return NextResponse.json({ error: "already_registered" }, { status: 409 });
    }
  }

  // ── Notify via Resend ────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:    "Luxurianc <onboarding@resend.dev>",
        to:      ["luxurianc.co@gmail.com"],
        subject: `FLXSH — New waitlist signup`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 32px; background: #080906; color: #f0efe9;">
            <p style="font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: #c9a84c; margin: 0 0 32px;">FLXSH · Waitlist</p>
            <h2 style="font-weight: 300; font-size: 24px; margin: 0 0 20px;">New signup</h2>
            <p style="font-size: 14px; color: #c9a84c;">${email}</p>
            <p style="font-size: 11px; color: #42453d; margin-top: 32px;">luxurianc.co · ${new Date().toUTCString()}</p>
          </div>
        `,
      }),
    }).catch(console.error);
  }

  return NextResponse.json({ success: true });
}
