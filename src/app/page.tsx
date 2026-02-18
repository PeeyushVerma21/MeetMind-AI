"use client"

import { signIn, useSession } from "next-auth/react"
import UploadText from "@/components/UploadText"
import Link from "next/link"
import { useRef } from "react"

export default function Home() {
  const { data: session } = useSession()
  const uploadSectionRef = useRef<HTMLDivElement>(null)

  const scrollToUpload = () => {
    if (session) {
      uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" })
    } else {
      signIn("google")
    }
  }

  const demoInput = `Speaker 1: Hi everyone, let's discuss the Q4 marketing budget.
Speaker 2: We need to increase spending on social ads by 20%.
Speaker 1: Agreed. John, can you draft the proposal by Friday?
John: Sure, I'll have it ready.
Speaker 2: We also need to review the influencer partnerships.`

  const demoOutput = `✨ Meeting Summary
The team discussed the Q4 marketing budget.

Action Items:
• Increase social ads spending by 20%
• John: Draft budget proposal by Friday
• Next step: Review influencer partnerships`

  return (
    <div className="min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[100px]" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white animate-in fade-in slide-in-from-top-4 duration-700">
              AI Meeting <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-pink-400">Notes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in duration-1000">
              From raw transcripts to <span className="text-white font-medium italic">beautiful summaries</span> in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <button
              onClick={scrollToUpload}
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-xl shadow-indigo-600/25 active:scale-95 text-lg"
            >
              {session ? "Start Uploading" : "Get Started for Free"}
            </button>
            <Link 
              href="/dashboard"
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10 text-lg"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">How it works</h2>
            <p className="text-gray-400">Our AI transforms messy transcripts into actionable insights.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Input Side */}
            <div className="space-y-4 group">
              <div className="flex items-center gap-2 text-indigo-400 font-bold px-2 uppercase tracking-widest text-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Input Transcript
              </div>
              <div className="glass-card p-6 rounded-2xl border-white/10 group-hover:border-indigo-400/30 transition-colors">
                <pre className="text-sm font-mono text-gray-400 whitespace-pre-wrap leading-relaxed">
                  {demoInput}
                </pre>
              </div>
            </div>

            {/* Connecting Arrow (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-400/30 items-center justify-center text-indigo-400 font-bold z-10 backdrop-blur-sm">
              →
            </div>

            {/* Output Side */}
            <div className="space-y-4 group">
              <div className="flex items-center gap-2 text-emerald-400 font-bold px-2 uppercase tracking-widest text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                AI Output
              </div>
              <div className="glass-card p-6 rounded-2xl border-emerald-400/20 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors">
                <pre className="text-sm font-sans text-white whitespace-pre-wrap leading-relaxed font-medium">
                  {demoOutput}
                </pre>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button
              onClick={scrollToUpload}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-gray-100 text-black font-black transition-all shadow-xl active:scale-95 flex items-center gap-3 group"
            >
              <span>TRY NOW</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-2xl">⚡</div>
            <h3 className="text-xl font-bold text-white">Instant Summaries</h3>
            <p className="text-gray-400 leading-relaxed">Stop wasting hours re-listening to meetings. Get the key points in seconds.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-2xl">📋</div>
            <h3 className="text-xl font-bold text-white">Action Items</h3>
            <p className="text-gray-400 leading-relaxed">Automatically extract tasks, deadlines, and owners from your conversations.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-2xl">🔒</div>
            <h3 className="text-xl font-bold text-white">Secure Storage</h3>
            <p className="text-gray-400 leading-relaxed">Your data is yours. Securely store and access your meeting history anytime.</p>
          </div>
        </div>
      </section>

      {/* Upload Section (Anchor) */}
      <section ref={uploadSectionRef} className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {session ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-white">Ready to start?</h2>
                <p className="text-gray-400">Upload your transcript below and let the AI do the magic.</p>
              </div>
              <div className="glass-card p-10 rounded-3xl border-white/10 shadow-2xl">
                <UploadText />
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 rounded-3xl text-center space-y-8 border-indigo-500/20 bg-indigo-500/5">
              <h2 className="text-3xl font-bold text-white">Join MeetMind AI today</h2>
              <p className="text-gray-400 max-w-md mx-auto">Create an account to save your meetings and access them across all your devices.</p>
              <button
                onClick={() => signIn("google")}
                className="px-10 py-4 rounded-2xl bg-white text-black font-black hover:bg-gray-100 transition-all shadow-xl active:scale-95"
              >
                Sign up with Google
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-gray-500 text-sm">© 2026 MeetMind AI. Powered by Gemini Pro.</p>
      </footer>
    </div>
  )
}
