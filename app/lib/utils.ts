import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logError(error: unknown) {
  if (error instanceof Error) {
    console.error(`Error deleting task: ${error.message}`);
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
