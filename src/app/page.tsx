"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import UploadText from "@/components/UploadText"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="glass-card max-w-md w-full rounded-2xl p-8 text-center transition-all duration-300">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 mb-2">MeetMind AI</h1>
          <p className="text-gray-300 mb-8 font-light">AI Meeting Notes. Smarter summaries in seconds.</p>
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-200"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-24 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-sm">
            AI Meeting <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">Notes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Upload a meeting transcript and get <span className="text-white font-medium">summary + action items</span> instantly.
          </p>
        </div>

        <div className="glass-card p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10">
          <UploadText />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Link 
            href="/dashboard"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all flex items-center gap-2 border border-white/10"
          >
            <span>View Dashboard</span>
            <span>→</span>
          </Link>
          <button
            onClick={() => signOut()}
            className="px-6 py-3 rounded-full hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
