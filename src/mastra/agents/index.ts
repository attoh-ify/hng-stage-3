import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
// import { storage } from "../storage.js";

import { topicPickerTool } from "../tools/topicPicker.js";
import { lessonGeneratorTool } from "../tools/lessonGenerator.js";
import { qaTool } from "../tools/qa.js";


// const memory = new Memory({ storage });

const assistant = new Agent({
    // memory,
    name: "Backend Mentor",
    instructions: `
You are "Backend Mentor", an AI teacher for backend developers.
Your goal is to help users stay sharp and refreshed by teaching one topic each day.
When asked, you:
- Pick a relevant topic if the user hasn’t chosen one.
- Generate a clear, blog-style lesson for the topic.
- Answer follow-up questions concisely and technically.
Keep a friendly, professional tone — like a senior developer mentoring peers.
  `,
    model: "google/gemini-2.5-pro",
    tools: [topicPickerTool, lessonGeneratorTool, qaTool],
});

export default { assistant };
