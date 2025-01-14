import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import type { Prisma } from "@prisma/client";

/**
 * @swagger
 * /api/voyage/getAll:
 *   get:
 *     tags:
 *       - Voyage
 *     summary: Retrieves all voyages
 *     description: Returns a list of all voyages, including details about the vessel and unit types associated with each voyage.
 *     responses:
 *       200:
 *         description: A list of voyages with their associated vessel and unit types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   portOfLoading:
 *                     type: string
 *                   portOfDischarge:
 *                     type: string
 *                   vesselId:
 *                     type: string
 *                   scheduledDeparture:
 *                     type: string
 *                     format: date-time
 *                   scheduledArrival:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   vessel:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                   unitTypes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         defaultLength:
 *                           type: number
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 */

export type ReturnType = [
  Prisma.VoyageGetPayload<{
    include: {
      vessel: true;
      unitTypes: true;
    };
  }>,
];

export async function GET() {
  try {
    const voyages = await prisma.voyage.findMany({
      include: {
        vessel: true,
        unitTypes: true,
      },
    });

    return NextResponse.json(voyages, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error", status: 500 });
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
