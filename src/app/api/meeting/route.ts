import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { extractTasksFromTranscript } from "../extract-tasks/route"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { title, transcript, summary } = await req.json()

        // 🔥 Find logged in user in DB using email
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        })

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 })
        }

        // 🔥 Extract tasks first
        const tasksRaw = await extractTasksFromTranscript(transcript)

        let parsedTasks = []
        try {
            // Remove markdown code blocks if they exist
            const cleanTasks = (tasksRaw || "").replace(/```json|```/g, "").trim()
            parsedTasks = JSON.parse(cleanTasks)
        } catch (e) {
            console.error("JSON Parse Error for tasks:", e)
            parsedTasks = []
        }

        const meeting = await prisma.meeting.create({
            data: {
                title,
                transcript,
                summary,
                userId: user.id,
                tasks: {
                    create: parsedTasks,
                },
            },
            include: { tasks: true },
        })

        console.log("Meeting saved:", meeting.id)

        return Response.json(meeting)
    } catch (error) {
        console.error("SAVE ERROR:", error)
        return Response.json({ error: "Failed to save meeting" }, { status: 500 })
    }
}
