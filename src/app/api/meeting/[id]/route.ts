import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  await prisma.task.deleteMany({
    where: { meetingId: id },
  })

  await prisma.meeting.delete({
    where: { id },
  })

  return Response.json({ success: true })
}
