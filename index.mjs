import "dotenv/config.js";
import { db } from "./db/index.mjs";
import Models from "./db/Models.mjs";
import { recursivelySaveToDB } from "./lib/fsTree.mjs";

await db.authenticate();
const { File, Folder } = await Models(db);
await db.sync();
const rootPath = ".";
const rootFolder = await Folder.create({name: rootPath, fullPath: rootPath})
await recursivelySaveToDB(File, Folder, rootPath, rootFolder.id);