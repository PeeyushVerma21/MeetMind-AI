import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Dashboard() {
  const meetings = await prisma.meeting.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Your Meetings</h1>
          <Link 
            href="/"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all border border-white/5"
          >
            ← Back to Home
          </Link>
        </div>

        {meetings.length === 0 ? (
          <div className="glass-card text-center py-24 rounded-3xl">
            <div className="text-6xl mb-6 opacity-80">📭</div>
            <p className="text-gray-300 text-xl font-light mb-8">
              No meetings yet. Upload your first meeting to get started.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all shadow-lg shadow-indigo-500/30"
            >
              Upload Transcript
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <Link href={`/meeting/${meeting.id}`} key={meeting.id} className="block h-full">
                <div className="glass-card p-6 rounded-2xl h-full flex flex-col hover:scale-[1.02] transition-transform duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
                      {meeting.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                    {meeting.summary || "No summary available..."}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500 font-medium">
                      {new Date(meeting.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
