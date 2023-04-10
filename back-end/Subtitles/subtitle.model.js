const { DataTypes } = require('sequelize');
const db = require('helpers/db');

module.exports = model;

function model(sequelize) {

    const attributes = {
        project_id: {
            type: DataTypes.INTEGER, allowNull: false, 
            references: {
                model: db.Project,
                key: 'id',
            }
        },
        start_time: { type: DataTypes.STRING, allowNull: false },
        end_time: { type: DataTypes.STRING, allowNull: false },
        text: { type: DataTypes.STRING, allowNull: false },
        language: { type: DataTypes.STRING, allowNull: false },
    };


    const options = {
        
    };

    return sequelize.define('Subtitle', attributes, options);
}