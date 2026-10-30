import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export type ProcessSubscribeResult = {
  status: number;
  body: { success: true } | { error: string };
};

export async function processSubscribe(
  body: unknown,
  configOverrides?: {
    apiKey?: string;
  }
): Promise<ProcessSubscribeResult> {
  if (typeof body !== "object" || body === null || !("email" in body)) {
    return { status: 400, body: { error: "Invalid request payload." } };
  }

  const { email } = body as { email: unknown };

  if (typeof email !== "string" || !email.includes("@")) {
    return { status: 400, body: { error: "A valid email address containing '@' is required." } };
  }

  const subscriberEmail = email.trim();

  // Log subscriber email to console for now
  console.log("New newsletter subscriber:", subscriberEmail);

  const apiKey = configOverrides?.apiKey || process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Newsletter subscription is missing RESEND_API_KEY.");
    return { status: 500, body: { error: "Email service is not configured." } };
  }

  const resend = new Resend(apiKey);
  const fromAddress = "Embrace Technologies <newsletter@embracetechng.com>";

  const welcomeHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #1e293b; background-color: #ffffff; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="border-bottom: 3px solid #f97316; padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
        <p style="font-size: 12px; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px 0;">Embrace Technologies</p>
        <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0;">Welcome to Our Newsletter ☀️</h1>
      </div>

      <p style="font-size: 16px; color: #334155; margin-bottom: 16px;">Hello,</p>
      <p style="font-size: 15px; color: #334155; margin-bottom: 20px;">
        Thank you for subscribing to the <strong>Embrace Technologies</strong> newsletter! We are thrilled to welcome you to our community.
      </p>

      <div style="background-color: #f8fafc; border-left: 4px solid #f97316; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
        <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 10px 0;">What you can look forward to:</h3>
        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
          <li>☀️ <strong>Solar Insights:</strong> Expert advice on solar power systems, renewable energy savings, and efficiency.</li>
          <li>💡 <strong>Installation &amp; Maintenance Tips:</strong> Best practices to keep your inverters and batteries performing optimally.</li>
          <li>⚡ <strong>Product Updates:</strong> First look at cutting-edge solar panels, smart inverters, and battery storage solutions.</li>
          <li>🔒 <strong>Security Solutions:</strong> Integrated CCTV and smart monitoring for homes and commercial facilities.</li>
        </ul>
      </div>

      <p style="font-size: 14px; color: #64748b; margin-bottom: 28px;">
        Whether you are exploring residential solar, commercial power backup, or energy audits, our team is always ready to assist.
      </p>

      <div style="text-align: center; margin-bottom: 28px;">
        <a href="https://www.embracetechng.com" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 700; text-decoration: none;">Visit Our Website</a>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
        <p style="font-size: 12px; font-weight: 600; color: #64748b; margin: 0 0 4px 0;">Embrace Technologies Limited</p>
        <p style="font-size: 12px; color: #94a3b8; margin: 0 0 4px 0;">116 Ikorodu-Lagos Road, Haruna Bustop, Ikorodu, Lagos, Nigeria</p>
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">Phone: +234 706 145 1583 | Email: Info@embracetechng.com</p>
      </div>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #1e293b; background-color: #ffffff; padding: 28px 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="border-bottom: 3px solid #f97316; padding-bottom: 12px; margin-bottom: 20px;">
        <p style="font-size: 11px; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 4px 0;">Embrace Technologies</p>
        <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">New Newsletter Subscriber</h2>
      </div>

      <p style="font-size: 14px; color: #334155; margin-bottom: 16px;">
        A new user has subscribed to the Embrace Technologies newsletter:
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px;">
        <p style="font-size: 13px; color: #64748b; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600;">Subscriber Email</p>
        <p style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0;">
          <a href="mailto:${subscriberEmail}" style="color: #f97316; text-decoration: none;">${subscriberEmail}</a>
        </p>
      </div>

      <p style="font-size: 12px; color: #94a3b8; margin: 0; text-align: center;">Sent automatically from Embrace Technologies website</p>
    </div>
  `;

  try {
    // a) Welcome email to subscriber
    const welcomeResult = await resend.emails.send({
      from: fromAddress,
      to: subscriberEmail,
      subject: "Welcome to Embrace Technologies Newsletter ☀️",
      html: welcomeHtml,
      text: "Welcome to Embrace Technologies Newsletter ☀️\n\nThank you for subscribing! We will keep you updated with solar energy insights, installation tips, and product updates.\n\nEmbrace Technologies Limited\nhttps://www.embracetechng.com",
    });

    if (welcomeResult.error) {
      console.error("Resend welcome email error:", welcomeResult.error);
      return {
        status: 500,
        body: { error: welcomeResult.error.message || "Failed to deliver welcome email." },
      };
    }

    // b) Notification email to Info@embracetechng.com
    const notifyResult = await resend.emails.send({
      from: fromAddress,
      to: "Info@embracetechng.com",
      subject: "New Newsletter Subscriber",
      html: adminHtml,
      text: `New Newsletter Subscriber: ${subscriberEmail}`,
    });

    if (notifyResult.error) {
      console.error("Resend notification email error:", notifyResult.error);
      return {
        status: 500,
        body: { error: notifyResult.error.message || "Failed to deliver notification email." },
      };
    }

    return { status: 200, body: { success: true } };
  } catch (error: unknown) {
    console.error("Resend request failed for newsletter subscription:", error);
    const message = error instanceof Error ? error.message : "Failed to process subscription.";
    return { status: 500, body: { error: message } };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const result = await processSubscribe(req.body);
  return res.status(result.status).json(result.body);
}
