const Sequelize = require('sequelize')
const sequelize = require('../db')

const Login= sequelize.define('logins', {
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'logins'
})

module.exports = Login