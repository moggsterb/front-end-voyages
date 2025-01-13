import { NextResponse } from "next/server";
import { prisma } from "~/server/db";

// Assuming the type for a single vessel object.
type Vessel = {
  id: string; // or number, depending on your database schema
  name: string;
};

export type VesselsType = { value: string; label: string }[];

/**
 * @swagger
 * /api/vessel/getAll:
 *   get:
 *     tags:
 *       - Vessel
 *     summary: Retrieves all vessels
 *     description: Returns a list of all vessels formatted for dropdown selection, with each vessel's name as the label and its id as the value.
 *     responses:
 *       200:
 *         description: A list of vessels formatted for dropdown use.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: string
 *                     description: The ID of the vessel.
 *                   label:
 *                     type: string
 *                     description: The name of the vessel.
 *       500:
 *         description: Internal Server Error - if there's an issue fetching the vessels.
 */

export async function GET() {
  try {
    const allVessels: Vessel[] = await prisma.vessel.findMany();
    const vessels = allVessels.map((vessel) => ({
      label: vessel.name,
      value: vessel.id,
    }));

    return NextResponse.json(vessels, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      Allow: "GET, OPTIONS",
    },
  });
}
