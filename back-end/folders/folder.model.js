const { DataTypes } = require('sequelize');
const db = require('helpers/db');

module.exports = model;

function model(sequelize) {

    const attributes = {
        user_id: {
            type: DataTypes.INTEGER, allowNull: false, 
            references: {
                model: db.User,
                key: 'id',
            }
        },
        folder_name: { type: DataTypes.STRING, allowNull: false },
    };


    const options = {
        
    };

    return sequelize.define('Folder', attributes, options);
}