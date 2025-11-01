// import { LibSQLStore } from "@mastra/libsql";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { dirname } from "path";


// const _filename = fileURLToPath(import.meta.url);
// const _dirname = dirname(_filename);

// const dataDir = path.join(_dirname, "../../data");
// if (!fs.existsSync(dataDir)) {
//   fs.mkdirSync(dataDir, { recursive: true });
// };

// const dbPath = path.resolve(dataDir, "mastra.db");
// const dbUrl = `file:///${dbPath.replace(/\\/g, "/")}`;

// export const storage = new LibSQLStore({ url: dbUrl });
