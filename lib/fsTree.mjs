import { promises as fs, statSync, existsSync } from "fs";

export async function getSortedContent(path = "", FolderId) {
  const dir = await fs.readdir(path || "/");
  const children = dir.reduce(
    (result, name) => {
      const fullPath = path + "/" + name;
      let stat;
      try {
        stat = statSync(fullPath);
      } catch (e) {
        return result;
      }
      result[stat.isDirectory() ? "folders" : "files"].push({
        name,
        fullPath,
        FolderId,
      });
      return result;
    },
    { files: [], folders: [] }
  );
  return children;
}

export async function recursivelySaveToDB(File, Folder, fullPath, parentId) {
  if (!existsSync(fullPath)) return;
  const { files, folders } = await getSortedContent(fullPath, parentId);
  if (files.length) await File.bulkCreate(files);
  if (folders.length) {
    const folderRecords = await Folder.bulkCreate(folders);
    folderRecords.forEach(
      async (folder) =>
        await recursivelySaveToDB(File, Folder, folder.fullPath, folder.id)
    );
  }
}
