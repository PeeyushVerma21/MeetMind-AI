import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Dashboard() {
  const meetings = await prisma.meeting.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl mb-6">Your Meetings</h1>

      {meetings.length === 0 && (
        <p>No meetings yet. Upload one from homepage.</p>
      )}

      {meetings.map((meeting) => (
        <Link href={`/meeting/${meeting.id}`} key={meeting.id}>
            <div className="border p-4 mb-4 rounded hover:bg-gray-100 cursor-pointer">
            <h2 className="font-bold">{meeting.title}</h2>
            <p className="text-sm text-gray-600">
                {new Date(meeting.createdAt).toLocaleString()}
            </p>
            <p className="mt-2">{meeting.summary?.slice(0, 150)}...</p>
            </div>
        </Link>
))}

    </div>
  )
}
