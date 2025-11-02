import { Mastra } from "@mastra/core";
import { createLogger } from "@mastra/core/logger";
import { LibSQLStore } from "@mastra/libsql";
import { backendMentorAgent } from "./agents/backendMentorAgent.js";
import { a2aAgentRoute } from "./a2a/router.js";

export const mastra = new Mastra({
  agents: { backendMentorAgent },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: createLogger({
    name: "BackendMentorAgent",
    level: "info",
  }),
  observability: {
    default: { enabled: true },
  },
  server: {
    build: {
      openAPIDocs: true,
      swaggerUI: true,
    },
    apiRoutes: [a2aAgentRoute]
  }
});
