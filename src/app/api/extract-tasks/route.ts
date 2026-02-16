import { ai } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json()

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
Extract action items from this meeting.

Return ONLY JSON like:
[
 { "title":"task", "owner":"person", "deadline":"date or null" }
]

Meeting:
${transcript}
`,
    })

    return Response.json({ tasks: result.text })
  } catch {
    // fallback if quota hit
    return Response.json({
      tasks: JSON.stringify([
        {
          title: "Follow up on meeting discussion",
          owner: "Team",
          deadline: "TBD",
        },
      ]),
    })
  }
}
