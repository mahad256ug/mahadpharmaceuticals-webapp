import { HeartPulse, LucideIcon, Pill, Wallet } from "lucide-react";

export const navLink: { label: string; href: string }[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Drugs",
    href: "/drugs",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

export const services: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Pill,
    title: "Pharmaceuticals",
    description:
      "Providing a reliable selection of pharmaceuticals, from essential prescription medicines to over-the-counter drugs, sourced from certified suppliers.",
  },

  {
    icon: HeartPulse,
    title: "Health",
    description:
      "Promoting wellness with a range of healthcare drugs and services, including supplements, personal care, and patient support.",
  },

  {
    icon: Wallet,
    title: "Cash on Deliver",
    description:
      "Have your medicines delivered safely and conveniently right to your doorstep with our reliable Cash on Delivery service, paying only when they arrive.",
  },
];

export const PAGE_SIZE = 20;
export const PHONE_NO: string = "+971522820802";
export const NODE_ENV: string | "development" | "production" | undefined =
  process.env.NODE_ENV;

export const BASE_URL = "https://mahadpharmaceuticals.com";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL! ?? "http://127.0.0.1:8000/api/";
