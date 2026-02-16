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

    if (!meeting) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center glass-card p-12 rounded-2xl">
                <h1 className="text-2xl font-bold text-white mb-2">Meeting not found</h1>
                <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 transition-colors inline-block mt-4">
                    ← Back to dashboard
                </Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                    <div>
                        <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white mb-3 inline-block transition-colors">
                            ← Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400 tracking-tight mb-2">
                            {meeting.title}
                        </h1>
                        <p className="text-gray-500 font-mono text-sm">
                            {new Date(meeting.createdAt).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <DeleteMeetingButton id={id} />
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column (Summary & Transcript) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Section */}
                        <section className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform select-none">📝</div>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                Summary
                            </h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                                {meeting.summary}
                            </div>
                        </section>

                        {/* Transcript Section */}
                        <section className="glass-card p-8 rounded-3xl border border-white/5">
                            <h2 className="text-xl font-bold text-gray-400 mb-4 flex items-center gap-2">
                                <span>📜</span> Transcript
                            </h2>
                            <div className="bg-black/20 p-6 rounded-xl border border-white/5 max-h-96 overflow-y-auto custom-scrollbar">
                                <pre className="text-sm text-gray-500 whitespace-pre-wrap font-mono leading-relaxed">
                                    {meeting.transcript}
                                </pre>
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Action Items) */}
                    <div className="lg:col-span-1">
                        {meeting.tasks.length > 0 ? (
                            <section className="glass-card p-6 rounded-3xl sticky top-8">
                                <h2 className="text-xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
                                    <span>🚀</span> Action Items
                                </h2>
                                <div className="space-y-4">
                                    {meeting.tasks.map((task) => (
                                        <div key={task.id} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
                                            <h3 className="font-bold text-white mb-2 leading-snug group-hover:text-indigo-200 transition-colors">
                                                {task.title}
                                            </h3>
                                            <div className="space-y-2 text-xs text-gray-400 mt-3 pt-3 border-t border-white/5">
                                                <div className="flex justify-between">
                                                    <span>Owner</span>
                                                    <span className="text-gray-200 font-medium">{task.owner || "Unassigned"}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Due</span>
                                                    <span className="text-gray-200 font-medium">{task.deadline || "No date"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <div className="glass-card p-6 rounded-3xl text-center text-gray-500 py-12">
                                <div className="text-4xl mb-2 opacity-50">✨</div>
                                <p>No action items detected</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
