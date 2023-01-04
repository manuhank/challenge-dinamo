import "dotenv/config.js";
import { db } from "./db/index.mjs";
import Models from "./db/Models.mjs";
import { recSave, test } from "./test/test.mjs";

await db.authenticate();
const { File, Folder } = await Models(db);
await db.sync();
// const folder = await Folder.create({name: "test"});
// console.log(folder.id)
await recSave((o)=>Folder.create(o), test);