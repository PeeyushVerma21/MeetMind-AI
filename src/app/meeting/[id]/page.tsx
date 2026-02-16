import { prisma } from "@/lib/prisma"
import DeleteMeetingButton from "@/components/DeleteMeetingButton"
import Link from "next/link"

export default async function MeetingPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    // ⭐ NEW: unwrap params
    const { id } = await params

    const meeting = await prisma.meeting.findUnique({
        where: { id },
        include: { tasks: true },
    })

    if (!meeting) return <div>Meeting not found</div>

    return (
        <div className="p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl mb-6">{meeting.title}</h1>

            <DeleteMeetingButton id={id} />

            <Link href="/dashboard">← Back to dashboard</Link>

            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <div className="bg-gray-100 p-4 rounded mb-8">
                <pre className="whitespace-pre-wrap">{meeting.summary}</pre>
            </div>

            <h2 className="text-xl font-semibold mb-2">Action Items</h2>
            <div className="bg-yellow-50 p-4 rounded mb-8">
                {meeting.tasks.map((task) => (
                    <div key={task.id} className="mb-2">
                        <p><b>Task:</b> {task.title}</p>
                        <p><b>Owner:</b> {task.owner}</p>
                        <p><b>Deadline:</b> {task.deadline}</p>
                        <hr className="my-2" />
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-semibold mb-2">Transcript</h2>
            <div className="bg-gray-50 p-4 rounded">
                <pre className="whitespace-pre-wrap">{meeting.transcript}</pre>
            </div>
        </div>
    )
}
