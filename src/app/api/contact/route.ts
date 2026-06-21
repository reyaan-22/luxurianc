/**
 * POST /api/contact
 * Sends contact form enquiry to luxurianc.co@gmail.com via Resend.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const name:    string = body?.name?.trim()    ?? "";
  const email:   string = body?.email?.trim()   ?? "";
  const phone:   string = body?.phone?.trim()   ?? "—";
  const service: string = body?.service?.trim() ?? "—";
  const message: string = body?.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.warn("RESEND_API_KEY not set — contact form email skipped.");
    return NextResponse.json({ success: true });
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:    "Luxurianc <onboarding@resend.dev>",
      to:      ["luxurianc.co@gmail.com"],
      reply_to: email,
      subject: `✦ New enquiry from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 32px; background: #080906; color: #f0efe9;">
          <p style="font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: #c9a84c; margin: 0 0 32px;">Luxurianc · Private Enquiry</p>
          <h2 style="font-weight: 300; font-size: 26px; margin: 0 0 28px; letter-spacing: -0.02em;">New message from ${name}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #76796f; font-size: 12px; width: 90px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #76796f; font-size: 12px; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 14px;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #76796f; font-size: 12px; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 14px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #76796f; font-size: 12px; vertical-align: top;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 14px;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #76796f; font-size: 12px; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="font-size: 11px; color: #42453d; margin: 0;">luxurianc.co · ${new Date().toUTCString()}</p>
        </div>
      `,
    }),
  }).catch((err) => console.error("Resend contact error:", err));

  return NextResponse.json({ success: true });
}
