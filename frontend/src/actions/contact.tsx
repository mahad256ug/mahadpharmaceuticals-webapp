"use server";

import { Resend } from "resend";
import { PHONE_NO } from "@/lib/constants";
import ContactMessage from "@/emails/ContactMessage";
import verifyTurnstileToken from "@/actions/verifyTurnsile";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormValues {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  token?: string;
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
    const verification = await verifyTurnstileToken(token);

    if (!verification.success) {
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
