const { DataTypes } = require("sequelize");
const db = require("helpers/db");

module.exports = model;

function model(sequelize) {
  const attributes = {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: db.User,
        key: "id",
      },
    },
    folder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: db.Folder,
        key: "id",
      },
    },
    project_name: { type: DataTypes.STRING, allowNull: false },
    video_file_path: { type: DataTypes.STRING, allowNull: false },
    subtitle_file_path: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {};

  return sequelize.define("Project", attributes, options);
}
