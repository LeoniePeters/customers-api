const Sequelize = require('sequelize')
const sequelize = require('../db')

const Company = sequelize.define('companies', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    founding_year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'companies'
})

module.exports = Company