import { promises as fs, statSync } from "fs";

export async function getContent(path = "", parentId) {
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
      result[stat.isFile() ? "files" : "folders"].push({
        name,
        fullPath,
        parentId,
      });
      return result;
    },
    { files: [], folders: [] }
  );
  return children;
}

export async function recursivelySaveToDB(File, Folder, fullPath, parentId) {
  //TODO: adaptar esto a getContent
  const { files, folders } = await getContent(fullPath, parentId);
  const [folderRecords] = await Promise.all([
    Folder.bulkCreate(folders),
    File.bulkCreate(files),
  ]);
  folderRecords.forEach(async(folder) =>
    await recursivelySaveToDB(Folder, File, folder.fullPath, folder.id)
  );
}
