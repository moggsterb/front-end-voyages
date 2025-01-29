"use server";

import { VoyageFormData } from "~/components/voyages/voyage-form";

const apiUrl = process.env.API_URL;

export const deleteVoyageOnServer = async (voyageId: string) => {
  console.log("Server-side: Deleting voyage with ID:", voyageId);

  const response = await fetch(`${apiUrl}/api/voyage/delete?id=${voyageId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete the voyage");
  }

  return { success: true, voyageId };
};

export const createVoyageOnServer = async (data: VoyageFormData) => {
  console.log("Server-side: Creating voyage with data:", data);

  const response = await fetch(`${apiUrl}/api/voyage/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create the voyage");
  }

  const createdVoyage = await response.json();
  return createdVoyage;
};

/**
 * Absolute path ${apiUrl}/api/${path}
 * @param path
 * @returns
 */
export const fetchDataOnServer = async (path: string) => {
  const response = await fetch(`${apiUrl}/api/${path}`);

  if (!response.ok) {
    throw new Error("Failed to fetch voyages");
  }

  return response.json();
};
