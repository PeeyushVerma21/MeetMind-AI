"use client"
import { useState } from "react"

export default function UploadText() {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")
  const [error, setError] = useState("")

  async function handleFile(e: any) {
    setLoading(true)
    setError("")
    setSummary("")

    try {
      const file = e.target.files[0]
      if (!file) return
      
      const text = await file.text()

      // 1️⃣ Clean transcript
      const t = await fetch("/api/transcribe", {
        method: "POST",
        body: JSON.stringify({ text }),
      })
      
      if (!t.ok) {
        const errData = await t.json()
        throw new Error(errData.error || "Failed to transcribe meeting")
      }
      const { transcript } = await t.json()

      // 2️⃣ Generate summary
      const s = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({ transcript }),
      })
      
      if (!s.ok) {
        const errData = await s.json()
        throw new Error(errData.error || "Failed to summarize meeting")
      }
      const { summary } = await s.json()

      // 3️⃣ SAVE meeting in DB ⭐
      const m = await fetch("/api/meeting", {
        method: "POST",
        body: JSON.stringify({
          title: file.name.split('.')[0] || "Meeting " + new Date().toLocaleString(),
          transcript,
          summary,
        }),
      })

      if (!m.ok) throw new Error("Failed to save meeting to dashboard")

      setSummary(summary)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/20 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-indigo-400/50 transition-all cursor-pointer group">
        <label className="cursor-pointer w-full text-center py-4">
          <input type="file" className="hidden" onChange={handleFile} disabled={loading} />
          <div className="space-y-4">
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">📄</div>
            <div className="text-gray-200 font-semibold text-lg">
              {loading ? "Processing..." : "Click to upload transcript"}
            </div>
            <div className="text-gray-400 text-sm">Supported formats: PDF, TXT</div>
          </div>
        </label>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-bold">AI Processing Error</p>
            <p className="opacity-90">{error.includes("exhausted") ? "Gemini API rate limit reached. Please wait a minute and try again." : error}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-3 text-indigo-300 font-medium animate-pulse">
          <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          <span>🤖 AI is analyzing your meeting...</span>
        </div>
      )}

      {summary && !loading && (
        <div className="mt-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>✨</span> Meeting Summary
          </h3>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-gray-200 whitespace-pre-wrap leading-relaxed shadow-inner">
            {summary}
          </div>
        </div>
      )}
    </div>
  )
}
