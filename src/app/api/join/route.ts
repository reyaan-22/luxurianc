/**
 * POST /api/join
 * Handles founding member signup:
 *   1. Saves to Supabase (if configured)
 *   2. Sends email notification to luxurianc.co@gmail.com via Resend
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: string = body?.email?.toLowerCase().trim() ?? "";
  const name:  string = body?.name?.trim() ?? "";

  if (!email || !name) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // ── 1. Save to Supabase ──────────────────────────────────────
  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from("members")
      .insert({ email, full_name: name });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "already_member" }, { status: 409 });
      }
      // Supabase error but still try to send email
      console.error("Supabase insert error:", error.message);
    }
  }

  // ── 2. Send email via Resend ─────────────────────────────────
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
        subject: `✦ New founding member: ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 32px; background: #080906; color: #f0efe9;">
            <p style="font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: #7a9445; margin: 0 0 32px;">Luxurianc · Founding Member</p>
            <h2 style="font-weight: 300; font-size: 28px; margin: 0 0 24px; letter-spacing: -0.02em;">${name} just joined.</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #76796f; font-size: 12px; width: 80px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #76796f; font-size: 12px;">Email</td>
                <td style="padding: 12px 0; font-size: 14px;">${email}</td>
              </tr>
            </table>
            <p style="font-size: 11px; color: #42453d; margin: 0;">luxurianc.co · ${new Date().toUTCString()}</p>
          </div>
        `,
      }),
    }).catch((err) => console.error("Resend error:", err));
  } else {
    console.warn("RESEND_API_KEY not set — skipping email notification.");
  }

  return NextResponse.json({ success: true });
}
