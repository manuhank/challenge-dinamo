import { DataTypes } from "sequelize";
export default (sequelize) => {
  const File = sequelize.define("File", {
    name: DataTypes.STRING,
    fullPath: DataTypes.STRING,
  });
  const Folder = sequelize.define("Folder", {
    name: DataTypes.STRING,
    fullPath: DataTypes.STRING,
  });
  Folder.hasMany(Folder);
  Folder.belongsTo(Folder);
  Folder.hasMany(File);
  File.belongsTo(Folder);
  return { File, Folder };
};