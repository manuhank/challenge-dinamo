import "dotenv/config.js";
import { db } from "./db/connection.mjs";
import InitializeModels from "./db/Models.mjs";
import { recursivelySaveToDB } from "./core/fsTree.mjs";

//initializing DB
await db.authenticate();
const { File, Folder } = await InitializeModels(db);
await db.sync();

//getting path from args
const rootPath = process.argv[2] ?? "/";

//creating root node and recursively saving it's content
const rootFolder = await Folder.create({name: rootPath, fullPath: rootPath})
await recursivelySaveToDB(File, Folder, rootPath, rootFolder.id);