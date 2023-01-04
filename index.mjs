import "dotenv/config.js";
import { db } from "./db/index.mjs";
import Models from "./db/Models.mjs";
import { getContent } from "./lib/fsTree.mjs";
import { recSave, test } from "./test/test.mjs";

// await db.authenticate();
// const { File, Folder } = await Models(db);
// await db.sync();

const dir = await getContent("/Users/manuhank");
console.log("dir",JSON.stringify(dir))
// await recSave(Folder, File, test);