"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tb_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_projects.init(
    {
      title: DataTypes.STRING,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      description: DataTypes.TEXT,
      technologies: DataTypes.STRING,
      image: DataTypes.STRING,
      author: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tb_projects",
    }
  );
  return tb_projects;
};
