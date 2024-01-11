const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class JobApplication extends Model {}

JobApplication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Job details
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Application details
    application_status: {
      type: DataTypes.STRING,
      allowNull: false,
      // defaultValue: "Applied",
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false, // Set to true if you want createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: "jobApplication",
  }
);

module.exports = JobApplication;
