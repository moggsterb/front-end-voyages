import { NextResponse } from "next/server";
import { prisma } from "~/server/db";

/**
 * @swagger
 * /api/unitType/getAll:
 *   get:
 *     tags:
 *       - UnitType
 *     summary: Retrieves all unit types
 *     description: Returns a list of all unit types formatted with details including name, default length, and timestamps.
 *     responses:
 *       200:
 *         description: A list of unit types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   defaultLength:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error - if there's an issue fetching the unit types.
 */

export async function GET() {
  try {
    const allUnitTypes = await prisma.unitType.findMany();
    return NextResponse.json(allUnitTypes, { status: 200 });
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
