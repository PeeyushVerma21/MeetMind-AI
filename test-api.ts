import { GoogleGenerativeAI } from "@google/generative-ai";

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  // We'll try common model names and see which one doesn't 404
  const models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-001", "gemini-1.5-pro"];
  
  for (const m of models) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hi");
      console.log(`Model ${m} works!`);
      break;
    } catch (e: any) {
      console.log(`Model ${m} failed: ${e.message}`);
    }
  }
}

test();
