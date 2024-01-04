const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interview extends Model {}

Interview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING, // status field
      allowNull: false
    },
    // Add other fields for interviews
    date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    feedback: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'interview'
  }
);

module.exports = Interview;