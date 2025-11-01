import { Tool } from "@mastra/core/tools";
import z from "zod";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();


const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;
const GEMINI_MODEL = "gemini-2.5-pro";

if (!GEMINI_API_KEY) {
    console.error("❌ Missing GOOGLE_GENERATIVE_AI_API_KEY in environment variables!");
};

export const lessonGeneratorTool = new Tool({
    id: "lessonGeneratorTool",
    description: "Generates a detailed, blog-style backend lesson for a given topic.",
    inputSchema: z.object({
        topic: z.string(),
    }),
    outputSchema: z.object({
        title: z.string(),
        content: z.string(),
        summary: z.string(),
    }),
    async execute({ context }) {
        const { topic } = context;

        const prompt = `
You are a skilled backend mentor creating a short technical blog for developers.

Your task:
Write an engaging and practical lesson on the topic: **${topic}**.

Requirements:
- Length: equivalent of a 10–20 minute read.
- Tone: conversational but technical (as if explaining to a fellow backend dev).
- Structure:
  1. **Introduction** — Explain why this topic matters in backend development.
  2. **Core Concepts** — Teach the main principles and ideas.
  3. **Example(s)** — Provide 1–2 illustrative examples (include code snippets).
  4. **Mini Exercise** — Give a short practical task the reader can try.
  5. **Key Takeaways** — Summarize the main lessons.

Constraints:
- Keep examples simple and framework-agnostic (Node.js or pseudo-code is fine).
- Avoid overly long explanations — be concise but insightful.
- The goal is to *teach and inspire confidence* in backend concepts.
`;

        console.log("🚀 Calling Gemini API...");

        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            if (!text || text.trim().length === 0) {
                console.warn("⚠️ Gemini returned an empty response!");
            }

            return {
                title: `Today's Topic: ${topic}`,
                content: text,
                summary: `A focused backend development lesson on ${topic}`,
            };
        } catch (error: any) {
            console.error("❌ Gemini API Call FAILED:", error);
            return {
                title: `Error Generating Lesson for ${topic}`,
                content: `Failed to connect to or get a response from the Gemini API. Error: ${error.message || String(error)}`,
                summary: `Generation failed.`,
            };
        };
    }
});
