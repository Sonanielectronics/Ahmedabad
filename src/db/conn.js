const Sequelize = require('sequelize');

const sequelizeConfig = {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
};

var DB_NAME = process.env.DB_NAME || "techerudite";

const sequelize = new Sequelize( DB_NAME , process.env.DB_USER, process.env.DB_PASSWORD , sequelizeConfig );

const adminSequelize = new Sequelize( "" , process.env.DB_USER , process.env.DB_PASSWORD , sequelizeConfig );

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("../modle/schema")(sequelize, Sequelize);
const Tutorial = db.tutorials;

const connectToAdminDatabase = () => {
  return adminSequelize.authenticate()
    .then(() => {

      return adminSequelize.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
      
    })
    .then(() => {

      sequelize.config.database = DB_NAME;
      sequelize.query(`USE ${DB_NAME}`);

    });
};

const initializeModels = () => {

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.schema = require("../modle/schema")(sequelize, Sequelize);

  return sequelize.sync()

    .then(() => {

      // console.log(`Connected to database '${DB_NAME}'`);
      
      return db;
      
    })

    .catch(error => {

      throw new Error(`Error syncing models: ${error}`);

    });

};

const connectAndInitialize = () => {
  return connectToAdminDatabase()
    .then(() => initializeModels())
    .catch(error => {
      throw error;
    });
};

  connectAndInitialize()
    
    .then(db => {

        db.sequelize.authenticate()
            .then(() =>

                console.log('Database connected')

            )

            .catch(err => console.error('Unable to connect to the database:', err));

    })

    .catch(error => {

        console.error('Error during database initialization:', error);

    });

module.exports = Tutorial;