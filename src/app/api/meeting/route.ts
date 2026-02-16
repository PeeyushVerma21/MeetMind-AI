import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

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
        const taskRes = await fetch("http://localhost:3000/api/extract-tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transcript }),
        })

        const { tasks } = await taskRes.json()

        let parsedTasks = []
        try {
            parsedTasks = JSON.parse(tasks)
        } catch {
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
