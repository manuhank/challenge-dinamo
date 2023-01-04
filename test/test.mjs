export const test = {
  a: { c: { "d.rar": "" }, "x.js": "" },
  b: { "a.txt": "" },
  j: {},
};

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