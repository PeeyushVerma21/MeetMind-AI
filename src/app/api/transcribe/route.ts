import { ai } from "@/lib/gemini"

export async function POST(req: Request) {
  const { text } = await req.json()

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Clean and format this meeting transcript:\n${text}`,
  })

  return Response.json({
    transcript: result.text,
  })
}
