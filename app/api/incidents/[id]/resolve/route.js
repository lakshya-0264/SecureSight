import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req, { params }) {
  const awaitedParams = await params;
  const id = Number(awaitedParams.id);

  try {
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    })

    return new Response(JSON.stringify(updatedIncident), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update incident' }), {
      status: 500,
    })
  }
}