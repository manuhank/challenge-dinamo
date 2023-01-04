import { DataTypes } from "sequelize";
export default (sequelize) => {
  const File = sequelize.define("File", {
    name: DataTypes.STRING,
    extension: DataTypes.STRING,
  });
  const Folder = sequelize.define("Folder", {
    name: DataTypes.STRING,
  });
  Folder.hasMany(Folder);
  Folder.belongsTo(Folder);
  Folder.hasMany(File);
  File.belongsTo(Folder);
  return { File, Folder };
};
