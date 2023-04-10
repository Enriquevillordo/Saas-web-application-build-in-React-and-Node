const { DataTypes } = require('sequelize');
const db = require('helpers/db');

module.exports = model;

function model(sequelize) {

    const attributes = {
        subtitle_id: {
            type: DataTypes.INTEGER, allowNull: false, 
            references: {
                model: db.Subtitle,
                key: 'id',
            }
        },
        translated_text: { type: DataTypes.STRING, allowNull: false },
        target_language: { type: DataTypes.STRING, allowNull: false },
    };


    const options = {
        
    };

    return sequelize.define('Translation', attributes, options);
}