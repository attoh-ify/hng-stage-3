import { Mastra } from "@mastra/core";
import { createLogger } from "@mastra/core/logger";

import agents from "./agents/index.js";

const mastra = new Mastra({
    agents,
    logger: createLogger({
        name: "BackendMentorAgent",
        level: "info",
    }),
});

export { mastra };
