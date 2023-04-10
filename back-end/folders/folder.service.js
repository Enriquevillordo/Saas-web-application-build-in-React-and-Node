const config = require('config.json');
const { Op } = require("sequelize");
const db = require('helpers/db');
const { param } = require('./folders.controller');

module.exports = {
    get,
    getByUserId,
    create,
    update,
    remove
};

async function get() {
    const folders = await db.Folder.findAll();
    if(folders) {
        return {
            success: true,
            folders: folders
        }
    } else {
        return {
            success: false,
            reason: "Unknown",
            message: "Sorry, operation failed!"
        }
    }
}

async function getByUserId(userId) {
    const folders = await db.Folder.findAll({
        where: {
            user_id: {
                [Op.eq]: userId
            }
        }
    });
    if(folders) {
        return {
            success: true,
            folders: folders
        }
    } else {
        return {
            success: false,
            reason: "Unknown",
            message: "Sorry, operation failed!"
        }
    }
}

async function create(params) {
    const newFolder = await db.Folder.create(params);
    if(newFolder) {
        return {
            success: true,
            message: "Creation successful!"
        }
    } else {
        return {
            success: false,
            reason: "Unknown",
            message: "Sorry, operation failed!"
        }
    }
}

async function update(params) {
    const newFolder = await db.Folder.update(
        { folder_name: params.folder_name },
        {
            where: {
                id: params.id
            }
        }
    );
    if(newFolder) {
        return {
            success: true,
            message: "Update successful!"
        }
    } else {
        return {
            success: false,
            reason: "Unknown",
            message: "Sorry, operation failed!"
        }
    }
}

async function remove(id) {
    const deleteResult = await db.Folder.destroy({
        where: {
            id: {
                [Op.eq]: id
            }
        }
    });
    if(deleteResult) {
        return {
            success: true,
            message: "Deletion successful!"
        }
    } else {
        return {
            success: false,
            reason: "Unknown",
            message: "Sorry, operation failed!"
        }
    }
}
