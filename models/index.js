const User = require('./User');
const Job = require('./JobApplication');
const Application = require('./Application');
const Interview = require('./Interview');

User.hasMany(Application);
Job.hasMany(Application);
Application.belongsTo(User);
Application.belongsTo(Job);
Application.hasOne(Interview);
Interview.belongsTo(Application);

module.exports = { User, Job, Application, Interview };