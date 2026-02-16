"use client"
import { useState } from "react"

export default function UploadText() {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")

  async function handleFile(e: any) {
    setLoading(true)

    const text = await e.target.files[0].text()

    // 1️⃣ Clean transcript
    const t = await fetch("/api/transcribe", {
      method: "POST",
      body: JSON.stringify({ text }),
    })
    const { transcript } = await t.json()

    // 2️⃣ Generate summary
    const s = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ transcript }),
    })
    const { summary } = await s.json()

    // 3️⃣ SAVE meeting in DB ⭐
    await fetch("/api/meeting", {
      method: "POST",
      body: JSON.stringify({
        title: "Meeting " + new Date().toLocaleString(),
        transcript,
        summary,
      }),
    })

    setSummary(summary)
    setLoading(false)
  }

  return (
    <div className="mt-10">
      <input type="file" onChange={handleFile} />

      {loading && <p>Processing meeting...</p>}

      <pre className="mt-6 whitespace-pre-wrap">{summary}</pre>
    </div>
  )
}
