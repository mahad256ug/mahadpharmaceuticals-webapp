import { NextResponse } from "next/server";

import { Resend } from "resend";
import { PHONE_NO } from "@/lib/constants";
import ContactMessage from "@/emails/ContactMessage";
import verifyTurnstileToken from "@/actions/verifyTurnsile";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const get = (key: string) => values[key as keyof typeof values];
    const { name, email, subject, message } = values;
    const token = get("cf-turnstile-response");

    if (!name || !email || !subject || !message || !token) {
      return NextResponse.json(
        { error: "All fields and reCAPTCHA token are required." },
        { status: 400 }
      );
    }

    const verification = await verifyTurnstileToken(token);

    if (!verification.success) {
      console.error("reCAPTCHA failed:", verification);
      return NextResponse.json(
        { error: "Invalid reCAPTCHA. Please try again." },
        { status: 400 }
      );
    }

    // sending email
    const { data, error } = await resend.emails.send({
      from: "mail@mahadpharmaceuticals.com", // TODO
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
        `WhatsApp: ${PHONE_NO ? `https://wa.me/${PHONE_NO}` : "not set"}`,
      ].join("\n"),
    });

    if (error) {
      console.log(error, "this isthe error");
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.log("Contact API Error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
