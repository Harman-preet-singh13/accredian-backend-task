// models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        // Add this option to disable timestamps
        timestamps: false,
    });

    // Hash the password 
    User.beforeCreate(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    });

    //compare passwords during login
    User.prototype.isValidPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};
