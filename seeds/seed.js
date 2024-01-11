const sequelize = require('../config/connection');
const { User, Job } = require('../models');

const userData = require('./userData.json');
const applicationtData = require('./applicationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const application of applicationtData) {
    await Job.create({
      ...application,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();