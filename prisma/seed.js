import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
  await prisma.camera.createMany({
    data: [
      { name: 'Shop Floor A', location: '1st Floor - North Wing' },
      { name: 'Vault', location: 'Basement Secure Area' },
      { name: 'Entrance', location: 'Main Lobby' },
    ],
  })

  const allCameras = await prisma.camera.findMany()

  const now = new Date()
  const incidents = []

  const types = ['Unauthorized Access', 'Gun Threat', 'Face Recognized', 'Fire Detected']

  for (let i = 0; i < 20; i++) {
    const camera = allCameras[i % allCameras.length]
    const start = new Date(now.getTime() - Math.random() * 1000 * 60 * 60 * 24)
    const end = new Date(start.getTime() + Math.random() * 1000 * 60 * 10)

    incidents.push({
      cameraId: camera.id,
      type: types[i % types.length],
      tsStart: start,
      tsEnd: end,
      thumbnailUrl: `/thumbnails/thumb${(i % 4) + 1}.png`,
      // resolved: i % 4 === 0,
    })
  }

  await prisma.incident.createMany({ data: incidents })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
