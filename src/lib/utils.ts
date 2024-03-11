import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseURL() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production")
    return "https://buzz-hive-rosy.vercel.app";
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview")
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return "http://localhost:3000";
}
