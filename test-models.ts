import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  try {
    // There isn't a direct listModels in the client SDK like this usually, 
    // it's more of a REST API thing, but let's see if we can find it or just try a few names.
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            await model.generateContent("test");
            console.log(`Model ${m} is available`);
        } catch (e: any) {
            console.log(`Model ${m} failed: ${e.message}`);
        }
    }
  } catch (error) {
    console.error(error);
  }
}

listModels();
