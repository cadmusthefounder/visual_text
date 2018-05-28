const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRESQL_DATABASE, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, {
  host: process.env.POSTGRESQL_HOST,
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};
const models_dir = path.join(__dirname, 'models');

fs.readdirSync(models_dir)
  .filter(file =>
    (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
  )
  .forEach(file => {
    const model = sequelize.import(path.join(models_dir, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.sequelize.sync();

db.sequelize.sync({ force: true });

module.exports = db;
