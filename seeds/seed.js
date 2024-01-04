const sequelize = require("../config/connection");
const { User, userJOB, App, Interviews } = require("../models");

const userData = require("./userData.json");
const jobData = require("./jobsData.json");
const interviewData = require("./interviewData.json");
// function to create users and jobs

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // clears out the database each time we run it
};

const users = await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

const jobs = await userJOB.bulkCreate(jobData, {
  individualHooks: true,
  returning: true,
});
const apps = [];
for (let i = 0; i < 3; i++) {
  const currentApp = await App.create({
    userId: users[i].id,
    jobID: jobs[i].id,
  });
  apps.push(currentApp);
}
for (let i = 0; i < 3; i++) {
  await Interviews.create({
    applicantId: apps[i].id,
    ...interviewData[i],
  });
}
console.log("\n-----USERS SEEDED-----\n");
seedDatabase();
