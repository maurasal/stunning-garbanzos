const User = require("./User");
const Job = require("./JobApplication");

User.hasMany(Job, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Job.belongsTo(User, {
  foreignKey: "user_id",
});

Job.hasMany(Job, {
  foreignKey: "job_id",
  onDelete: "CASCADE",
});

Job.belongsTo(Job, {
  foreignKey: "job_id",
});



module.exports = { User, Job };
