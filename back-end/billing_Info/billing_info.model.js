const { DataTypes } = require('sequelize');
const db = require('helpers/db');

module.exports = model;

function model(sequelize) {

    const attributes = {
        invoice_no: { type: DataTypes.INTEGER, allowNull: false },
        user_id: {
            type: DataTypes.INTEGER, allowNull: false, 
            references: {
                model: db.User,
                key: 'id',
            }
        },
        plan_id: {
            type: DataTypes.INTEGER, allowNull: false, 
            references: {
                model: db.Pricing_plan,
                key: 'id',
            }
        },
        payment_method: { type: DataTypes.STRING, allowNull: false },
        billing_address: { type: DataTypes.STRING, allowNull: false },
    };


    const options = {
        
    };

    return sequelize.define('Billing_info', attributes, options);
}