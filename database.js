// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('auth_accredian', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = require('./models/user')(sequelize);

module.exports = {
    sequelize,
    User,
};
