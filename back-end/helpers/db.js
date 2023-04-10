const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    db.User = require('../users/user.model')(sequelize);
    db.Folder = require('../folders/folder.model')(sequelize);
    db.Project = require('../projects/project.model')(sequelize);
    db.Subtitle = require('../subtitles/subtitle.model')(sequelize);
    db.Pricing_plan = require('../pricing_plans/pricing_plan.model')(sequelize);
    db.Billing_info = require('../billing_info/billing_info.model')(sequelize);
    
    await sequelize.sync();
}