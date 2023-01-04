import "dotenv/config.js";
import { db } from "./db/connection.mjs";
import InitializeModels from "./db/Models.mjs";
import { recursivelySaveToDB } from "./core/fsTree.mjs";

await db.authenticate();
const { File, Folder } = await InitializeModels(db);
await db.sync();
const rootPath = process.argv[3] ?? "/";
const rootFolder = await Folder.create({name: rootPath, fullPath: rootPath})
await recursivelySaveToDB(File, Folder, rootPath, rootFolder.id);