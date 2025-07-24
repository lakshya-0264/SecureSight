import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const resolved = searchParams.get('resolved') === 'true'

  try {
    const incidents = await prisma.incident.findMany({
      where: { resolved },
      orderBy: { tsStart: 'desc' },
      include: {
        camera: true,
      },
    })

    return new Response(JSON.stringify(incidents), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch incidents' }), {
      status: 500,
    })
  }
}
