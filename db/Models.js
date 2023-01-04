const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const File = sequelize.define("File", {
    name: DataTypes.STRING,
    extension: DataTypes.STRING,
  });
  const Folder = sequelize.define("Folder", {
    name: DataTypes.STRING,
  });
  Folder.hasMany(Folder);
  Folder.belongsTo(Folder);
  return { File, Folder };
};
