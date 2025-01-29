import { type ClassValue, clsx } from "clsx";
import { set } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Relative path /api/${path}
 * @param path
 * @returns
 */
export async function fetchData(path: string) {
  const response = await fetch(`/api/${path}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

/**
 * Updates an existing Date with a new date or time.
 * @param existingDate - The original Date
 * @param newDate - The new date to update (optional)
 * @param newTime - The new time to update in "HH:mm" format (optional)
 * @returns A new Date object with the combined values
 */
export const updateDate = (
  existingDate: Date,
  newDate?: Date,
  newTime?: string,
): Date => {
  let updatedDate = existingDate;

  if (newDate) {
    updatedDate = set(updatedDate, {
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      date: newDate.getDate(),
    });
  }

  if (newTime) {
    const [hours, minutes] = newTime.split(":").map(Number);
    updatedDate = set(updatedDate, {
      hours: hours || 0,
      minutes: minutes || 0,
      seconds: 0,
    });
  }

  return updatedDate;
};
