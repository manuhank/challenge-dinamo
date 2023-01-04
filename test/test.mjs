export const test = {
  a: { c: { d: "" }, x:"" },
  b: {a: ""},
};

export async function recSave(save, folderContent, folderName = "/", parentId) {
  const record = { name: folderName };
  if (parentId) record.FolderId = [parentId];
  const folder = await save(record);
  Object.entries(folderContent).forEach(([name, content]) =>
    recSave(save, content, name, folder.id)
  );
}
