const { DataTypes } = require('sequelize');
const db = require('helpers/db');

module.exports = model;

function model(sequelize) {

    const attributes = {
        plan_name: { type: DataTypes.STRING, allowNull: false },
        plan_description: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        features: { type: DataTypes.STRING, allowNull: false },
    };


    const options = {
        
    };

    return sequelize.define('Pricing_plan', attributes, options);
}