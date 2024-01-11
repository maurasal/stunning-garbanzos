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
      type: DataTypes.ENUM("Accepted", "In Process", "Applied", "Rejected"),
      allowNull: false,
      defaultValue: "Applied",
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },

    // Interview details
    //interviewStatus: {
    //  type: DataTypes.ENUM('Scheduled', 'Completed', 'Pending'),
    // allowNull: true,
    //},
    // ... other fields
  },
  {
    sequelize,
    timestamps: true, // Set to true if you want createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: "jobApplication",
  }
);

module.exports = JobApplication;
