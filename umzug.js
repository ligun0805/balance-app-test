const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  }
);

const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

module.exports = umzug;