"use server";

import { Resend } from "resend";
import { PHONE_NO } from "@/lib/constants";
import ContactMessage from "@/emails/ContactMessage";

const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormValues {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  token?: string;
}

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
}

export async function contactAction(values: ContactFormValues) {
  try {
    const { name, email, subject, message, token } = values;

    // Validate fields
    if (!name || !email || !subject || !message || !token) {
      return {
        success: false,
        error: "All fields and Turnstile token are required.",
      };
    }

    // Verify Turnstile token
    const ver = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: SECRET_KEY,
          response: token,
        }),
      }
    );

    const verification = (await ver.json()) as TurnstileResponse;

    if (!verification?.success) {
      return {
        success: false,
        error: "Invalid CAPTCHA. Please try again.",
      };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "mail@mahadpharmaceuticals.com",
      to: ["maha.pharmaceutical@gmail.com"],
      subject: `Contact: ${subject}`,
      react: ContactMessage({
        name: name,
        subject: subject,
        sender_email: email,
        message: message,
        whatsappNumber: "",
        siteName: "mahad pharmaceuticals",
      }),
      text: [
        `New Contact Message - ${subject}`,
        `From: ${name} <${email}>`,
        "",
        message,
        "",
        `WhatsApp: ${PHONE_NO ? `https://wa.me/${PHONE_NO}` : "Not set"}`,
      ].join("\n"),
    });

    if (error) {
      return { success: false, error: String(error) };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Action error:", error);
    return {
      success: false,
      error: "Internal server error. Please try again later.",
    };
  }
}
