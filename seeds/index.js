const sequelize = require("../config/connection");
const { userJOB, App, Interviews,st } = require("../models");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
}
