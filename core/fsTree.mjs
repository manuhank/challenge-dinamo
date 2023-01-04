import { promises as fs, statSync, existsSync } from "fs";


/**
 * gets the content of a folder sorted by type (files and folder).
 *
 * @param path - the path of the folder
 * @param FolderId -  the id of the folder in the DB
 * @return object with files and folders array
 */
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

/**
 * Recursively adds the fs structure into the DB, starting from the path
 *
 * @param File - File Model
 * @param Folder -  Folder Model
 * @param path - the path of the folder
 * @param parentId -  the id of the parent folder in the DB
 * @return sum of two operands
 */
export async function recursivelySaveToDB(File, Folder, path, parentId) {
  if (!existsSync(path)) return;
  const { files, folders } = await getSortedContent(path, parentId);
  if (files.length) await File.bulkCreate(files);
  if (folders.length) {
    const folderRecords = await Folder.bulkCreate(folders);
    folderRecords.forEach(
      async (folder) =>
        await recursivelySaveToDB(File, Folder, folder.fullPath, folder.id)
    );
  }
}
