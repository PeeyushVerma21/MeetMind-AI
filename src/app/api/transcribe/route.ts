import { ai } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Clean and format this meeting transcript:\n${text}`,
    })

    return Response.json({
      transcript: result.text,
    })
  } catch (error: any) {
    console.error("Transcribe API Error:", error)
    
    // If it's a quota error, we can return the raw text as fallback
    if (error?.status === 429) {
      const { text } = await req.clone().json()
      return Response.json({
        transcript: text, // Fallback to raw text if AI is busy
        isFallback: true
      })
    }

    return Response.json({ error: "Failed to process transcript" }, { status: 500 })
  }
}
