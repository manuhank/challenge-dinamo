import { DataTypes } from "sequelize";

const pathConfig = {
  type: DataTypes.STRING,
  allowNull: false,
};

export default (sequelize) => {
  const File = sequelize.define("File", {
    name: pathConfig,
    fullPath: pathConfig,
  });
  const Folder = sequelize.define("Folder", {
    name: pathConfig,
    fullPath: pathConfig,
  });
  Folder.hasMany(Folder, { onDelete: "cascade" });
  Folder.belongsTo(Folder);
  Folder.hasMany(File, { onDelete: "cascade" });
  File.belongsTo(Folder);
  return { File, Folder };
};
