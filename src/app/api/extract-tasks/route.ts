import { ai } from "@/lib/gemini"

export async function extractTasksFromTranscript(transcript: string) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
Extract action items from this meeting transcript.
Respond ONLY with a valid JSON array of objects. Do not include markdown formatting or backticks.

Format:
[
  { "title": "specific task", "owner": "person name", "deadline": "date or TBD" }
]

Transcript:
${transcript}
`,
    })

    return result.text
  } catch (error) {
    console.error("Task Extraction Error:", error)
    return JSON.stringify([
      {
        title: "Follow up on meeting discussion",
        owner: "Team",
        deadline: "TBD",
      },
    ])
  }
}

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json()
    const tasks = await extractTasksFromTranscript(transcript)
    return Response.json({ tasks })
  } catch {
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
