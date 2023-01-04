import { DataTypes } from "sequelize";

export default (sequelize) => {
  const File = sequelize.define(
    "File",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["name"],
        },
      ],
    }
  );
  const Folder = sequelize.define(
    "Folder",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["name"],
        },
      ],
    }
  );
  Folder.hasMany(Folder, { onDelete: "cascade" });
  Folder.belongsTo(Folder);
  Folder.hasMany(File, { onDelete: "cascade" });
  File.belongsTo(Folder);
  return { File, Folder };
};
