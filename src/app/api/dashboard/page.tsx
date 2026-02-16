import { prisma } from "@/lib/prisma"

export default async function Dashboard() {
  const meetings = await prisma.meeting.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Your Meetings</h1>

      {meetings.map((m) => (
        <div key={m.id} className="border p-4 mb-4">
          <h2 className="font-bold">{m.title}</h2>
          <p>{m.summary?.slice(0, 150)}...</p>
        </div>
      ))}
    </div>
  )
}
