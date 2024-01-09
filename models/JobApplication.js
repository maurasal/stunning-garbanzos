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
    // Job details
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Application details
    applicationStatus: {
      type: DataTypes.ENUM("Planning", "In Process", "Applied"),
      allowNull: false,
      defaultValue: "Planning",
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
