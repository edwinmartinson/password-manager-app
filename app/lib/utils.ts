import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else console.error(error);
}

export function generateSecurePassword(length: number = 8): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const array = new Uint32Array(length);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(array);
  } else {
    throw new Error("window.crypto.getRandomValues is not available.");
  }
  return Array.from(array, (x) => charset[x % charset.length]).join("");
}

export function generateAsterisk(password: string) {
  return "*".repeat(password.length);
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    throw Error;
  }
}

export function extractDomain(input: string): string {
  let hostname = input.trim();

  // Add protocol if missing for URL parsing
  if (!/^https?:\/\//i.test(hostname)) {
    hostname = "http://" + hostname;
  }

  try {
    const url = new URL(hostname);
    hostname = url.hostname;
  } catch (error) {
    logError(error);
  }

  // Remove leading "www."
  if (hostname.startsWith("www.")) {
    hostname = hostname.slice(4);
  }

  return hostname;
}

// useMutationObserver(popoverRef, { attributes: true }, (mutations) => {
//   mutations.forEach((mutation) => {
//     if (mutation.attributeName === "data-headlessui-state") {
//       const target = mutation.target as HTMLElement;

//       if (target.getAttribute("data-headlessui-state") === "") {
//         props.toggleViewMode();
//       }
//     }
//   });
// });
