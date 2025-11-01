import { registerApiRoute } from "@mastra/core/server";
import { randomUUID } from "crypto";


interface MessagePart {
    kind: "text" | "data" | string;
    text?: string;
    data?: unknown;
};

interface ArtifactPart {
    kind: "text" | "data",
    text?: string;
    data?: any;
};

interface Artifact {
    artifactId: string;
    name: string;
    parts: ArtifactPart[];
};

export const a2aAgentRoute = registerApiRoute("/a2a/agent/:agentId", {
    method: "POST",
    handler: async (c) => {
        try {
            const mastra = c.get("mastra");
            const agentId = c.req.param("agentId");

            const body = await c.req.json();
            const { jsonrpc, id: requestId, method, params } = body;

            if (jsonrpc !== "2.0" || !requestId) {
                return c.json(
                    {
                        jsonrpc: "2.0",
                        id: requestId || null,
                        error: {
                            code: -32600,
                            message:
                                'Invalid Request: "jsonrpc" must be "2.0" and "id" is required',
                        },
                    },
                    400
                );
            };

            const agent = mastra.getAgent(agentId);
            if (!agent) {
                return c.json(
                    {
                        jsonrpc: "2.0",
                        id: requestId,
                        error: {
                            code: -32602,
                            message: `Agent '${agentId}' not found`,
                        },
                    },
                    404
                );
            };

            const { message, messages, contextId, taskId, metadata } = params || {};

            let messagesList = [];
            if (message) messagesList = [message];
            else if (Array.isArray(messages)) messagesList = messages;

            const mastraMessages = messagesList.map((msg: any) => ({
                role: msg.role,
                content:
                    (msg.parts as MessagePart[])
                        ?.map((part: MessagePart) => {
                            if (part.kind === "text") return part.text || "";
                            if (part.kind === "data") return JSON.stringify(part.data);
                            return "";
                        })
                        .join("\n") || "",
            }));

            const response = await agent.generate(mastraMessages);
            const agentText = response.text || "";

            const artifacts: Artifact[] = [
                {
                    artifactId: randomUUID(),
                    name: `${agentId}Response`,
                    parts: [{ kind: "text", text: agentText }],
                },
            ];

            if (response.toolResults?.length) {
                artifacts.push({
                    artifactId: randomUUID(),
                    name: "ToolResults",
                    parts: response.toolResults.map((r) => ({
                        kind: "data",
                        data: r,
                    })),
                });
            };

            const history = [
                ...messagesList.map((msg) => ({
                    kind: "message",
                    role: msg.role,
                    parts: msg.parts,
                    messageId: msg.messageId || randomUUID(),
                    taskId: msg.taskId || taskId || randomUUID(),
                })),
                {
                    kind: "message",
                    role: "agent",
                    parts: [{ kind: "text", text: agentText }],
                    messageId: randomUUID(),
                    taskId: taskId || randomUUID(),
                },
            ];

            return c.json({
                jsonrpc: "2.0",
                id: requestId,
                result: {
                    id: taskId || randomUUID(),
                    contextId: contextId || randomUUID(),
                    status: {
                        state: "completed",
                        timestamp: new Date().toISOString(),
                        message: {
                            messageId: randomUUID(),
                            role: "agent",
                            parts: [{ kind: "text", text: agentText }],
                            kind: "message",
                        },
                    },
                    artifacts,
                    history,
                    kind: "task",
                },
            });
        } catch (error: any) {
            console.error("Router Error:", error);
            return c.json(
                {
                    jsonrpc: "2.0",
                    id: null,
                    error: {
                        code: -32603,
                        message: "Internal error",
                        data: { details: error.message },
                    },
                },
                500
            );
        };
    }
})