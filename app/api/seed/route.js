import { NextResponse } from "next/server"
import { seed } from "../../../prisma/seed" // absolute import was failing on Vercel

export async function POST() {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ message: "Only available in production" }, { status: 403 })
  }

  try {
    await seed()
    return NextResponse.json({ message: "Seeding done!" })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
