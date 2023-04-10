const config = require("config.json");
const db = require("helpers/db");
const { Op } = require("sequelize");

module.exports = {
  get,
  getByUserIdAndFolderId,
  create,
};

async function get() {
  const allProjects = await db.Project.findAll();
  if (allProjects) {
    return {
      success: true,
      message: "Operation successful!",
    };
  } else {
    return {
      success: false,
      reason: "Unknown",
      message: "Sorry, operation failed!",
    };
  }
}

async function getByUserIdAndFolderId(userId, folderId) {
  const currentProjects = await db.Project.findAll({
    where: {
      user_id: {
        [Op.eq]: userId,
      },
      folder_id: {
        [Op.eq]: folderId,
      },
    },
  });
  if (currentProjects) {
    return {
      success: true,
      message: "Operation successful!",
      projects: currentProjects,
    };
  } else {
    return {
      success: false,
      reason: "Unknown",
      message: "Sorry, operation failed!",
    };
  }
}

async function create(params) {
  const newProject = await db.Project.create(params);
  if (newProject) {
    return {
      success: true,
      message: "Registration successful!",
    };
  } else {
    return {
      success: false,
      reason: "Unknown",
      message: "Sorry, operation failed!",
    };
  }
}
