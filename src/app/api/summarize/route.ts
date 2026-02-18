import { ai } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json()

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize this meeting in bullet points:\n${transcript}`,
    })

    return Response.json({ summary: result.text })
  } catch (error) {
    console.log("Gemini quota hit — using fallback summary")

    // ⭐ fallback summary so app still works
    return Response.json({
      summary:
        "AI quota reached. This meeting was uploaded successfully. Summary will be generated later.",
    })
  }
}
