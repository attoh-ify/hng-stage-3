import { Mastra } from "@mastra/core";
import { createLogger } from "@mastra/core/logger";

import { backendMentorAgent } from "./agents/index.js";
import { a2aAgentRoute } from "../a2a/router.js";

const mastra = new Mastra({
    agents: { backendMentorAgent },
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

export { mastra };
