// import { storage } from "../storage.js";

// export type Memory = {
//     topics: Record<string, string>;
//     lastPickedAt?: string | null;
// };

// const DEFAULT_MEMORY: Memory = {
//     topics: {},
//     lastPickedAt: null
// };

// function memoryKeyFor(userId = "default") {
//     return `memory:${userId}`;
// };

// async function getStore() {
//     const kv = (storage as any).kv || storage;
//     if (!kv) throw new Error("No valid key-value store found in storage");
//     return kv;
// };

// export async function loadMemory(userId = "default"): Promise<Memory> {
//     const key = memoryKeyFor(userId);

//     try {
//         let kv = await getStore();

//         const raw =
//             (typeof kv.getItem === "function" && (await kv.getItem(key))) ||
//             (typeof kv.get === "function" && (await kv.get(key))) ||
//             null;

//         if (!raw) {
//             return { ...DEFAULT_MEMORY };
//         };

//         const parsed = typeof raw === "string" ? JSON.parse(raw) : (raw as Memory);

//         return {
//             ...DEFAULT_MEMORY,
//             ...parsed,
//             recentTopics: Array.isArray(parsed.recentTopics) ? parsed.recentTopics : []
//         } as Memory;
//     } catch (err) {
//         console.error("LoadMemory error:", err);
//         return { ...DEFAULT_MEMORY };
//     };
// };

// export async function saveMemory(userId = "default", update: Partial<Memory>): Promise<Memory> {
//     const key = memoryKeyFor(userId);

//     try {
//         const kv = await getStore();
//         const current = await loadMemory(userId);

//         const merged: Memory = {
//             ...current,
//             ...update,
//             topics: {
//                 ...current.topics,
//                 ...(update.topics || {})
//             }
//         };

//         const payload = JSON.stringify(merged);

//         if (typeof kv.setItem === "function") {
//             await kv.setItem(key, payload);
//         } else if (typeof kv.set === "function") {
//             await kv.set(key, payload);
//         } else {
//             throw new Error("Unsupported storage setter for LibSQLStore");
//         };

//         return merged;
//     } catch (err) {
//         console.error("saveMemory error:", err);
//         return { ...DEFAULT_MEMORY, ...update };
//     };
// };

// export async function markTopicUsed(userId = "default", topic: string) {
//     const now = new Date().toISOString();
//     const mem = await loadMemory(userId);

//     const updated: Memory = {
//         ...mem,
//         lastPickedAt: now,
//         topics: {
//             ...mem.topics,
//             [topic]: now
//         }
//     };

//     return saveMemory(userId, updated);
// };

// export async function getLastUsedDate(topic: string, userId = "default"): Promise<string | null> {
//     const mem = await loadMemory(userId);
//     return mem.topics[topic] || null;
// };