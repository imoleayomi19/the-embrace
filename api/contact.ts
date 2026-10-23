import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export type ContactSubmission = {
  name: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  state: string;
  property_address: string;
  message: string;
  honeypot: string;
};

export type ProcessContactResult = {
  status: number;
  body: { success: true } | { error: string };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string" || value.length > maxLength) return null;
  return value.trim();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export function getSubmission(body: Record<string, unknown>): ContactSubmission | null {
  const name = readString(body.name, 120);
  const phone = readString(body.phone, 50);
  const email = readString(body.email, 254);
  const company = readString(body.company ?? "", 200);
  const service = readString(body.service, 120);
  const state = readString(body.state ?? "", 100);
  const property_address = readString(body.property_address ?? "", 300);
  const message = readString(body.message, 5000);
  const honeypot = readString(body.honeypot ?? "", 200);

  if (
    name === null ||
    phone === null ||
    email === null ||
    company === null ||
    service === null ||
    state === null ||
    property_address === null ||
    message === null ||
    honeypot === null ||
    !name ||
    !phone ||
    !service ||
    !message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return null;
  }

  return { name, phone, email, company, service, state, property_address, message, honeypot };
}

export async function processContactSubmission(
  body: unknown,
  configOverrides?: {
    apiKey?: string;
  }
): Promise<ProcessContactResult> {
  if (!isRecord(body)) {
    return { status: 400, body: { error: "Invalid request body." } };
  }

  const submission = getSubmission(body);
  if (!submission) {
    return { status: 400, body: { error: "Please check all required form fields and try again." } };
  }

  if (submission.honeypot) {
    return { status: 200, body: { success: true } };
  }

  const apiKey = configOverrides?.apiKey ?? process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  if (!apiKey || !recipient) {
    console.error("Contact email service is missing RESEND_API_KEY or CONTACT_RECIPIENT_EMAIL.");
    return { status: 500, body: { error: "Email service is not configured." } };
  }

  const resend = new Resend(apiKey);
  const details: Array<[string, string]> = [
    ["Name", submission.name],
    ["Phone", submission.phone],
    ["Email", submission.email],
    ["Company", submission.company || "Not provided"],
    ["Service", submission.service],
    ["Location", submission.state || "Not provided"],
    ["Property address", submission.property_address || "Not provided"],
  ];

  const formattedMessage = escapeHtml(submission.message.trim())
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br />");

  const htmlDetails = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding: 8px 12px; font-weight: 600; color: #475569; width: 140px; vertical-align: top; border-bottom: 1px solid #f1f5f9; font-size: 14px;">${escapeHtml(
          label
        )}</td><td style="padding: 8px 12px; color: #0f172a; vertical-align: top; border-bottom: 1px solid #f1f5f9; font-size: 14px;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  const textDetails = details.map(([label, value]) => `${label}: ${value}`).join("\n");

  try {
    console.log("FROM:", process.env.RESEND_FROM);
    const sendResult = await resend.emails.send({
      from: process.env.RESEND_FROM || "Embrace Technologies <info@embracetechng.com>",
      to: recipient,
      replyTo: submission.email,
      subject: `New Contact Request from ${submission.name.replace(/[\r\n]/g, " ")}`,
      text: `${textDetails}\n\nMessage:\n${submission.message.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.5; color: #1e293b; background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <div style="border-bottom: 3px solid #f97316; padding-bottom: 12px; margin-bottom: 20px;">
            <p style="font-size: 11px; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 4px 0;">Embrace Technologies</p>
            <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">New Website Enquiry</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
            <tbody>
              ${htmlDetails}
            </tbody>
          </table>

          <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 20px 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #f97316; border-radius: 8px; padding: 14px 16px; font-size: 15px; line-height: 1.6; color: #0f172a; text-align: left; word-break: break-word; margin: 0;">${formattedMessage}</div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="mailto:${escapeHtml(submission.email)}" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 10px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none; margin-right: 8px; margin-bottom: 8px;">Reply via Email</a>
          </div>

          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px; text-align: center;">Sent from Embrace Technologies website contact form</p>
        </div>
      `,
    });

    if (sendResult.error) {
      console.error("Resend failed to deliver a contact enquiry:", sendResult.error);
      return {
        status: 502,
        body: { error: sendResult.error.message || "Email delivery failed. Please try again." },
      };
    }

    return { status: 200, body: { success: true } };
  } catch (sendError: unknown) {
    console.error("Resend request failed while sending a contact enquiry:", sendError);
    const message =
      sendError instanceof Error ? sendError.message : "Email delivery failed. Please try again.";
    return { status: 502, body: { error: message } };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const result = await processContactSubmission(req.body);
  return res.status(result.status).json(result.body);
}
