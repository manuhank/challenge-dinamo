import { promises as fs, statSync } from "fs";

export async function getContent(path = "") {
  const dir = await fs.readdir(path || "/");
  const children = dir.reduce((result, name) => {
    const fullPath = path + "/" + name;
    let stat;
    try {
      stat = statSync(fullPath);
    } catch (e) {
      return result;
    }
    result[name] = { name, fullPath, isFile: stat.isFile() };
    return result;
  }, {});
  return children;
}

export async function recSave(
  Folder,
  File,
  folderContent,
  name = "/",
  parentId
) {
  const record = { name };
  if (parentId) record.FolderId = [parentId];
  if (typeof folderContent === "string") {
    record.extension = name.split(".")[1];
    File.create(record);
  } else {
    const folder = await Folder.create(record);
    Object.entries(folderContent).forEach(([name, content]) =>
      recSave(Folder, File, content, name, folder.id)
    );
  }
}
