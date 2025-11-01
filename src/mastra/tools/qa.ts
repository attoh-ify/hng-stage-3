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

export const qaTool = new Tool({
    id: "qaTool",
    description: "Answers user questions about today's backend topic.",
    inputSchema: z.object({
        topic: z.string(),
        question: z.string(),
        previousLesson: z.string(),
    }),
    outputSchema: z.object({
        topic: z.string(),
        question: z.string(),
        answer: z.string(),
    }),
    async execute({ context }) {
        const { topic, question, previousLesson } = context;

        const prompt = `
You are an expert backend developer and teacher.

The user is currently learning about **${topic}**.

Here’s the previously generated lesson (if available):
---
${previousLesson || "No lesson provided."}
---

Now, answer the following question clearly and concisely:
"${question}"

Guidelines:
- Be direct and technically accurate.
- Give small, runnable examples if possible.
- Keep your explanation under 100 words.
- Do not restate the entire lesson — only clarify what's asked.
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

            console.log(response);

            return {
                topic,
                question,
                answer: text
            };
        } catch (error: any) {
            console.error("❌ Gemini API Call FAILED:", error);
            return {
                topic,
                question,
                answer: `Generation failed.`,
            };
        };
    }
});
